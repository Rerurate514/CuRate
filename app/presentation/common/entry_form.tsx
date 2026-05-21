type Props = {
    actionPath: string
    pageName: string
    buttonText: string
}

export const EntryForm = ({ actionPath, pageName, buttonText }: Props) => {
    return <div class="flex flex-col justify-center min-h-screen max-w-md mx-auto px-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">CuRate - {pageName}</h1>
        <form method="post" action={actionPath}>
            <div class="my-4">
                <label class="block mb-1 text-sm font-medium text-gray-700">Username</label>
                <input type="text" name="username" class="w-full border border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div class="my-4">
                <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" class="w-full border border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <button type="submit" class="bg-sky-500 rounded-lg w-full py-2 text-white font-semibold hover:bg-sky-600 transition-colors mt-2">
                {buttonText}
            </button>
        </form>
    </div>
}
