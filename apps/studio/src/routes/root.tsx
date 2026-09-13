import { Link, Outlet } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

const LOGO =
  "https://raw.githubusercontent.com/limonify/email-templates/main/.github/assets/logo.png";

const TABS = [
  { to: "/preview", label: "Templates" },
  { to: "/editor", label: "Editor" },
] as const;

export function RootLayout() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-chrome-700 bg-chrome-900 px-4">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="" className="h-6 w-6 rounded-md" />
          <span className="text-sm font-semibold tracking-tight">
            Limonify Email Studio
          </span>
          <nav className="ml-4 flex items-center gap-1 rounded-md border border-chrome-600 bg-chrome-800 p-0.5">
            {TABS.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                className="rounded px-3 py-1 text-[11px] font-medium text-chrome-300 transition-colors hover:text-chrome-50"
                activeProps={{ className: cn("bg-chrome-600 text-white") }}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
        <a
          href="https://github.com/limonify/email-templates"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-medium text-chrome-400 hover:text-chrome-50"
        >
          github.com/limonify
        </a>
      </header>
      <main className="min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
