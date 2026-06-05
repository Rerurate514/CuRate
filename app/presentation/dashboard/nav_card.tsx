import type { JSX } from "hono/jsx";

type Props = {
  href: string;
  label: string;
  description: string;
  icon: JSX.IntrinsicElements["a"];
} & JSX.IntrinsicElements["a"];

export const NavCard = ({ href, label, description, icon }: Props) => (
  <a
    href={href}
    class="block bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-300 transition-colors"
  >
    <div class="flex items-center justify-between mb-3">
      <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
        {icon}
      </div>
      <i class="ti ti-arrow-right text-gray-300"></i>
    </div>
    <p class="font-medium text-gray-800 mb-1">{label}</p>
    <p class="text-sm text-gray-500">{description}</p>
  </a>
);
