interface SidebarLinkProps {
  label: string;
  href?: string;
  external?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  label,
  href = "#",
  external = false,
}) => {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="rounded-radius px-2 py-1.5 text-sm font-medium
                 text-on-surface hover:bg-primary/5
                 dark:text-on-surface-dark dark:hover:bg-primary-dark/10"
    >
      {label}
    </a>
  );
};

export default SidebarLink;
