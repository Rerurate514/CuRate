import { useState, useEffect } from "hono/jsx";
import { FileExplorer } from "../presentation/drive/file_explorer";
import type { z } from "zod";
import { DriveEntriesSchema } from "../domain/schemas/drive_entries.schema";
import { MenuItem } from "../presentation/types/memu_item";

type Entries = NonNullable<z.infer<typeof DriveEntriesSchema>["entries"]>;

type MenuState = {
  x: number;
  y: number;
  item: MenuItem;
} | null;

type Props = {
  initialEntries: Entries;
  currentPath: string;
};

export default function FileExplorerWrapper({
  initialEntries,
  currentPath,
}: Props) {
  const [entries, setEntries] = useState<Entries>(initialEntries);
  const [menu, setMenu] = useState<MenuState>(null);

  useEffect(() => {
    const handleUploadSuccess = async () => {
      const response = await fetch(`/api/drive/entries?path=${currentPath}`);
      if (response.ok) {
        const data = await response.json();
        const parsed = DriveEntriesSchema.safeParse(data);
        if (parsed.success && parsed.data.entries) {
          setEntries(parsed.data.entries);
        }
      }
    };
    window.addEventListener("reload-explorer", handleUploadSuccess);

    const handleClick = () => setMenu(null);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("reload-explorer", handleUploadSuccess);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleContextMenu = (e: MouseEvent, item: MenuItem) => {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY, item });
  };

  //TODO: RPC化
  const handleDownload = () => {
    if (!menu) return;
    window.location.href = `/api/drive/download?path=${encodeURIComponent(menu.item.path)}`;
    setMenu(null);
  };

  const handleDelete = async () => {
    if (!menu) return;
    await fetch(`/api/drive/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetPath: menu.item.path }),
    });
    setMenu(null);
    window.dispatchEvent(new CustomEvent("reload-explorer"));
  };

  return (
    <div>
      <FileExplorer
        entries={entries}
        onContextMenu={handleContextMenu}
        currentPath={currentPath}
      />

      {menu && (
        <div
          class="fixed z-50 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-40 text-sm"
          style={`top:${menu.y}px;left:${menu.x}px`}
        >
          <div class="px-3 py-1.5 text-xs text-slate-400 font-medium truncate border-b border-slate-100 mb-1">
            {menu.item.name}
          </div>
          <button
            class="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
            onClick={handleDownload}
          >
            ⬇️ ダウンロード
          </button>
          <button
            class="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
            onClick={handleDelete}
          >
            🗑️ 消去
          </button>
        </div>
      )}
    </div>
  );
}
