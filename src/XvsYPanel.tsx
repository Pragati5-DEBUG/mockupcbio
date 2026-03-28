import { useMemo, useState } from "react";
import styles from "./ChartsMenuDialog.module.css";
import {
  XVSY_ATTRIBUTES,
  computeXvsyAddState,
  getXvsyAttr,
  makeXvsYDisplayName,
  makeXvsYPairKey,
  type XvsyAddedEntry,
} from "./xvsyTypes";
import { cohortWord } from "./mockData";

export function XvsYPanel({
  entries,
  selectedIds,
  onAddEntry,
  onRemoveEntry,
  toggleSelected,
  onHoverId,
}: {
  entries: XvsyAddedEntry[];
  selectedIds: Set<string>;
  onAddEntry: (entry: XvsyAddedEntry) => void;
  onRemoveEntry: (id: string) => void;
  toggleSelected: (id: string) => void;
  onHoverId: (id: string | null) => void;
}) {
  const [xId, setXId] = useState("");
  const [yId, setYId] = useState("");

  const existingPairKeys = useMemo(
    () => new Set(entries.map((e) => e.pairKey)),
    [entries]
  );

  const addState = computeXvsyAddState(xId, yId, existingPairKeys);

  const optionLabel = (a: (typeof XVSY_ATTRIBUTES)[0]) =>
    `${a.label} (${a.datatype === "NUMBER" ? "#" : "Abc"})`;

  return (
    <div className={styles.xvsyRoot}>
      <p className={styles.legend}>
        <strong>X vs Y</strong> — choose two clinical attributes (Study View pattern). Two numbers →
        density plot; number + category → violin/box table. Title order: <strong>Y vs X</strong>.
      </p>
      <div className={styles.xvsyPicker}>
        <div>
          <label className={styles.xvsyLabel} htmlFor="xvsy-x">
            First clinical attribute
          </label>
          <select
            id="xvsy-x"
            className={styles.xvsySelect}
            value={xId}
            onChange={(e) => setXId(e.target.value)}
            aria-label="Select first clinical attribute"
          >
            <option value="">Select first clinical attribute…</option>
            {XVSY_ATTRIBUTES.map((a) => (
              <option key={a.id} value={a.id}>
                {optionLabel(a)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.xvsyVs} aria-hidden>
          vs.
        </div>
        <div>
          <label className={styles.xvsyLabel} htmlFor="xvsy-y">
            Second clinical attribute
          </label>
          <select
            id="xvsy-y"
            className={styles.xvsySelect}
            value={yId}
            onChange={(e) => setYId(e.target.value)}
            aria-label="Select second clinical attribute"
          >
            <option value="">Select second clinical attribute…</option>
            {XVSY_ATTRIBUTES.map((a) => (
              <option key={a.id} value={a.id}>
                {optionLabel(a)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.xvsyAddWrap}>
          <button
            type="button"
            className={styles.btnXvsyAdd}
            disabled={addState.disabled}
            data-testid="xvsy-submit"
            onClick={() => {
              if (addState.disabled) return;
              const ax = getXvsyAttr(xId)!;
              const ay = getXvsyAttr(yId)!;
              const pairKey = makeXvsYPairKey(xId, yId);
              const id = `xvsy:${pairKey}`;
              const label = makeXvsYDisplayName(ax, ay);
              const seed =
                (xId + yId).split("").reduce((s, c) => s + c.charCodeAt(0), 0) % 35;
              onAddEntry({
                id,
                pairKey,
                label,
                viz: addState.viz,
                inCohortPct: 68 + seed,
              });
              setXId("");
              setYId("");
            }}
          >
            {addState.label}
          </button>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className={styles.xvsyEmpty}>
          No X vs Y charts added yet. Pick two attributes above, then use the button.
        </p>
      ) : null}

      {entries.length > 0 ? (
        <section className={styles.xvsyAdded} aria-label="Added X vs Y charts">
          <div className={styles.xvsyRowHead} aria-hidden>
            <span>Chart</span>
            <span>In cohort</span>
            <span />
          </div>
          {entries.map((e) => (
            <div
              key={e.id}
              className={styles.xvsyRow}
              onMouseEnter={() => onHoverId(e.id)}
              onMouseLeave={() => onHoverId(null)}
            >
              <label className={styles.rowLabel}>
                <input
                  type="checkbox"
                  checked={selectedIds.has(e.id)}
                  onChange={() => toggleSelected(e.id)}
                  aria-label={e.label}
                />
                <span>{e.label}</span>
              </label>
              <span className={styles.covWord}>{cohortWord(e.inCohortPct)}</span>
              <button
                type="button"
                className={styles.xvsyRemove}
                title="Remove chart"
                aria-label={`Remove ${e.label}`}
                onClick={() => onRemoveEntry(e.id)}
              >
                ×
              </button>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
