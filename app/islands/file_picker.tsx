import { useState } from "hono/jsx";

type Props = {
  path: string;
};

export default function FilePicker({ path }: Props) {
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setStatus("アップロード中...");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(path, {
        method: "post",
        body: formData,
      });

      if (response.ok) {
        setStatus("アップロード成功！");
      } else {
        setStatus("アップロードに失敗しました。");
      }
    } catch (error) {
      setStatus("エラーが発生しました。");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <form
        action={path}
        method="post"
        enctype="multipart/form-data"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor="file-input"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-3 text-gray-400"
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
              <p className="mb-2 text-sm text-gray-500 font-semibold">
                クリックしてファイルを選択
              </p>
              <p className="text-xs text-gray-400">またはドラッグ＆ドロップ</p>
            </div>
            <input
              id="file-input"
              name="file"
              type="file"
              multiple
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          送信する
        </button>
      </form>

      {status && (
        <p className="mt-4 text-sm font-medium text-center text-gray-600 animate-pulse">
          {status}
        </p>
      )}
    </div>
  );
}
