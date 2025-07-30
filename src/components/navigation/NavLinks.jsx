"use client"
import { Link } from "react-router-dom"
const linkStyles = "hover:text-red focus:text-red focus" // Your original linkStyles constant

const NavLinks = ({ onToggleNav, styles }) => {
  return (
    <ul className={styles}>
      {" "}
      {/* Ensure the 'styles' prop is applied here */}
      <li>
        <Link to="/" className={linkStyles} onClick={onToggleNav}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" className={linkStyles} onClick={onToggleNav}>
          About
        </Link>
      </li>
     <li>
        <Link to="/classes" className={linkStyles} onClick={onToggleNav}>
          Classes
        </Link>
      </li>
      <li>
        <Link to="/tracker" className={linkStyles} onClick={onToggleNav}>
          Nutrition Tracker
        </Link>
      </li>
      <li>
        <Link to="/contact" className={linkStyles} onClick={onToggleNav}>
          Contact
        </Link>
      </li>
    </ul>
  )
}

export default NavLinks
