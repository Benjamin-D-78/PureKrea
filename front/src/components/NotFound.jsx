import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
        <p>Page non trouvée. 😐</p>
        <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}
