"use client";

import { useEffect, useMemo, useState } from "react";

type Tool = { id: string; title: string; body: string; status: string; createdAt: number };
type Draft = Pick<Tool, "title" | "body" | "status">;
const STORE_KEY = "tools-dir-v2";
const SEED: Tool[] = [
  { id: "1", title: "JSON Formatter", body: "Pretty / minify", status: "Live", createdAt: Date.now() - 172800000 },
  { id: "2", title: "Color Picker", body: "Sample a screen color", status: "Live", createdAt: Date.now() - 86400000 },
];

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial); const [ready, setReady] = useState(false);
  useEffect(() => { try { const raw = window.localStorage.getItem(key); if (raw) setValue(JSON.parse(raw) as T); } catch { /* fallback */ } setReady(true); }, [key]);
  useEffect(() => { if (ready) window.localStorage.setItem(key, JSON.stringify(value)); }, [key, value, ready]);
  return [value, setValue] as const;
}

export default function Home() {
  const [items, setItems] = useLocalStorage<Tool[]>(STORE_KEY, SEED);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<Draft>({ title: "", body: "", status: "Draft" });
  const filtered = useMemo(() => items.filter((item) => `${item.title} ${item.body} ${item.status}`.toLowerCase().includes(query.toLowerCase())), [items, query]);
  const add = () => { if (!draft.title.trim()) return; setItems((current) => [{ id: crypto.randomUUID(), ...draft, title: draft.title.trim(), createdAt: Date.now() }, ...current]); setDraft({ title: "", body: "", status: "Draft" }); };

  return <main className="tool-room">
    <header className="tool-bar"><div className="tool-mark">B/08</div><div className="tool-name"><strong>UTILITY DRAWER</strong><span>SMALL INSTRUMENTS / LOCAL INDEX</span></div><div className="tool-state"><i /> {items.length} ENTRIES ON FILE</div></header>
    <section className="tool-hero"><div><p className="tool-kicker">BOOKCHAOWALIT / WORKSHOP INDEX</p><h1>Keep the<br /><em>instruments close.</em></h1><p className="hero-copy">A shelf for the tiny utilities that make a working day less repetitive.</p></div><div className="drawer-label"><span>DRAWER</span><strong>02</strong><b>HANDLE<br />WITH CARE</b></div></section>
    <section className="drawer-section" aria-label="Tools directory"><div className="drawer-top"><div><span className="tool-kicker">OPEN DRAWER / 001</span><h2>Available instruments</h2></div><label className="search-field"><span>Find a tool</span><input placeholder="Search the drawer" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
      <div className="drawer-rule"><span>{filtered.length} visible</span><span>LOCAL INDEX</span></div>
      <div className="tool-list">{filtered.length === 0 ? <div className="empty-drawer"><span>—</span><p>No instrument matches that search.</p></div> : filtered.map((item, index) => <article className="tool-line" key={item.id}><span className="tool-number">{String(index + 1).padStart(2, "0")}</span><div className="tool-copy"><strong>{item.title}</strong><span>{item.body}</span></div><span className="tool-status">{item.status}</span><button className="remove-tool" onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}>Remove</button></article>)}</div>
    </section>
    <section className="new-tool" aria-label="Add a tool"><div><span className="tool-kicker">NEW DRAWER CARD</span><h2>Label a useful thing.</h2><p>Entries stay in this browser and are not published as a working service.</p></div><div className="tool-form"><label><span>Title</span><input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="e.g. Markdown lint" /></label><label><span>Details</span><textarea value={draft.body} onChange={(event) => setDraft((current) => ({ ...current, body: event.target.value }))} placeholder="What does it help with?" rows={2} /></label><label><span>Status</span><select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}><option>Draft</option><option>Active</option><option>Done</option></select></label><button className="add-tool" onClick={add}>Put in drawer <b>↗</b></button></div></section>
    <footer className="tool-footer"><span>BOOKCHAOWALIT / TOOLS DIRECTORY</span><span>LOCAL BROWSER STATE · DEMO-GRADE</span></footer>
  </main>;
}
