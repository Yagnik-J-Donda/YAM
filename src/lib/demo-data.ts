export type LocationType = "home_area" | "room" | "cupboard" | "drawer" | "shelf" | "box" | "safe" | "bag" | "other";
export type ItemStatus = "active" | "loaned" | "missing" | "archived";
export type Location = { id: string; name: string; type: LocationType; parentId: string | null; notes?: string; updatedAt: string };
export type Item = { id: string; name: string; category: string; quantity: number; locationId: string; notes: string; value?: number; serial?: string; warranty?: string; status: ItemStatus; updatedAt: string; icon: string };
export const locations: Location[] = [
  { id: "entryway", name: "Entryway", type: "home_area", parentId: null, updatedAt: "2026-08-21" }, { id: "key-drawer", name: "Key Drawer", type: "drawer", parentId: "entryway", updatedAt: "2026-08-25" },
  { id: "office", name: "Office", type: "room", parentId: null, updatedAt: "2026-08-25" }, { id: "black-safe", name: "Black Safe", type: "safe", parentId: "office", notes: "Fireproof safe beside the bookcase", updatedAt: "2026-08-25" }, { id: "desk-drawer-1", name: "Desk Drawer 1", type: "drawer", parentId: "office", updatedAt: "2026-08-22" },
  { id: "bedroom", name: "Bedroom", type: "room", parentId: null, updatedAt: "2026-08-20" }, { id: "closet", name: "Closet", type: "cupboard", parentId: "bedroom", updatedAt: "2026-08-20" }, { id: "top-shelf", name: "Top Shelf", type: "shelf", parentId: "closet", updatedAt: "2026-08-20" }, { id: "blue-winter-box", name: "Blue Winter Box", type: "box", parentId: "top-shelf", updatedAt: "2026-08-24" },
  { id: "garage", name: "Garage", type: "room", parentId: null, updatedAt: "2026-08-19" }, { id: "tool-cabinet", name: "Tool Cabinet", type: "cupboard", parentId: "garage", updatedAt: "2026-08-23" },
];
export const items: Item[] = [
  { id: "canadian-passport", name: "Canadian Passport", category: "Documents", quantity: 1, locationId: "black-safe", notes: "Renewed in 2024. Keep with travel documents.", value: 160, status: "active", updatedAt: "2026-08-25", icon: "passport" },
  { id: "spare-iphone-cable", name: "Spare iPhone Cable", category: "Cables & Chargers", quantity: 2, locationId: "desk-drawer-1", notes: "USB-C to Lightning", status: "active", updatedAt: "2026-08-22", icon: "cable" },
  { id: "winter-jacket", name: "Winter Jacket", category: "Clothing", quantity: 1, locationId: "blue-winter-box", notes: "Navy parka, size M", status: "active", updatedAt: "2026-08-24", icon: "jacket" },
  { id: "car-keys", name: "Car Keys", category: "Other", quantity: 1, locationId: "key-drawer", notes: "Spare key set", status: "active", updatedAt: "2026-08-25", icon: "keys" },
  { id: "drill-machine", name: "Drill Machine", category: "Tools", quantity: 1, locationId: "tool-cabinet", notes: "18V cordless drill", serial: "DR-18249", warranty: "2026-09-18", value: 149, status: "active", updatedAt: "2026-08-23", icon: "drill" },
];
export const categories = ["Documents", "Electronics", "Cables & Chargers", "Clothing", "Jewellery & Valuables", "Tools", "Kitchen", "Medicines", "Travel", "Sports & Fitness", "Seasonal Items", "Other"];
export function getLocation(id: string) { return locations.find((l) => l.id === id); }
export function getItem(id: string) { return items.find((i) => i.id === id); }
export function locationPath(id: string) { const path: Location[] = []; let current = getLocation(id); while (current) { path.unshift(current); current = current.parentId ? getLocation(current.parentId) : undefined; } return path; }
export function fullPath(id: string) { return ["Canada Home", ...locationPath(id).map((l) => l.name)].join(" → "); }
