import { useState, useEffect } from "hono/jsx";
import { FileExplorer } from "../presentation/drive/file_explorer";
import type { z } from "zod";
import { DriveEntriesSchema } from "../domain/schemas/drive_entries.schema";

type Entries = NonNullable<z.infer<typeof DriveEntriesSchema>["entries"]>;

type Props = {
  initialEntries: Entries;
};

export default function FileExplorerWrapper({ initialEntries }: Props) {
  const [entries, setEntries] = useState<Entries>(initialEntries);

  useEffect(() => {
    const handleUploadSuccess = async () => {
      const response = await fetch("/api/drive/entries");
      if (response.ok) {
        const data = await response.json();
        const parsed = DriveEntriesSchema.safeParse(data);
        if (parsed.success && parsed.data.entries) {
          setEntries(parsed.data.entries);
        }
      }
    };

    window.addEventListener("upload-success", handleUploadSuccess);
    return () =>
      window.removeEventListener("upload-success", handleUploadSuccess);
  }, []);

  return <FileExplorer entries={entries} />;
}
