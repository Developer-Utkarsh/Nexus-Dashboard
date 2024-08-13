import { Users, LayoutGrid, LucideIcon, Videotape, Video, ShieldCheckIcon, MailIcon, HomeIcon,BarChartIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Home",
          active: pathname === "/",
          icon: HomeIcon,
          submenus: []
        },
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/contacts",
          label: "Contacts",
          active: pathname.includes("/contacts"),
          icon: MailIcon,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Meetings",
      menus: [
        {
          href: "/meetings",
          label: "Public Meetings",
          active: pathname === "/meetings",
          icon: Video,
          submenus: []
        },
        {
          href: "/private/meetings",
          label: "Private Meetings",
          active: pathname === "/private/meetings",
          icon: Videotape,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/admins",
          label: "Admins",
          active: pathname.includes("/admins"),
          icon: ShieldCheckIcon,
          submenus: []
        },
        {
          href: "/analytics",
          label: "Analtyics",
          active: pathname.includes("/analytics"),
          icon: BarChartIcon,
          submenus: []
        }
      ]
    }
  ];
}