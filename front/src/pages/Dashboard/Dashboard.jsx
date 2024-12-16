import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'

export default function Dashboard() {
  return (
    <div>
        <NavBar/>
        <h1>Dashboard</h1>
        <nav>
            <NavLink to="/dashboard/items">Items</NavLink>
            <NavLink to="/dashboard/utilisateurs">Utilisateurs</NavLink>
        </nav>
        <Outlet/> {/* Mes composants ressortent ici. */}
    </div>
    
  )
}
