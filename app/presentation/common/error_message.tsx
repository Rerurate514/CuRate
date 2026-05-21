type Props = {
    message: string
    backTo: string
    e?: Error
    title?: string
}

export const ErrorMessage = ({ message, backTo, e, title }: Props) => {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return <div class="flex flex-col justify-center min-h-screen max-w-md mx-auto px-6 text-center">
        <div class="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 shadow-sm">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            </div>
            <h2 class="text-lg font-bold text-red-800 mb-1">{title ?? 'Error'}</h2>
            <p class="text-sm text-red-600">{message}</p>
            <p class="text-sm text-red-600">{errorMessage}</p>
        </div>
        <a href={backTo} class="inline-block bg-gray-800 rounded-lg w-full py-2.5 text-white font-semibold hover:bg-gray-700 transition-colors shadow-sm">
            return to login page
        </a>
    </div>
}
