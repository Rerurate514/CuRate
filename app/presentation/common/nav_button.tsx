type Props = {
    href: string
    label: string
}

export const NavButton = ({ href, label }: Props) => (
    <a href={href} class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        {label}
    </a>
)
