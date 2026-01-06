import clsx from "clsx";
import { memo } from "react";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const navs = [
  {
    label: `Api`,
    items: [
      {
        label: "Rest Countries",
        icon: <GiEarthAsiaOceania />,
        path: "/rest-countries",
      },
      {
        label: "Themealdb",
        icon: <IoFastFood />,
        path: "/themealdb",
      },
    ],
  },
];

const SidebarLeft = () => {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-3xs border-r border-r-border p-2 hidden lg:block">
      {navs.map((nav) => (
        <ul key={nav.label}>
          <li className="p-2 font-semibold">{nav.label}</li>
          {nav.items.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    `flex items-center gap-2 hover:bg-card p-2 rounded`,
                    isActive && `bg-card`
                  )
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      ))}
    </aside>
  );
};

export default memo(SidebarLeft);
