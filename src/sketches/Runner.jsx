import React from 'react'

import ParticleMesh from '../sketches/ParticleMesh'

const SketchRunner = props => {
    const { sketchId } = props
    
    if (sketchId=='particles') return <ParticleMesh />

    return <div className='full flex center'>
        {sketchId}: not implemented
    </div>
}

export default SketchRunner