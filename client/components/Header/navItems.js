const navItems = [
  {
    label: "📻️Market",
    href: "/items",
  },
  {
    label: "🎤Create",
    children: [
      {
        label: "Create Music",
        subLabel: "Share your musical creation with the world",
        href: "/upload",
      },

      {
        label: "Suggest Feature",
        subLabel: "Suggest features you'd like to see in Kordz",
        href: "https://github.com/0xFabray/kordz/issues",
      },
    ],
  },
  {
    label: "🎫Events",
    children: [
      {
        label: "Artist Events",
        subLabel: "Artist events on Kordz",
        href: "#",
      },
      {
        label: "Rising Stars Showcase",
        subLabel: "A showcase for rising stars on Kordz",
        href: "#",
      },
    ],
  },
  {
    label: "📚Resources",
    children: [
      {
        label: "Kordzboard",
        subLabel: "Top songs owned on Kordz",
        href: "#",
      },
      {
        label: "Developer Docs",
        subLabel: "Documentation to Kordz' API",
        href: "#",
      },
    ],
  },
  {
    label: "👤Account",
    href: "#",
  },
];

export default navItems;
