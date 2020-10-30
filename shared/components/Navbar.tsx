import React from 'react'
import { links } from "../Routes"
import { NavLink } from "react-router-dom"

const Navbar: React.FC = () => {
  return (
    <div className="nav" >
      <div className="nav__menu" >
        {links.map(link => {
          return <NavLink key={link.to} {...link}>{link.title}</NavLink>
        })}
      </div>
    </div>
  )
}

export default Navbar
