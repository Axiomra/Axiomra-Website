import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  LogOut,
  PanelRightClose,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  X,
} from "lucide-react";

import AdminBackdrop from "../../components/admin/AdminBackdrop";
import ColumnToggle from "../../components/admin/ColumnToggle";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import LeadCards from "../../components/admin/LeadCards";
import LeadFilters from "../../components/admin/LeadFilters";
import LeadSidebar from "../../components/admin/LeadSidebar";
import LeadTable from "../../components/admin/LeadTable";
import NewLeadDialog from "../../components/admin/NewLeadDialog";
import StatsFooter from "../../components/admin/StatsFooter";
import { COLUMN_STORAGE_KEY, DEFAULT_VISIBLE, LEAD_COLUMNS } from "../../components/admin/leadColumns";
import ThemeToggle from "../../components/ThemeToggle";
import useAdminAuth from "../../admin/useAdminAuth";
import { leadsApi } from "../../lib/adminApi";
import services from "../../data/servicesData";

const SERVICE_OPTIONS = services.map((s) => s.title);
const PAGE_SIZE = 25;

const EMPTY_FILTERS = {
  search: "",
  progress: [],
  team: "",
  service: "",
  from: "",
  to: "",
  minBudget: "",
  maxBudget: "",
  page: 1,
};

/** Column choice survives reloads; a blocked localStorage just means defaults. */
function readColumns() {
  try {
    const stored = JSON.parse(localStorage.getItem(COLUMN_STORAGE_KEY));
    if (!Array.isArray(stored) || !stored.length) return DEFAULT_VISIBLE;
    // Drop keys from an older build so a renamed column cannot wedge the table.
    const valid = stored.filter((k) => LEAD_COLUMNS.some((c) => c.key === k));
    return valid.length ? valid : DEFAULT_VISIBLE;
  } catch {
    return DEFAULT_VISIBLE;
  }
}

