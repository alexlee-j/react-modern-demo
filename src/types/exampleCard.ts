export interface ExampleCard {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  category: "hooks" | "apis" | "patterns";
  tags: string[];
  lastUpdated: string;
}
