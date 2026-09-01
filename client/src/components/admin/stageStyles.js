/**
 * Colour-coded pipeline stages.
 *
 * The stages are ordered, so the colours are too: cool at the top of the
 * funnel, warming through the middle, resolving to green or red. Reading down
 * the column should show where the pipeline is stuck without reading a word.
 *
 * Kept out of the component files so they can share it without breaking fast
 * refresh, which only works when a module exports components alone.
 */
export const STAGE_STYLES = {
  New: {
    chip: "bg-[hsl(232_62%_60%_/_0.14)] text-[hsl(232_58%_44%)] dark:text-[hsl(232_82%_80%)] ring-[hsl(232_62%_60%_/_0.35)]",
    dot: "bg-[hsl(232_62%_60%)]",
  },
  Contacted: {
    chip: "bg-[hsl(174_72%_45%_/_0.14)] text-[hsl(174_78%_28%)] dark:text-[hsl(174_72%_70%)] ring-[hsl(174_72%_45%_/_0.35)]",
    dot: "bg-[hsl(174_72%_45%)]",
  },
  "In Discussion": {
    chip: "bg-[hsl(38_92%_52%_/_0.16)] text-[hsl(30_86%_36%)] dark:text-[hsl(38_92%_70%)] ring-[hsl(38_92%_52%_/_0.35)]",
    dot: "bg-[hsl(38_92%_52%)]",
  },
  "Proposal Sent": {
    chip: "bg-[hsl(262_66%_60%_/_0.14)] text-[hsl(262_58%_46%)] dark:text-[hsl(262_80%_80%)] ring-[hsl(262_66%_60%_/_0.35)]",
    dot: "bg-[hsl(262_66%_60%)]",
  },
  Won: {
    chip: "bg-[hsl(152_62%_42%_/_0.16)] text-[hsl(152_70%_26%)] dark:text-[hsl(152_62%_66%)] ring-[hsl(152_62%_42%_/_0.35)]",
    dot: "bg-[hsl(152_62%_42%)]",
  },
  Lost: {
    chip: "bg-[hsl(2_72%_56%_/_0.13)] text-[hsl(2_66%_44%)] dark:text-[hsl(2_84%_74%)] ring-[hsl(2_72%_56%_/_0.32)]",
    dot: "bg-[hsl(2_72%_56%)]",
  },
};

export const FALLBACK_STAGE_STYLE = STAGE_STYLES.New;
