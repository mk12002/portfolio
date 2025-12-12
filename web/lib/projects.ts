export type Project = {
  id: string;
  slug: string;
  title: string;
  shortTagline: string;
  status: "under-construction" | "live" | "demo";
  tags: string[];
  category: "Vision" | "Audio" | "Reasoning" | "AgriTech" | "Legal AI";
  primaryMetric?: string;
};

export const projects: Project[] = [];
