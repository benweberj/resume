import React from 'react'

import ParticleMesh from '../sketches/ParticleMesh'
import MechanicalKeyboard from '../sketches/MechanicalKeyboard'
import WordleSolver from '../sketches/WordleSolver'
import RainingCode from '../sketches/RainingCode'

const SketchRunner = props => {
    const { sketchId } = props
    
    if (sketchId==='particles') return <ParticleMesh />
    if (sketchId==='mech') return <MechanicalKeyboard />
    if (sketchId==='wordle') return <WordleSolver />
    if (sketchId==='matrix') return <RainingCode />

    return <div className='full flex center'>
        {sketchId}: not implemented
    </div>
}

export default SketchRunner