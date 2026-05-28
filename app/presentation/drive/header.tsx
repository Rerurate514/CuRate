import { FilePicker } from "../../islands/fpicker";
import { BreadCrumb } from "./breadcrumb";
import { CreateFolderButton } from "./create_folder_button";

type Props = {
  path: string;
};

export default function DriveHeader({ path }: Props) {
  return (
    <div>
      <div class="mr-4 ml-4 mt-2">
        <BreadCrumb path={path}/>
      </div>
      <div className="bg-white p-3 border-b border-gray-200 w-full">
        <div className="mx-auto flex items-center gap-3 w-full [&>honox-island]:flex-1">
          <CreateFolderButton currentPath={path} />
          <FilePicker path={path} />
        </div>
      </div>
    </div>
  );
}
