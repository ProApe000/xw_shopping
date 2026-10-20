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
export const products: Product[] = [
  {
    id: "p1",
    slug: "sunday-stoneware-mug",
    name: "Sunday Stoneware Mug",
    subtitle: "A slower start to your morning.",
    category: "Home",
    price: 2400,
    image: "mug",
    stock: 12,
    badge: "Everyday favorite",
    options: { name: "Size", values: ["300 ml", "450 ml"] },
    description:
      "For the first sip and the last quiet moment. A beautifully simple ceramic mug with a comfortable handle and a softly glazed finish. Made for the rituals you look forward to.",
    details: [
      "Glazed ceramic · comfortable rounded handle",
      "Choose 300 ml or 450 ml",
      "Dishwasher and microwave safe",
    ],
  },
  {
    id: "p2",
    slug: "everyday-backpack",
    name: "Everyday Backpack",
    subtitle: "Pack light. Go a little further.",
    category: "On the Go",
    price: 6800,
    image: "bag",
    stock: 8,
    badge: "The daily essential",
    description:
      "Your everyday companion, from the morning commute to a spontaneous weekend. A clean silhouette with room for the things that matter and a place for the little things.",
    details: [
      "Durable woven shell",
      "Padded laptop compartment · fits up to 14 inches",
      "Adjustable shoulder straps · 18 L capacity",
    ],
  },
  {
    id: "p3",
    slug: "arc-desk-lamp",
    name: "Arc Desk Lamp",
    subtitle: "A brighter corner of your day.",
    category: "Workspace",
    price: 7900,
    image: "lamp",
    stock: 6,
    description:
      "A little light makes all the difference. This considered desk lamp brings a warm glow and a sculptural touch to your favorite reading spot or workspace.",
    details: [
      "Metal construction with a matte finish",
      "Adjustable shade · 1.5 m cord",
      "US plug · compatible LED bulb included",
    ],
  },
  {
    id: "p4",
    slug: "quiet-hours-candle",
    name: "Quiet Hours Candle",
    subtitle: "A small ritual. A softer evening.",
    category: "Home",
    price: 3200,
    image: "candle",
    stock: 15,
    badge: "Slow living",
    options: { name: "Scent", values: ["Cedar & Fig", "Sandalwood"] },
    description:
      "Close the laptop. Put on a record. Let a soft, grounding scent help you settle into the evening. A simple candle for a well-deserved moment to yourself.",
    details: [
      "Plant-based wax blend · cotton wick",
      "220 g · approximately 40 hours of burn time",
      "Trim wick before use; never leave unattended",
    ],
  },
  {
    id: "p5",
    slug: "form-ceramic-cups",
    name: "Form Ceramic Cups",
    subtitle: "A little character for your coffee corner.",
    category: "Home",
    price: 3800,
    image: "ceramics",
    stock: 9,
    description:
      "Organic lines and a quiet texture bring a little character to your daily rituals. A set of simple ceramic cups that feels at home on an open shelf or at a slow Sunday breakfast.",
    details: [
      "Set of three glazed ceramic cups",
      "Mixed shapes · approximately 150–250 ml",
      "Hand wash recommended",
    ],
  },
  {
    id: "p6",
    slug: "roam-water-bottle",
    name: "Roam Water Bottle",
    subtitle: "Stay refreshed, wherever you wander.",
    category: "On the Go",
    price: 2800,
    image: "bottle",
    stock: 20,
    options: { name: "Size", values: ["500 ml", "750 ml"] },
    description:
      "A refillable companion for long walks, busy mornings and the in-between moments. Easy to carry and designed to become part of your daily routine.",
    details: [
      "Reusable bottle with a secure screw lid",
      "Choose 500 ml or 750 ml",
      "Hand wash recommended",
    ],
  },
  {
    id: "p7",
    slug: "weekender-sunglasses",
    name: "Weekender Sunglasses",
    subtitle: "For the sunny side of life.",
    category: "On the Go",
    price: 4500,
    image: "sunglasses",
    stock: 10,
    description:
      "An easy, timeless shape for weekends that turn into adventures. Lightweight frames keep things comfortable from the first coffee to the last light.",
    details: [
      "Lightweight frame · tinted lenses",
      "One size · protective soft pouch included",
      "Clean with a microfiber cloth",
    ],
  },
  {
    id: "p8",
    slug: "daybreak-watch",
    name: "Daybreak Watch",
    subtitle: "Make a little time for yourself.",
    category: "On the Go",
    price: 8900,
    image: "watch",
    stock: 5,
    description:
      "A detailed dial and a classic profile bring a little character to your wrist. An everyday watch for keeping your own pace.",
    details: [
      "Analog display · detailed dial",
      "Adjustable strap · 38 mm case",
      "Wipe dry after exposure to moisture",
    ],
  },
  {
    id: "p9",
    slug: "focus-headphones",
    name: "Focus Headphones",
    subtitle: "Find your own little world.",
    category: "Workspace",
    price: 9900,
    image: "headphones",
    stock: 7,
    badge: "Find your focus",
    description:
      "Your favorite playlist, a fresh page, and a little space to think. Cushioned headphones bring comfort to your everyday listening routine.",
    details: [
      "Over-ear cushioned design",
      "Wired connection · 3.5 mm audio jack",
      "Adjustable headband",
    ],
  },
  {
    id: "p10",
    slug: "open-page-notebook",
    name: "Open Page Notebook",
    subtitle: "Room for your next good idea.",
    category: "Workspace",
    price: 1800,
    image: "notebook",
    stock: 25,
    options: { name: "Pages", values: ["Lined", "Blank"] },
    description:
      "For scattered thoughts, big plans, and the things you want to remember. A simple notebook that invites you to get away from the screen and onto the page.",
    details: [
      "A5 size · 160 pages",
      "Choose lined or blank pages",
      "Lay-flat binding · soft-touch cover",
    ],
  },
  {
    id: "p11",
    slug: "type-compact-keyboard",
    name: "Type Compact Keyboard",
    subtitle: "A satisfying rhythm for your work.",
    category: "Workspace",
    price: 11900,
    image: "keyboard",
    stock: 0,
    badge: "Back soon",
    description:
      "Bring a tactile touch to your daily work. A compact keyboard with a comfortable layout and a pleasing feel for every note, idea, and message.",
    details: [
      "Low-profile keys · US English layout",
      "Wired USB connection",
      "Compatible with macOS and Windows",
    ],
  },
  {
    id: "p12",
    slug: "pause-accent-chair",
    name: "Pause Accent Chair",
    subtitle: "Your new favorite place to do nothing.",
    category: "Home",
    price: 18900,
    image: "chair",
    stock: 3,
    description:
      "A soft landing at the end of a busy day. With an inviting shape and an easy presence, this accent chair makes a quiet corner feel like your own.",
    details: [
      "Upholstered seat · supportive frame",
      "For indoor use · light assembly required",
      "Spot clean with a damp cloth",
    ],
  },
];
export const categories: Category[] = ["Home", "On the Go", "Workspace"];
export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );
export const getProduct = (id: string) => products.find((p) => p.id === id);
