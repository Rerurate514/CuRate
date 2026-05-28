import { createPathList } from "../../core/utils/path_list";

type Props = {
    path: string;
};

export const BreadCrumb = ({ path }: Props) => {
    const pathList = createPathList(path);

    return (
        <nav aria-label="Breadcrumb">
            <ol class="flex flex-wrap items-center gap-1 text-sm font-medium">
                <li>
                    <a
                        href="/dashboard"
                        class="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors duration-150 group"
                    >
                        <svg
                            class="w-3.5 h-3.5 shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <span>HOME</span>
                    </a>
                </li>

                {pathList.map((segment, index) => {
                    const label = segment.split("/").at(-1) || segment;
                    const isLast = index === pathList.length - 1;

                    return (
                        <li key={segment} class="flex items-center gap-1">
                            <svg
                                class="w-3.5 h-3.5 shrink-0 text-slate-300"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clip-rule="evenodd"
                                />
                            </svg>

                            {isLast ? (
                                <span
                                    aria-current="page"
                                    class="max-w-[120px] sm:max-w-[200px] truncate px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                                >
                                    {label}
                                </span>
                            ) : (
                                <a
                                    href={segment}
                                    class="max-w-[120px] sm:max-w-[200px] truncate text-slate-500 hover:text-slate-900 hover:underline underline-offset-2 transition-colors duration-150"
                                >
                                    {label}
                                </a>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
