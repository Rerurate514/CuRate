export const CreateFolderButton = () => {
  return (
    <div className="inline-block text-left">
      <a
        href="#create-folder"
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-300 text-sm flex items-center gap-1 transition"
      >
        <span>📁</span> 新規フォルダ
      </a>

      <div
        id="create-folder"
        className="fixed inset-0 z-50 hidden target:flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">新規フォルダ作成</h3>
          
          <form method="post" action="/api/drive/create-dir">
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
  )
}
