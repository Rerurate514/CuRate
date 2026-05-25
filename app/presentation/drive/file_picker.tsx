type Props = {
    path: string
}

export default function FilePicker({ path }: Props) {
    return (
        <form
            action={path}
            method='post'
            enctype="multipart/form-data"
        >
            <label
                htmlFor='file-input'
            >ファイルを選択</label>
            <input
                id='file-input'
                name='file'
                type='file'
                multiple
            />
            <button type="submit">送信</button>
        </form>
    );
}
