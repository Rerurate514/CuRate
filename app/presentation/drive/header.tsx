import { FilePicker } from "../../islands/fpicker";
import { CreateFolderButton } from "./create_folder_button";

type Props = {
    path: string;
};

export default function DriveHeader({ path }: Props) {
    return (
        <div className="bg-white p-3 border-b border-gray-200 w-full">
            <div className="max-w-7xl mx-auto flex items-center gap-3 w-full [&>honox-island]:flex-1">
                <CreateFolderButton currentPath={path} />
                <FilePicker path={path} />
            </div>
        </div>
    );
}
