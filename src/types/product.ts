export type Category = "Home" | "On the Go" | "Workspace";
export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  price: number;
  image: string;
  stock: number;
  badge?: string;
  options?: { name: string; values: string[] };
  description: string;
  details: string[];
};
