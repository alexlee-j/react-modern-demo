import { ExampleCard } from '../types/exampleCard';

export const examples: ExampleCard[] = [
  {
    id: "use-form",
    title: "Form Validation with React Hook Form",
    description: "Learn how to implement form validation using React Hook Form with custom validation rules.",
    difficulty: 3,
    category: "hooks",
    tags: ["forms", "validation", "hooks"],
    lastUpdated: "2024-02-15",
  },
  {
    id: "suspense-data",
    title: "Data Fetching with Suspense",
    description: "Explore the new Suspense patterns for handling asynchronous data loading.",
    difficulty: 4,
    category: "patterns",
    tags: ["suspense", "async", "loading"],
    lastUpdated: "2024-02-14",
  },
  {
    id: "use-server",
    title: "Server Actions with use server",
    description: "Learn how to implement server-side mutations using the new use server directive.",
    difficulty: 5,
    category: "apis",
    tags: ["server", "mutations", "forms"],
    lastUpdated: "2024-02-13",
  },
];
