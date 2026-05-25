import { formatBytes, formatDate } from "../../core/utils/formatter";
import { TargetEntries } from "../../domain/vo/target_entries";

type Props = {
  entries: TargetEntries;
};

export const FileExplorer = ({ entries }: Props) => {
  const isEmpty =
    entries.directories.length === 0 && entries.files.length === 0;

  return (
    <div class="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table class="w-full border-collapse text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-xs font-semibold uppercase text-slate-700 border-b border-slate-200">
          <tr>
            <th scope="col" class="px-4 py-3 w-16 text-center">
              Kind
            </th>
            <th scope="col" class="px-4 py-3">
              File Name
            </th>
            <th scope="col" class="px-4 py-3 w-28">
              Size
            </th>
            <th scope="col" class="px-4 py-3 w-40">
              Created At
            </th>
            <th scope="col" class="px-4 py-3 w-40">
              Last Modified At
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {entries.directories.map((dir) => (
            <tr class="hover:bg-slate-50/80 transition-colors duration-150 group cursor-pointer">
              <td class="px-4 py-3 text-center text-base">📁</td>
              <td class="px-4 py-3 font-medium text-blue-600 group-hover:text-blue-700 truncate max-w-xs md:max-w-md">
                {dir.name}
              </td>
              <td class="px-4 py-3 text-slate-400">--</td>
              <td class="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                {formatDate(dir.createdAt)}
              </td>
              <td class="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                {formatDate(dir.modifiedAt)}
              </td>
            </tr>
          ))}

          {entries.files.map((file) => (
            <tr class="hover:bg-slate-50/80 transition-colors duration-150 cursor-pointer">
              <td class="px-4 py-3 text-center text-base">📄</td>
              <td class="px-4 py-3 text-slate-900 truncate max-w-xs md:max-w-md">
                {file.name}
              </td>
              <td class="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">
                {formatBytes(file.size)}
              </td>
              <td class="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                {formatDate(file.createdAt)}
              </td>
              <td class="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                {formatDate(file.modifiedAt)}
              </td>
            </tr>
          ))}

          {isEmpty && (
            <tr>
              <td
                colSpan={5}
                class="px-4 py-12 text-center text-slate-400 bg-slate-50/30"
              >
                <div class="flex flex-col items-center justify-center space-y-1">
                  <span class="text-2xl">🫙</span>
                  <p class="text-sm font-medium">Empty Drive</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