export default function AdminLeadsPage() {
  const { user, signOut } = useAdminAuth();

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState("createdAt");
  const [dir, setDir] = useState("desc");

  const [leads, setLeads] = useState([]);
  const [meta, setMeta] = useState({ total: 0, pages: 1, page: 1 });
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const [columns, setColumns] = useState(readColumns);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newLeadOpen, setNewLeadOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Bumped to force a refetch without changing any filter.
  const [reloadKey, setReloadKey] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    document.title = "Axiomra Lead Management System";
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(COLUMN_STORAGE_KEY, JSON.stringify(columns));
    } catch {
      // Preference just will not survive a reload; the table still works.
    }
  }, [columns]);

  // Debounce the search box so typing "generative" is one request, not ten.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(filters.search), 280);
    return () => clearTimeout(t);
  }, [filters.search]);

  const query = useMemo(
    () => ({
      search: debouncedSearch,
      progress: filters.progress,
      team: filters.team,
      service: filters.service,
      from: filters.from,
      to: filters.to,
      minBudget: filters.minBudget,
      maxBudget: filters.maxBudget,
      page: filters.page,
      limit: PAGE_SIZE,
      sort,
      dir,
    }),
    [debouncedSearch, filters, sort, dir]
  );

  // "Loading" is derived from which request has landed, not from a flag flipped
  // before the request starts — a flag would mean setting state in the effect
  // body and re-rendering the whole table twice per keystroke.
  const requestKey = useMemo(() => JSON.stringify([query, reloadKey]), [query, reloadKey]);
  const [loadedKey, setLoadedKey] = useState(null);
  const loading = loadedKey !== requestKey;

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      leadsApi.list(query, controller.signal),
      leadsApi.stats(query, controller.signal),
    ])
      .then(([list, s]) => {
        setLeads(list.items);
        setMeta({ total: list.total, pages: list.pages, page: list.page });
        setStats(s);
        setError("");
        setLoadedKey(requestKey);
      })
      .catch((err) => {
        // A cancelled request belongs to a superseded keystroke; marking it
        // loaded would flicker the table out of its loading state.
        if (err?.name === "AbortError") return;
        setError(err.message);
        setLoadedKey(requestKey);
      });

    return () => controller.abort();
  }, [query, requestKey]);

  const selected = useMemo(
    () => leads.find((l) => l._id === selectedId) || null,
    [leads, selectedId]
  );

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filters.search) n += 1;
    if (filters.progress?.length) n += filters.progress.length;
    for (const key of ["team", "service", "from", "to", "minBudget", "maxBudget"]) {
      if (filters[key]) n += 1;
    }
    return n;
  }, [filters]);

  const onSort = useCallback(
    (key) => {
      if (sort === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
      else {
        setSort(key);
        // Text sorts read naturally A→Z; dates and stages read newest-first.
        setDir(key === "createdAt" || key === "updatedAt" ? "desc" : "asc");
      }
      setFilters((f) => ({ ...f, page: 1 }));
    },
    [sort]
  );

  /**
   * Optimistic inline edit. The row updates immediately, then reverts to the
   * server's version — a rejected email or an over-length note has to visibly
   * snap back rather than sitting on screen as if it saved.
   */
  const rollback = useRef(new Map());

  const onPatch = useCallback(async (id, changes) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l._id !== id) return l;
        rollback.current.set(id, l);
        return { ...l, ...changes };
      })
    );

    try {
      const updated = await leadsApi.patch(id, changes);
      setLeads((prev) => prev.map((l) => (l._id === id ? updated : l)));
      rollback.current.delete(id);
      // A stage change moves the footer counts, so refresh them.
      if ("progress" in changes) {
        leadsApi
          .stats(query)
          .then(setStats)
          .catch(() => {});
      }
    } catch (err) {
      const previous = rollback.current.get(id);
      if (previous) setLeads((prev) => prev.map((l) => (l._id === id ? previous : l)));
      rollback.current.delete(id);
      setError(err.message);
      // Rethrown so EditableCell can show its own inline error marker.
      throw err;
    }
  }, [query]);

  const onCreate = useCallback(async (lead) => {
    await leadsApi.create(lead);
    setReloadKey((k) => k + 1);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await leadsApi.remove(pendingDelete._id);
      setLeads((prev) => prev.filter((l) => l._id !== pendingDelete._id));
      if (selectedId === pendingDelete._id) setSelectedId(null);
      setPendingDelete(null);
      setReloadKey((k) => k + 1);
    } catch (err) {
      setError(err.message);
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  }, [pendingDelete, selectedId]);

  const onExport = useCallback(async () => {
    try {
      await leadsApi.exportCsv({ ...query, page: undefined, limit: undefined });
    } catch (err) {
      setError(err.message);
    }
  }, [query]);

  const selectLead = useCallback((lead) => {
    setSelectedId(lead._id);
    setSidebarOpen(true);
  }, []);

  const actionButton =
    "focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-surface-card px-3 py-2 text-sm font-medium text-content-dim transition-colors hover:bg-surface-inset disabled:opacity-50";

  return (
    <div className="min-h-[100svh] bg-surface">
      {/* --- Heading --- */}
      <header className="relative overflow-hidden border-b border-line">
        <AdminBackdrop />

        <div className="relative mx-auto max-w-8xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Axiomra
              </p>
              {/* Sized as a page title, not a marketing hero: this heading sits
                  above a working table that people read all day, and a display
                  hero would push the first row below the fold on a laptop.
                  Flagged for design sign-off. */}
              <h1 className="mt-1.5 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-content">
                Lead Management{" "}
                <span className="bg-cta-gradient bg-clip-text text-transparent">System</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm text-content-dim">
                Every enquiry from the website and the team, in one pipeline.
              </p>
            </motion.div>

            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setNewLeadOpen(true)} className={actionButton}>
                <Plus size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Add lead</span>
              </button>

              <button type="button" onClick={onExport} className={actionButton}>
                <Download size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <button
                type="button"
                onClick={() => setReloadKey((k) => k + 1)}
                disabled={loading}
                className={actionButton}
                aria-label="Refresh leads"
              >
                <RefreshCw
                  size={15}
                  aria-hidden="true"
                  className={loading ? "animate-spin" : undefined}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                type="button"
                onClick={() => setFiltersOpen((o) => !o)}
                aria-expanded={filtersOpen}
                className={`${actionButton} ${filtersOpen ? "!border-accent/50 !text-accent" : ""}`}
              >
                <SlidersHorizontal size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              <ColumnToggle columns={columns} onChange={setColumns} />

              <ThemeToggle />

              <button
                type="button"
                onClick={signOut}
                className={actionButton}
                aria-label={`Sign out${user?.email ? ` (${user.email})` : ""}`}
              >
                <LogOut size={15} aria-hidden="true" />
                <span className="hidden lg:inline">Sign out</span>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <LeadFilters
              filters={filters}
              onChange={setFilters}
              open={filtersOpen}
              services={SERVICE_OPTIONS}
              activeCount={activeFilterCount}
            />
          </div>
        </div>
      </header>

      {/* --- Body: sidebar + table --- */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div
            role="alert"
            className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-danger/30 bg-danger/8 px-4 py-3 text-sm text-danger"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
              className="focus-ring shrink-0 rounded p-0.5 hover:opacity-70"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Docked on wide screens, a drawer below xl. */}
          <aside className="hidden w-[19rem] shrink-0 xl:block">
            <div className="sticky top-6 max-h-[calc(100svh-3rem)] overflow-hidden rounded-2xl border border-line bg-surface-card">
              <LeadSidebar
                lead={selected}
                onClose={() => setSelectedId(null)}
                onSelect={setSelectedId}
              />
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            {loading && leads.length === 0 ? (
              <div className="grid place-items-center rounded-2xl border border-line bg-surface-card py-24">
                <span className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-accent" />
                <span className="sr-only">Loading leads…</span>
              </div>
            ) : leads.length === 0 ? (
              <div className="rounded-2xl border border-line bg-surface-card px-6 py-20 text-center">
                <p className="font-display text-lg font-semibold text-content">No leads found</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-content-dim">
                  {activeFilterCount
                    ? "Nothing matches the current filters. Try clearing a few."
                    : "Enquiries from the website will appear here as soon as they arrive."}
                </p>
              </div>
            ) : (
              <>
                <div className="hidden lg:block">
                  <LeadTable
                    leads={leads}
                    columns={columns}
                    sort={sort}
                    dir={dir}
                    onSort={onSort}
                    selectedId={selectedId}
                    onSelect={selectLead}
                    onPatch={onPatch}
                    onDelete={setPendingDelete}
                  />
                </div>

                <div className="lg:hidden">
                  <LeadCards
                    leads={leads}
                    columns={columns}
                    selectedId={selectedId}
                    onSelect={selectLead}
                    onPatch={onPatch}
                    onDelete={setPendingDelete}
                  />
                </div>

                {meta.pages > 1 && (
                  <nav
                    aria-label="Pagination"
                    className="mt-4 flex items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      disabled={meta.page <= 1}
                      onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                      className={actionButton}
                    >
                      <ChevronLeft size={15} aria-hidden="true" />
                      Previous
                    </button>
                    <p className="text-sm text-content-dim">
                      Page {meta.page} of {meta.pages}
                    </p>
                    <button
                      type="button"
                      disabled={meta.page >= meta.pages}
                      onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                      className={actionButton}
                    >
                      Next
                      <ChevronRight size={15} aria-hidden="true" />
                    </button>
                  </nav>
                )}
              </>
            )}

            <StatsFooter
              stats={stats}
              filtered={activeFilterCount > 0}
              showing={leads.length}
            />
          </main>
        </div>
      </div>

      {/* Sidebar as a drawer below xl. */}
      {sidebarOpen && selected && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button
            type="button"
            aria-label="Close details panel"
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-[rgb(6_12_26_/_0.55)] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 w-full max-w-sm border-l border-line bg-surface-card"
          >
            <LeadSidebar
              lead={selected}
              onClose={() => setSidebarOpen(false)}
              onSelect={setSelectedId}
            />
          </motion.div>
        </div>
      )}

      {/* Reopen the drawer after closing it, without re-picking the row. */}
      {!sidebarOpen && selected && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="focus-ring fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-line bg-surface-card px-4 py-2.5 text-sm font-medium text-content shadow-[0_18px_40px_-18px_rgba(10,20,40,0.5)] xl:hidden"
        >
          <PanelRightClose size={15} aria-hidden="true" />
          Details
        </button>
      )}

      <NewLeadDialog
        open={newLeadOpen}
        onClose={() => setNewLeadOpen(false)}
        onCreate={onCreate}
        services={SERVICE_OPTIONS}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        busy={deleting}
        title="Delete this lead?"
        body={
          pendingDelete
            ? `${pendingDelete.name || pendingDelete.email} will be permanently removed, along with the message and any remarks. This cannot be undone.`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
