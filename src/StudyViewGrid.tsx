import { useEffect, useRef } from "react";
import styles from "./ChartsMenuDialog.module.css";
import type { FieldDef } from "./mockData";
import { bandSort } from "./mockData";

function MiniViz({ kind }: { kind: FieldDef["tileKind"] }) {
  if (kind === "pie") {
    return (
      <div className={styles.vizPie} aria-hidden>
        <svg viewBox="0 0 100 100" focusable="false">
          <circle cx="50" cy="50" r="40" fill="#e9eef5" />
          <path d="M50,50 L50,10 A40,40 0 0,1 88,62 Z" fill="#2b7bbb" />
          <path d="M50,50 L88,62 A40,40 0 0,1 26,86 Z" fill="#e06a1d" />
          <circle cx="50" cy="50" r="22" fill="#ffffff" />
        </svg>
      </div>
    );
  }
  if (kind === "km") {
    return (
      <div className={styles.vizKm} aria-hidden>
        <svg viewBox="0 0 140 70" focusable="false">
          <path
            d="M8 12 H28 V18 H46 V26 H70 V34 H92 V43 H110 V54 H130"
            fill="none"
            stroke="#2b7bbb"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 18 H34 V26 H56 V34 H74 V40 H96 V48 H118 V58 H130"
            fill="none"
            stroke="#e06a1d"
            strokeWidth="2.5"
            strokeLinejoin="round"
            opacity="0.75"
          />
        </svg>
      </div>
    );
  }
  if (kind === "scatter") {
    return (
      <div className={styles.vizScatter} aria-hidden>
        <svg viewBox="0 0 140 70" focusable="false">
          <rect x="8" y="8" width="124" height="54" rx="4" fill="#f4f6fa" />
          {[
            [30, 42, "#2b7bbb"],
            [44, 24, "#e06a1d"],
            [60, 44, "#2b7bbb"],
            [78, 18, "#e06a1d"],
            [98, 34, "#2b7bbb"],
            [112, 22, "#e06a1d"],
          ].map(([x, y, c], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill={c as string} opacity="0.9" />
          ))}
        </svg>
      </div>
    );
  }
  if (kind === "table") {
    return (
      <div className={styles.vizTable} aria-hidden>
        <div className={styles.vizTableHead}>
          <span>Name</span>
          <span style={{ textAlign: "right" }}>Freq</span>
        </div>
        <div className={styles.vizTableBody}>
          <div className={styles.vizTableRow}>
            <span>—</span>
            <span style={{ textAlign: "right" }}>—</span>
          </div>
          <div className={styles.vizTableRow}>
            <span>—</span>
            <span style={{ textAlign: "right" }}>—</span>
          </div>
          <div className={styles.vizTableRow}>
            <span>—</span>
            <span style={{ textAlign: "right" }}>—</span>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "list") {
    return (
      <div className={styles.vizList} aria-hidden>
        <span className={styles.vizListItem} />
        <span className={styles.vizListItem} />
        <span className={styles.vizListItem} />
        <span className={styles.vizListItem} />
      </div>
    );
  }
  // bar / default
  return (
    <div className={styles.vizBars} aria-hidden>
      <span style={{ height: 10 }} />
      <span style={{ height: 18 }} />
      <span style={{ height: 12 }} />
      <span style={{ height: 6 }} />
    </div>
  );
}

const HOVER_SCROLL_MS = 1000;

export function StudyViewGrid({
  selectedFields,
  hoveredId,
}: {
  selectedFields: FieldDef[];
  hoveredId: string | null;
}) {
  const tileRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    if (!hoveredId) return;
    const t = window.setTimeout(() => {
      const el = tileRefs.current.get(hoveredId);
      el?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }, HOVER_SCROLL_MS);
    return () => clearTimeout(t);
  }, [hoveredId]);

  const tiles = [...selectedFields].sort((a, b) => {
    const sa = bandSort(a.band);
    const sb = bandSort(b.band);
    if (sa !== sb) return sa - sb;
    return a.label.localeCompare(b.label);
  });

  let prevBand: FieldDef["band"] | null = null;

  return (
    <div
      className={`${styles.studyGrid} ${hoveredId ? styles.studyGridHovering : ""}`}
      aria-label="Study View charts (mock)"
    >
      {tiles.map((f) => {
        const isHovered = hoveredId ? hoveredId === f.id : false;
        const bandGap = prevBand !== null && f.band !== prevBand;
        prevBand = f.band;
        return (
          <div
            key={f.id}
            ref={(el) => {
              if (el) tileRefs.current.set(f.id, el);
              else tileRefs.current.delete(f.id);
            }}
            className={[
              styles.tile,
              isHovered ? styles.tileHovered : "",
              hoveredId && !isHovered ? styles.tileDim : "",
              bandGap ? styles.tileBandGap : "",
            ]
              .filter(Boolean)
              .join(" ")}
            data-band={f.band}
            data-testid={`tile-${f.id}`}
          >
            <div className={styles.tileTitle}>{f.label}</div>
            <div className={styles.tileViz}>
              <MiniViz kind={f.tileKind} />
            </div>
            <div className={styles.tileMeta}>
              <span className={styles.tilePill}>
                N <b>{f.inCohortPct === null ? "—" : 92}</b>
              </span>
              <span className={styles.tileMetaMuted}>demo chart</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

