import { useState } from "react";
interface SidebarItem {
  label: string;
  href?: string;
  badge?: {
    text: string;
    variant?: "info" | "success" | "warning" | "danger";
  };
}

interface SidebarGroupProps {
  title: string;
  items: SidebarItem[];
  defaultOpen?: boolean;
}



const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  items,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  return (
    <div className="mt-2">
      {/* group header */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between
                   rounded-radius px-2 py-1.5 text-sm font-medium
                   text-on-surface hover:bg-primary/5
                   dark:text-on-surface-dark dark:hover:bg-primary-dark/10"
      >
        <span>{title}</span>

        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M6 6L14 10L6 14V6Z" />
        </svg>
      </button>

      {/* items */}
      {open && (
        <ul className="mt-1 space-y-1 border-l border-outline pl-3 dark:border-outline-dark">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href ?? "#"}
                className="flex items-center justify-between
                           rounded-radius px-2 py-1.5 text-sm
                           text-on-surface hover:bg-primary/5
                           dark:text-on-surface-dark dark:hover:bg-primary-dark/10"
              >
                <span>{item.label}</span>

                {item.badge && (
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded
                      bg-${item.badge.variant ?? "info"}/10
                      text-${item.badge.variant ?? "info"}
                    `}
                  >
                    {item.badge.text}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarGroup;

