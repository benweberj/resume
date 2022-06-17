import React from 'react'

import ParticleMesh from '../sketches/ParticleMesh'
import MechanicalKeyboard from '../sketches/MechanicalKeyboard'
import WordleSolver from '../sketches/WordleSolver'

const SketchRunner = props => {
    const { sketchId } = props
    
    if (sketchId==='particles') return <ParticleMesh />
    if (sketchId==='mech') return <MechanicalKeyboard />
    if (sketchId==='wordle') return <WordleSolver />

    return <div className='full flex center'>
        {sketchId}: not implemented
    </div>
}

export default SketchRunner