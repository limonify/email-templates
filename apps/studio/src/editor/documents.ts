import {
  createEmptyDocument,
  parseDocument,
  type EmailDocument,
} from "@limonify/email-templates/web";

const STORAGE_KEY = "limonify.studio.documents";
const LAST_OPENED_KEY = "limonify.studio.last-document";

export interface DocumentSummary {
  id: string;
  name: string;
  updatedAt?: string;
  blocks: number;
}

function readAll(): Record<string, EmailDocument> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, EmailDocument> = {};
    for (const [id, value] of Object.entries(parsed)) {
      try {
        out[id] = parseDocument(value);
      } catch {
        // A single corrupt entry must not take the whole library down.
      }
    }
    return out;
  } catch {
    return {};
  }
}

function writeAll(documents: Record<string, EmailDocument>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
}

export function listDocuments(): DocumentSummary[] {
  return Object.values(readAll())
    .map((doc) => ({
      id: doc.id,
      name: doc.name,
      updatedAt: doc.updatedAt,
      blocks: doc.blocks.length,
    }))
    .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
}

export function loadDocument(id: string): EmailDocument | null {
  return readAll()[id] ?? null;
}

export function saveDocument(doc: EmailDocument) {
  const all = readAll();
  all[doc.id] = doc;
  writeAll(all);
  localStorage.setItem(LAST_OPENED_KEY, doc.id);
}

export function deleteDocument(id: string) {
  const all = readAll();
  delete all[id];
  writeAll(all);
  if (localStorage.getItem(LAST_OPENED_KEY) === id) {
    localStorage.removeItem(LAST_OPENED_KEY);
  }
}

export function lastOpenedDocument(): EmailDocument | null {
  const id = localStorage.getItem(LAST_OPENED_KEY);
  return id ? loadDocument(id) : null;
}

export function duplicateDocument(doc: EmailDocument): EmailDocument {
  const copy = parseDocument({
    ...structuredClone(doc),
    id: createEmptyDocument().id,
    name: `${doc.name} copy`,
  });
  saveDocument(copy);
  return copy;
}
