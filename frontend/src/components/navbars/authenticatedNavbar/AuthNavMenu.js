import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function AuthNavMenu({ menus, endpoints, liClass, linkClass }) {
  return (
    <>
      {menus.map(menu => (
        <li
          key={`menuItem_${menu}`}
          className={liClass}>
          <Link
            className={linkClass}
            to={endpoints[menu]}
          >{menu}</Link>
        </li>
      ))}
    </>
  )
}