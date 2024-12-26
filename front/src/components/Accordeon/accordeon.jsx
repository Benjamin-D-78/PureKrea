import React, { useState } from 'react'
import accordeon from "./accordeon.module.css"




export default function Accordeon({ titre, corps }) {

    const [ouvrir, setOuvrir] = useState(false)

    return (
        <div className={accordeon.contientAccordeon}>
            <div className={accordeon.accordeon}>
                <div onClick={() => setOuvrir(!ouvrir)} className={accordeon.teteAccordeon}>
                    <p className={accordeon.nomsChapitres}>{titre}</p>
                    <div className={accordeon.plusMoins}>{ouvrir ? "-" : "+"}</div>
                </div>
                {ouvrir && (
                    <div className={accordeon.corpsAccordeon}>
                        <p className={accordeon.pAccordeon}>{corps}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
