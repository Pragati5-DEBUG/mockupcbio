import { useId } from "react";
import styles from "./ChartsMenuDialog.module.css";
import type { ClinicalCategory, FieldDef, MainTab } from "./mockData";
import { CLINICAL_RAIL, cohortWord } from "./mockData";
import { XvsYPanel } from "./XvsYPanel";
import type { XvsyAddedEntry } from "./xvsyTypes";

export function ChartsMenuDialog({
  mainTab,
  setMainTab,
  clinicalCat,
  setClinicalCat,
  query,
  setQuery,
  selectedIds,
  toggleSelected,
  visibleFieldsByClinicalCategory,
  visibleGenomicFields,
  onHoverFieldId,
  xvsyEntries,
  onAddXvsyEntry,
  onRemoveXvsyEntry,
}: {
  mainTab: MainTab;
  setMainTab: (tab: MainTab) => void;
  clinicalCat: ClinicalCategory;
  setClinicalCat: (cat: ClinicalCategory) => void;
  query: string;
  setQuery: (q: string) => void;
  selectedIds: Set<string>;
  toggleSelected: (id: string) => void;
  visibleFieldsByClinicalCategory: Record<ClinicalCategory, FieldDef[]>;
  visibleGenomicFields: FieldDef[];
  onHoverFieldId: (id: string | null) => void;
  xvsyEntries: XvsyAddedEntry[];
  onAddXvsyEntry: (e: XvsyAddedEntry) => void;
  onRemoveXvsyEntry: (id: string) => void;
}) {
  const titleId = useId();

  const searchMode = query.trim().length > 0 && mainTab === "clinical";

  return (
    <div className={styles.overlay} role="dialog" aria-labelledby={titleId}>
      <div className={styles.header}>
        <p className={styles.kicker}>Data</p>
        <h1 id={titleId} className={styles.title}>
          Add charts to view
        </h1>
        <p className={styles.sub}>
          Search and select fields — prototype for Study View charts menu.
        </p>
      </div>

      <div className={styles.searchWrap}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search attributes…"
          aria-label="Search attributes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className={styles.searchBehaviorHint} role="note">
          Hovering a chart or attribute name highlights its tile above. If that tile sits low on the
          page, the view scrolls after about a second so it stays visible.
        </p>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Chart source">
        {(
          [
            ["clinical", "Clinical"],
            ["genomic", "Genomic"],
            ["xvsy", "X vs Y"],
            ["gene", "Gene specific"],
            ["custom", "Custom"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mainTab === id}
            className={`${styles.tab} ${mainTab === id ? styles.tabSelected : ""}`}
            onClick={() => setMainTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className={`${styles.panelBody} ${searchMode ? styles.searchMode : ""}`}
        data-testid="panel-body"
      >
        {mainTab === "clinical" && (
          <>
            <p className={styles.legend}>
              <strong>In cohort</strong> = completeness. <strong>Data shape</strong> (demo) can
              live in a popover. Use the <strong>rail</strong> to switch clinical groups; search
              shows matches across groups.
            </p>
            <div className={styles.twoPane}>
              <nav className={styles.rail} aria-label="Clinical attribute groups">
                {CLINICAL_RAIL.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`${styles.railBtn} ${!searchMode && clinicalCat === r.id ? styles.railBtnSelected : ""}`}
                    aria-current={!searchMode && clinicalCat === r.id ? "true" : undefined}
                    onClick={() => {
                      setClinicalCat(r.id);
                      setQuery("");
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </nav>
              <div className={styles.listPane}>
                {CLINICAL_RAIL.map((rail) => {
                  const cat = rail.id;
                  const fields = visibleFieldsByClinicalCategory[cat] || [];
                  const showPanel = searchMode
                    ? fields.length > 0
                    : clinicalCat === cat;
                  if (!showPanel) return null;
                  return (
                    <div key={cat} data-category={cat}>
                      {cat === "suggested" ? (
                        <p className={styles.sectionTitle}>Common in this cohort</p>
                      ) : (
                        <h2 className={styles.sectionTitle}>{rail.label}</h2>
                      )}
                      <div className={styles.rowHead} aria-hidden>
                        <span>Attribute</span>
                        <span>In cohort</span>
                      </div>
                      {fields.map((f) => (
                        <div
                          key={f.id}
                          className={styles.row}
                          onMouseEnter={() => onHoverFieldId(f.id)}
                          onMouseLeave={() => onHoverFieldId(null)}
                        >
                          <label className={styles.rowLabel}>
                            <input
                              type="checkbox"
                              checked={selectedIds.has(f.id)}
                              onChange={() => toggleSelected(f.id)}
                            />
                            {f.label}
                          </label>
                          <span className={styles.covWord}>{cohortWord(f.inCohortPct)}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {mainTab === "xvsy" && (
          <XvsYPanel
            entries={xvsyEntries}
            selectedIds={selectedIds}
            onAddEntry={onAddXvsyEntry}
            onRemoveEntry={onRemoveXvsyEntry}
            toggleSelected={toggleSelected}
            onHoverId={onHoverFieldId}
          />
        )}

        {mainTab === "genomic" && (
          <section className={styles.genomicPanel} aria-label="Genomic">
            <h2 className={styles.sectionTitle}>Molecular</h2>
            <div className={styles.rowHead} aria-hidden>
              <span>Attribute</span>
              <span>In cohort</span>
            </div>
            {visibleGenomicFields.map((f) => (
              <div
                key={f.id}
                className={styles.row}
                onMouseEnter={() => onHoverFieldId(f.id)}
                onMouseLeave={() => onHoverFieldId(null)}
              >
                <label className={styles.rowLabel}>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(f.id)}
                    onChange={() => toggleSelected(f.id)}
                  />
                  {f.label}
                </label>
                <span className={styles.covWord}>{cohortWord(f.inCohortPct)}</span>
              </div>
            ))}
          </section>
        )}

        {mainTab === "gene" && (
          <p className={styles.legend}>Gene-level charts (placeholder).</p>
        )}
        {mainTab === "custom" && (
          <p className={styles.legend}>Custom groups (placeholder).</p>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.count} data-testid="selection-count">
          {selectedIds.size} chart{selectedIds.size === 1 ? "" : "s"} selected
        </span>
        <button type="button" className={styles.btn}>
          Cancel
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
          Done
        </button>
      </div>
    </div>
  );
}
