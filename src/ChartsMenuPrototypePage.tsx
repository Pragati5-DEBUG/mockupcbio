import { useMemo, useState } from "react";
import { ChartsMenuDialog } from "./ChartsMenuDialog";
import styles from "./ChartsMenuDialog.module.css";
import type { ClinicalCategory, FieldDef, MainTab } from "./mockData";
import { DEFAULT_SELECTED_IDS, FIELDS, fieldDefFromXvsyEntry } from "./mockData";
import { StudyViewGrid } from "./StudyViewGrid";
import type { XvsyAddedEntry } from "./xvsyTypes";

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

export function ChartsMenuPrototypePage() {
  const [mainTab, setMainTab] = useState<MainTab>("clinical");
  const [clinicalCat, setClinicalCat] = useState<ClinicalCategory>("suggested");
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(DEFAULT_SELECTED_IDS));
  const [xvsyEntries, setXvsyEntries] = useState<XvsyAddedEntry[]>([]);

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const q = normalize(query);
  const searchMode = q.length > 0 && mainTab === "clinical";

  const visibleFieldsByClinicalCategory = useMemo(() => {
    const out: Record<ClinicalCategory, FieldDef[]> = {
      suggested: [],
      demographics: [],
      tumor: [],
      treatment: [],
    };
    const fields = FIELDS.filter((f) => f.tab === "clinical");
    for (const f of fields) {
      const cat = f.clinicalCategory ?? "suggested";
      if (!q || normalize(f.label).includes(q)) out[cat].push(f);
    }
    return out;
  }, [q]);

  const visibleGenomicFields = useMemo(() => {
    const fields = FIELDS.filter((f) => f.tab === "genomic");
    if (!query.trim()) return fields;
    return fields.filter((f) => normalize(f.label).includes(q));
  }, [q, query]);

  const selectedFields = useMemo(() => {
    const byId = new Map<string, FieldDef>();
    for (const f of FIELDS) byId.set(f.id, f);
    const fromStatic = [...selectedIds]
      .map((id) => byId.get(id))
      .filter((v): v is FieldDef => !!v);
    const fromXvsy = xvsyEntries
      .filter((e) => selectedIds.has(e.id))
      .map((e) => fieldDefFromXvsyEntry(e));
    return [...fromStatic, ...fromXvsy];
  }, [selectedIds, xvsyEntries]);

  const addXvsyEntry = (entry: XvsyAddedEntry) => {
    setXvsyEntries((prev) => [...prev, entry]);
    setSelectedIds((prev) => new Set(prev).add(entry.id));
  };

  const removeXvsyEntry = (id: string) => {
    setXvsyEntries((prev) => prev.filter((e) => e.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.prototypeLayout}>
        <main className={styles.prototypeMain}>
          <StudyViewGrid selectedFields={selectedFields} hoveredId={hoveredId} />
        </main>

        <aside className={styles.prototypeMenuDock} aria-label="Add charts panel">
          <ChartsMenuDialog
            mainTab={mainTab}
            setMainTab={(t) => {
              setMainTab(t);
              // keep query as-is when switching, like mockup
            }}
            clinicalCat={clinicalCat}
            setClinicalCat={(c) => {
              setClinicalCat(c);
              if (!searchMode) setQuery("");
            }}
            query={query}
            setQuery={setQuery}
            selectedIds={selectedIds}
            toggleSelected={toggleSelected}
            visibleFieldsByClinicalCategory={visibleFieldsByClinicalCategory}
            visibleGenomicFields={visibleGenomicFields}
            onHoverFieldId={setHoveredId}
            xvsyEntries={xvsyEntries}
            onAddXvsyEntry={addXvsyEntry}
            onRemoveXvsyEntry={removeXvsyEntry}
          />
        </aside>
      </div>
    </div>
  );
}

