import z from "zod";
import { DriveEntriesSchema } from "../../domain/schemas/drive_entries.schema";
import FileExplorerWrapper from "../../islands/fileExplorerWrapper";
import DriveHeader from "./header";

type Entries = NonNullable<z.infer<typeof DriveEntriesSchema>["entries"]>;

type Props = {
    currentPath: string;
    initialEntries: Entries
}

export const DrivePage = ({ currentPath, initialEntries }: Props) => {
    return (
        <div>
            <DriveHeader path={currentPath} />
            <FileExplorerWrapper initialEntries={initialEntries} currentPath={currentPath}/>
        </div>
    );
}
