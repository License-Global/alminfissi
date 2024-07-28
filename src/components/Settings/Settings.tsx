import React from 'react'
import Dipendenti from './Dipendenti/Dipendenti'

type Props = {}

const Settings = (props: Props) => {

    return (
        <div>
            <div className="collapse collapse-arrow bg-slate-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Gestione dipendenti</div>
                <div className="collapse-content">
                    <Dipendenti />
                </div>
            </div>
            {/* <div className="collapse collapse-arrow bg-slate-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                <div className="collapse-content">
                    <p>hello</p>
                </div>
            </div> */}
        </div>
    )
}

export default Settings