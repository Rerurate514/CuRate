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
    <div>
      <form 
        action={path}
        method="post"
        enctype="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label htmlFor="file-input">ファイルを選択</label>
        <input id="file-input" name="file" type="file" multiple />
        <button type="submit">送信</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}
