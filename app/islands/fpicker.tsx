import { useState } from "hono/jsx";
import { CreateFolderButton } from "../presentation/drive/create_folder_button";

type Props = {
  path: string;
};

export default function FilePicker({ path }: Props) {
  const [status, setStatus] = useState<string>("");
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("アップロード中...");

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(path, {
        method: "post",
        body: formData,
      });

      if (response.ok) {
        setStatus("アップロード成功！");
        setSelectedFileNames([]);
        form.reset();

        const event = new CustomEvent("reload-explorer");
        window.dispatchEvent(event);
      } else {
        setStatus("アップロード失敗しました。");
      }
    } catch (error) {
      setStatus("エラーが発生しました。");
    }
  };

  const handleFileChange = (e: any) => {
    const input = e.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      setSelectedFileNames(Array.from(files).map((f) => f.name));
    } else {
      setSelectedFileNames([]);
    }
  };

  return (
    <form
      action={path}
      method="post"
      enctype="multipart/form-data"
      onSubmit={handleSubmit}
      className="bg-white p-3 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CreateFolderButton />

          <label
            htmlFor="file-input"
            className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 rounded-lg border border-gray-300 cursor-pointer transition-colors shadow-sm"
          >
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            ファイルを選択...
          </label>

          <input
            id="file-input"
            name="file"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedFileNames.length > 0 ? (
            <span className="text-xs text-gray-600 font-mono truncate max-w-sm">
              📄 {selectedFileNames.join(", ")}
            </span>
          ) : (
            <span className="text-xs text-gray-400">
              ファイルが選択されていません
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {status && (
            <span className="text-xs font-medium text-gray-500 animate-pulse">
              {status}
            </span>
          )}
          <button
            type="submit"
            className={`px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              selectedFileNames.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={selectedFileNames.length === 0}
          >
            送信
          </button>
        </div>
      </div>
    </form>
  );
}
