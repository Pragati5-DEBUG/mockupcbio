/** Mock clinical attributes for X vs Y (mirrors AddChartButton.tsx / Study View). */

export type ClinicalDatatype = "NUMBER" | "STRING";

export interface XvsyClinicalAttr {
  id: string;
  label: string;
  datatype: ClinicalDatatype;
}

export const XVSY_ATTRIBUTES: XvsyClinicalAttr[] = [
  { id: "MUTATION_COUNT", label: "Mutation Count", datatype: "NUMBER" },
  {
    id: "FRACTION_GENOME_ALTERED",
    label: "Fraction Genome Altered",
    datatype: "NUMBER",
  },
  { id: "AGE_AT_DX", label: "Age at Diagnosis", datatype: "NUMBER" },
  { id: "TUMOR_PURITY", label: "Tumor Purity", datatype: "NUMBER" },
  { id: "TMB", label: "Tumor Mutational Burden", datatype: "NUMBER" },
  { id: "MSI_SCORE", label: "MSI Score", datatype: "NUMBER" },
  { id: "SEX", label: "Sex", datatype: "STRING" },
  { id: "TUMOR_SITE", label: "Primary Tumor Site", datatype: "STRING" },
  { id: "MSI_TYPE", label: "MSI Type", datatype: "STRING" },
];

export function makeXvsYPairKey(xId: string, yId: string): string {
  return [xId, yId].sort().join("|");
}

/** Same order as cBioPortal `makeXvsYDisplayName`: Y vs X */
export function makeXvsYDisplayName(
  xAttr: XvsyClinicalAttr,
  yAttr: XvsyClinicalAttr
): string {
  return `${yAttr.label} vs ${xAttr.label}`;
}

export type XvsyVizKind = "scatter" | "violin";

export interface XvsyAddedEntry {
  id: string;
  pairKey: string;
  label: string;
  viz: XvsyVizKind;
  inCohortPct: number;
}

const xvsyAttrMap = Object.fromEntries(
  XVSY_ATTRIBUTES.map((a) => [a.id, a])
);

export function getXvsyAttr(id: string): XvsyClinicalAttr | undefined {
  return xvsyAttrMap[id];
}

export type XvsyAddButtonState =
  | { disabled: true; label: string }
  | { disabled: false; label: string; viz: XvsyVizKind };

export function computeXvsyAddState(
  xId: string,
  yId: string,
  existingPairKeys: Set<string>
): XvsyAddButtonState {
  if (!xId || !yId) {
    return { disabled: true, label: "Add Chart" };
  }
  if (xId === yId) {
    return { disabled: true, label: "Please choose two different attributes." };
  }
  const a1 = getXvsyAttr(xId);
  const a2 = getXvsyAttr(yId);
  if (!a1 || !a2) {
    return { disabled: true, label: "Add Chart" };
  }
  const key = makeXvsYPairKey(xId, yId);
  if (existingPairKeys.has(key)) {
    return {
      disabled: true,
      label: "A chart with these attributes already exists",
    };
  }
  if (a1.datatype === "STRING" && a2.datatype === "STRING") {
    return {
      disabled: true,
      label: "Can't add a chart with two categorical attributes (yet).",
    };
  }
  const viz: XvsyVizKind =
    (a1.datatype === "NUMBER" && a2.datatype === "STRING") ||
    (a1.datatype === "STRING" && a2.datatype === "NUMBER")
      ? "violin"
      : "scatter";
  const label = viz === "violin" ? "Add violin/box plot table" : "Add density plot";
  return { disabled: false, label, viz };
}
