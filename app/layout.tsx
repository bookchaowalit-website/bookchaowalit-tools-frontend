import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Utility Drawer | Bookchaowalit", description: "A local index for small internal tools." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
