import type { XvsyAddedEntry } from "./xvsyTypes";

export type MainTab = "clinical" | "genomic" | "xvsy" | "gene" | "custom";
export type ClinicalCategory = "suggested" | "demographics" | "tumor" | "treatment";

export type Band = "common" | "demographic" | "tumor" | "treatment" | "genomic" | "other";

export interface FieldDef {
  id: string;
  label: string;
  tab: MainTab;
  clinicalCategory?: ClinicalCategory;
  inCohortPct: number | null;
  band: Band;
  /** Used only for small tile viz placeholder */
  tileKind:
    | "bar"
    | "pie"
    | "scatter"
    | "km"
    | "table"
    | "list"
    | "number"
    | "other";
}

export const CLINICAL_RAIL: { id: ClinicalCategory; label: string }[] = [
  { id: "suggested", label: "Common" },
  { id: "demographics", label: "Demographics" },
  { id: "tumor", label: "Tumor & stage" },
  { id: "treatment", label: "Treatment" },
];

export const FIELDS: FieldDef[] = [
  // Clinical — Common (suggested)
  {
    id: "clinical_summary",
    label: "Clinical Summary",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 98.1,
    band: "common",
    tileKind: "table",
  },
  {
    id: "sex",
    label: "Sex",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 98,
    band: "common",
    tileKind: "bar",
  },
  {
    id: "km_os",
    label: "KM Plot: Overall (months)",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 99.6,
    band: "common",
    tileKind: "km",
  },
  {
    id: "age_dx",
    label: "Age at Dx",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 94,
    band: "common",
    tileKind: "scatter",
  },
  {
    id: "current_age",
    label: "Current Age",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 99.9,
    band: "common",
    tileKind: "bar",
  },
  {
    id: "msi_score",
    label: "MSI Score",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 97.8,
    band: "common",
    tileKind: "bar",
  },
  {
    id: "msi_type",
    label: "MSI Type",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 97.8,
    band: "common",
    tileKind: "pie",
  },
  {
    id: "tumor_purity",
    label: "Tumor Purity",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 97.7,
    band: "common",
    tileKind: "bar",
  },
  {
    id: "overall_survival",
    label: "Overall survival",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 91,
    band: "common",
    tileKind: "km",
  },
  {
    id: "vital_status",
    label: "Vital status",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 96,
    band: "common",
    tileKind: "pie",
  },
  {
    id: "bmi_dx",
    label: "BMI at diagnosis",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 67,
    band: "common",
    tileKind: "bar",
  },
  {
    id: "ecog",
    label: "ECOG performance",
    tab: "clinical",
    clinicalCategory: "suggested",
    inCohortPct: 71,
    band: "common",
    tileKind: "bar",
  },

  // Clinical — Demographics
  {
    id: "ethnicity",
    label: "Ethnicity",
    tab: "clinical",
    clinicalCategory: "demographics",
    inCohortPct: 72,
    band: "demographic",
    tileKind: "pie",
  },
  {
    id: "race",
    label: "Race",
    tab: "clinical",
    clinicalCategory: "demographics",
    inCohortPct: 89,
    band: "demographic",
    tileKind: "pie",
  },
  {
    id: "country_birth",
    label: "Country of birth",
    tab: "clinical",
    clinicalCategory: "demographics",
    inCohortPct: 66,
    band: "demographic",
    tileKind: "bar",
  },
  {
    id: "education_level",
    label: "Education level",
    tab: "clinical",
    clinicalCategory: "demographics",
    inCohortPct: 44,
    band: "demographic",
    tileKind: "bar",
  },
  {
    id: "income_bracket",
    label: "Income bracket",
    tab: "clinical",
    clinicalCategory: "demographics",
    inCohortPct: 47,
    band: "demographic",
    tileKind: "scatter",
  },

  // Clinical — Tumor & stage
  {
    id: "tumor_site_pleura",
    label: "Tumor Site: Pleura (NLP)",
    tab: "clinical",
    clinicalCategory: "tumor",
    inCohortPct: 82,
    band: "tumor",
    tileKind: "pie",
  },
  {
    id: "tumor_site_repro",
    label: "Tumor Site: Reproductive Organs (NLP)",
    tab: "clinical",
    clinicalCategory: "tumor",
    inCohortPct: 79,
    band: "tumor",
    tileKind: "pie",
  },
  {
    id: "ajcc_stage",
    label: "AJCC pathologic stage",
    tab: "clinical",
    clinicalCategory: "tumor",
    inCohortPct: 85,
    band: "tumor",
    tileKind: "bar",
  },
  {
    id: "tnm_t",
    label: "Tumor (T)",
    tab: "clinical",
    clinicalCategory: "tumor",
    inCohortPct: 80,
    band: "tumor",
    tileKind: "bar",
  },
  {
    id: "histologic_grade",
    label: "Histologic grade",
    tab: "clinical",
    clinicalCategory: "tumor",
    inCohortPct: 79,
    band: "tumor",
    tileKind: "bar",
  },
  {
    id: "tnm_n",
    label: "Nodes (N)",
    tab: "clinical",
    clinicalCategory: "tumor",
    inCohortPct: 74,
    band: "tumor",
    tileKind: "bar",
  },
  {
    id: "tnm_m",
    label: "Metastasis (M)",
    tab: "clinical",
    clinicalCategory: "tumor",
    inCohortPct: 81,
    band: "tumor",
    tileKind: "pie",
  },

  // Clinical — Treatment
  {
    id: "treat_per_sample",
    label: "Treatment per Sample (pre/post)",
    tab: "clinical",
    clinicalCategory: "treatment",
    inCohortPct: 86.1,
    band: "treatment",
    tileKind: "table",
  },
  {
    id: "treat_per_patient",
    label: "Treatment per Patient",
    tab: "clinical",
    clinicalCategory: "treatment",
    inCohortPct: 85.8,
    band: "treatment",
    tileKind: "table",
  },
  {
    id: "first_line_therapy",
    label: "First-line therapy",
    tab: "clinical",
    clinicalCategory: "treatment",
    inCohortPct: 45,
    band: "treatment",
    tileKind: "list",
  },
  {
    id: "drug_name",
    label: "Drug name",
    tab: "clinical",
    clinicalCategory: "treatment",
    inCohortPct: 38,
    band: "treatment",
    tileKind: "list",
  },
  {
    id: "radiation_therapy",
    label: "Radiation therapy",
    tab: "clinical",
    clinicalCategory: "treatment",
    inCohortPct: 68,
    band: "treatment",
    tileKind: "pie",
  },
  {
    id: "immunotherapy_regimen",
    label: "Immunotherapy regimen",
    tab: "clinical",
    clinicalCategory: "treatment",
    inCohortPct: 29,
    band: "treatment",
    tileKind: "list",
  },
  {
    id: "surgery_type",
    label: "Surgery type",
    tab: "clinical",
    clinicalCategory: "treatment",
    inCohortPct: 91,
    band: "treatment",
    tileKind: "list",
  },

  // Genomic (subset)
  {
    id: "mutation_count",
    label: "Mutation count",
    tab: "genomic",
    inCohortPct: 95.3,
    band: "genomic",
    tileKind: "bar",
  },
  {
    id: "fraction_genome_altered",
    label: "Fraction genome altered",
    tab: "genomic",
    inCohortPct: 99.3,
    band: "genomic",
    tileKind: "scatter",
  },
  {
    id: "tmb",
    label: "Tumor mutational burden (TMB)",
    tab: "genomic",
    inCohortPct: 79,
    band: "genomic",
    tileKind: "bar",
  },
  {
    id: "msi_status",
    label: "MSI status",
    tab: "genomic",
    inCohortPct: 84,
    band: "genomic",
    tileKind: "pie",
  },
];

export const DEFAULT_SELECTED_IDS = new Set<string>(["sex", "age_dx"]);

export function bandSort(band: Band): number {
  switch (band) {
    case "common":
      return 10;
    case "demographic":
      return 20;
    case "tumor":
      return 30;
    case "treatment":
      return 40;
    case "genomic":
      return 50;
    case "other":
    default:
      return 90;
  }
}

export function cohortWord(pct: number | null): "Strong" | "Moderate" | "Sparse" | "—" {
  if (pct === null) return "—";
  if (pct >= 75) return "Strong";
  if (pct >= 50) return "Moderate";
  return "Sparse";
}

/** Map an added X vs Y chart to a grid field (Study View tile). */
export function fieldDefFromXvsyEntry(e: XvsyAddedEntry): FieldDef {
  return {
    id: e.id,
    label: e.label,
    tab: "xvsy",
    inCohortPct: e.inCohortPct,
    band: "genomic",
    tileKind: e.viz === "violin" ? "table" : "scatter",
  };
}

