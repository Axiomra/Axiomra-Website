import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  LogOut,
  PanelLeftClose,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  X,
} from "lucide-react";

import AdminAmbience from "../../components/admin/AdminAmbience";
import AdminBackdrop from "../../components/admin/AdminBackdrop";
import ColumnToggle from "../../components/admin/ColumnToggle";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import LeadCards from "../../components/admin/LeadCards";
import LeadFilters from "../../components/admin/LeadFilters";
import LeadSidebar from "../../components/admin/LeadSidebar";
import LeadTable from "../../components/admin/LeadTable";
import NewColumnDialog from "../../components/admin/NewColumnDialog";
import NewLeadDialog from "../../components/admin/NewLeadDialog";
import StatsBar from "../../components/admin/StatsBar";
import {
  COLUMN_STORAGE_KEY,
  DEFAULT_VISIBLE,
  LEAD_COLUMNS,
  isCustomKey,
  toCustomColumn,
} from "../../components/admin/leadColumns";
import ThemeToggle from "../../components/ThemeToggle";
import useAdminAuth from "../../admin/useAdminAuth";
import { leadFieldsApi, leadsApi } from "../../lib/adminApi";
import services from "../../data/servicesData";
import Seo from "../../seo/Seo";

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
    // Custom keys are kept unvalidated: their definitions arrive from the
    // server a moment later, and a deleted one is filtered out then.
    const valid = stored.filter((k) => isCustomKey(k) || LEAD_COLUMNS.some((c) => c.key === k));
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
  // Columns the team added themselves. Shared across admins, so they come from
  // the server rather than from this browser's stored preferences.
  const [fields, setFields] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newLeadOpen, setNewLeadOpen] = useState(false);
  const [newColumnOpen, setNewColumnOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [pendingColumnDelete, setPendingColumnDelete] = useState(null);
  const [deletingColumn, setDeletingColumn] = useState(false);

  // Bumped to force a refetch without changing any filter.
  const [reloadKey, setReloadKey] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(COLUMN_STORAGE_KEY, JSON.stringify(columns));
    } catch {
      // Preference just will not survive a reload; the table still works.
    }
  }, [columns]);

  const [fieldsLoaded, setFieldsLoaded] = useState(false);

  // Custom columns load once. A failure is deliberately silent: the built-in
  // table is still fully usable without them, and an error banner over a
  // working table would be noise.
  useEffect(() => {
    const controller = new AbortController();
    leadFieldsApi
      .list(controller.signal)
      .then((res) => {
        setFields(res.items || []);
        setFieldsLoaded(true);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const allColumns = useMemo(() => [...LEAD_COLUMNS, ...fields.map(toCustomColumn)], [fields]);

  // A column deleted by someone else can still be in this browser's stored
  // list. It is filtered out on the way to the table rather than written back
  // to state, so nothing is pruned before the definitions have arrived, and
  // the raw preference survives, which matters while they are still loading.
  const visibleColumns = useMemo(() => {
    if (!fieldsLoaded) return columns;
    const known = new Set(allColumns.map((c) => c.key));
    return columns.filter((k) => known.has(k));
  }, [columns, allColumns, fieldsLoaded]);

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
  // before the request starts; a flag would mean setting state in the effect
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
   * server's version: a rejected email or an over-length note has to visibly
   * snap back rather than sitting on screen as if it saved.
   */
  const rollback = useRef(new Map());

  const onPatch = useCallback(async (id, changes) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l._id !== id) return l;
        rollback.current.set(id, l);
        // A custom-column edit carries one key, so it has to merge into the
        // existing bag, since spreading it would blank every other custom column
        // on the row until the server's answer landed.
        return changes.custom
          ? { ...l, ...changes, custom: { ...l.custom, ...changes.custom } }
          : { ...l, ...changes };
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

  /** Add a column for the whole team, and show it here straight away. */
  const onCreateColumn = useCallback(async ({ label, type }) => {
    const field = await leadFieldsApi.create({ label, type });
    setFields((prev) => [...prev, field]);
    setColumns((prev) => [...prev, toCustomColumn(field).key]);
  }, []);

  const confirmColumnDelete = useCallback(async () => {
    if (!pendingColumnDelete) return;
    setDeletingColumn(true);
    try {
      await leadFieldsApi.remove(pendingColumnDelete.id);
      setFields((prev) => prev.filter((f) => f._id !== pendingColumnDelete.id));
      setPendingColumnDelete(null);
      // The values are gone server-side, so the rows on screen are now stale.
      setReloadKey((k) => k + 1);
    } catch (err) {
      setError(err.message);
      setPendingColumnDelete(null);
    } finally {
      setDeletingColumn(false);
    }
  }, [pendingColumnDelete]);

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
      // The export mirrors what is on screen: hidden columns stay out of the
      // file, and the ones that are shown keep the order they were dragged into.
      await leadsApi.exportCsv({
        ...query,
        page: undefined,
        limit: undefined,
        columns: visibleColumns,
      });
    } catch (err) {
      setError(err.message);
    }
  }, [query, visibleColumns]);

  const selectLead = useCallback((lead) => {
    setSelectedId(lead._id);
    setSidebarOpen(true);
  }, []);

  const actionButton =
    "focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-surface-card px-3 py-2 text-sm font-medium text-content-dim transition-colors hover:bg-surface-inset disabled:opacity-50";

  return (
    <div className="min-h-[100svh] bg-surface">
      <Seo title="Axiomra Lead Management System" noindex />
      <AdminAmbience />

      {/* --- Heading --- */}
      <header className="relative overflow-hidden border-b border-line">
        <AdminBackdrop />

        <div className="relative mx-auto max-w-8xl px-4 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0"
            >
              {/* Deliberately short: this is a page title above a working table
                  that people read all day, so every row of chrome it costs is a
                  row of leads pushed under the fold. The tagline moved into the
                  eyebrow rather than taking a third line of its own. */}
              <h1 className="font-display text-[clamp(1.25rem,2.2vw,1.65rem)] font-semibold leading-tight tracking-tight text-content">
                Lead Management{" "}
                <span className="bg-cta-gradient bg-clip-text text-transparent">System</span>
              </h1>
              <p className="mt-0.5 text-[12px] text-content-dim">
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

              <ColumnToggle
                columns={visibleColumns}
                onChange={setColumns}
                allColumns={allColumns}
                onNewColumn={() => setNewColumnOpen(true)}
                onDeleteColumn={setPendingColumnDelete}
              />

              <ThemeToggle variant="surface" />

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

          <div className="mt-3">
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

      {/* --- Body --- */}
      {/* Only the framing content is width-capped and padded. The table itself
          runs edge to edge below, because every pixel of gutter is a pixel of
          column that has to be scrolled to instead. */}
      <main className="relative py-4">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
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

          <StatsBar stats={stats} filtered={activeFilterCount > 0} showing={leads.length} />
        </div>

        <div className="mt-4">
          {loading && leads.length === 0 ? (
            <div className="mx-4 grid place-items-center rounded-2xl border border-line bg-surface-card/55 py-24 backdrop-blur-xl sm:mx-6 lg:mx-8">
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-accent" />
              <span className="sr-only">Loading leads…</span>
            </div>
          ) : leads.length === 0 ? (
            <div className="mx-4 rounded-2xl border border-line bg-surface-card/55 px-6 py-20 text-center backdrop-blur-xl sm:mx-6 lg:mx-8">
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
                  columns={visibleColumns}
                  allColumns={allColumns}
                  sort={sort}
                  dir={dir}
                  onSort={onSort}
                  selectedId={selectedId}
                  onSelect={selectLead}
                  onPatch={onPatch}
                  onDelete={setPendingDelete}
                />
              </div>

              <div className="px-4 sm:px-6 lg:hidden">
                <LeadCards
                  leads={leads}
                  columns={visibleColumns}
                  allColumns={allColumns}
                  selectedId={selectedId}
                  onSelect={selectLead}
                  onPatch={onPatch}
                  onDelete={setPendingDelete}
                />
              </div>

              {meta.pages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="mx-auto mt-4 flex max-w-8xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
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
        </div>
      </main>

      {/* Details panel: a drawer that opens on click and closes on demand,
          rather than a permanently docked sidebar eating table width. It slides
          in from the left, where the docked sidebar used to sit, so the muscle
          memory of "details live on that side" survives. */}
      {sidebarOpen && selected && (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close details panel"
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-[rgb(6_12_26_/_0.55)] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-0 w-full max-w-sm border-r border-line bg-surface-card"
          >
            <LeadSidebar
              lead={selected}
              onClose={() => setSidebarOpen(false)}
              onPatch={onPatch}
            />
          </motion.div>
        </div>
      )}

      {/* Reopen the drawer after closing it, without re-picking the row. */}
      {!sidebarOpen && selected && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="focus-ring fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-line bg-surface-card px-4 py-2.5 text-sm font-medium text-content shadow-[0_18px_40px_-18px_rgba(10,20,40,0.5)]"
        >
          <PanelLeftClose size={15} aria-hidden="true" />
          Details
        </button>
      )}

      <NewLeadDialog
        open={newLeadOpen}
        onClose={() => setNewLeadOpen(false)}
        onCreate={onCreate}
        services={SERVICE_OPTIONS}
      />

      <NewColumnDialog
        open={newColumnOpen}
        onClose={() => setNewColumnOpen(false)}
        onCreate={onCreateColumn}
      />

      <ConfirmDialog
        open={Boolean(pendingColumnDelete)}
        busy={deletingColumn}
        title="Delete this column?"
        body={
          pendingColumnDelete
            ? `"${pendingColumnDelete.label}" will be removed for everyone, along with every value entered in it. This cannot be undone.`
            : ""
        }
        onConfirm={confirmColumnDelete}
        onCancel={() => setPendingColumnDelete(null)}
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
