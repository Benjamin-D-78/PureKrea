import React from 'react'
import calltoaction from "./prenezRendezVous.module.css"

const PrenezRendezVous = () => {
    return (
        <div className={calltoaction.contientCallToAction}>
            <p className={calltoaction.pCallToAction}>Laissez-vous tenter par le sur-mesure...</p>
            <div className={calltoaction.divBtnCallToAction}>
                <button className={calltoaction.btnCallToAction}>Prenez rendez-vous</button>
            </div>
        </div>
    )
}

export default PrenezRendezVous