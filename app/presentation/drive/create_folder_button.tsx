type Props = {
  currentPath: string;
};

export const CreateFolderButton = ({ currentPath }: Props) => {
  console.log(currentPath);
  return (
    <div className="inline-block text-left">
      <a
        href="#create-folder"
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
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        新規フォルダ
      </a>

      <div
        id="create-folder"
        className="fixed inset-0 z-50 hidden target:flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">新規フォルダ作成</h3>
          
          <form method="post" action="/api/drive/create-dir">
            <input type="hidden" name="currentPath" value={currentPath} />
            
            <input
              type="text"
              name="folderName"
              placeholder="フォルダ名を入力"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <div className="flex justify-end gap-2">
              <a
                href="#"
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition"
              >
                キャンセル
              </a>
              <button
                type="submit"
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                作成
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
