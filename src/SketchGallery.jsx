import React, { useState } from 'react'

import SketchPreview from './sketches/Preview'
import SketchRunner from './sketches/Runner'
import Daydreamer from './components/Daydreamer'

const sketches = [
  { implemented: true, id: 'particles', name: 'Particle Mesh', description: '...', },
  { implemented: false, id: 'orbit', name: 'Orbit', description: '...', },
  { implemented: false, id: 'mech', name: 'Mech', description: '...', },
  { implemented: false, id: 'matrix', name: 'Raining Code', description: '...', },
  { implemented: false, id: 'lightning', name: 'Lightning', description: '...', },
  { implemented: false, id: 'wordle', name: 'Wordle Solver', description: '...', },
  { implemented: false, id: 'snake', name: 'Snake', description: '...', },
  { implemented: false, id: 'avoid', name: 'Avoid', description: '...', },
  { implemented: false, id: 'fireworks', name: 'Fireworks', description: '...', },
  // { id: 'lightspeed', name: 'LightSpeed', description: '...', },
]

const SketchGallery = props => {
  const { ready } = props
  const [hovered, setHovered] = useState(null)
  // const [daydream, setDaydream] = useState(false)
  // const [currentSketch, setCurrentSketch] = useState({ id: 'particles' })
  const [currentSketch, setCurrentSketch] = useState(null)

  return (
    <div className='flex col center'>

      <h2 className='tcenter'>Animations & Games</h2>
      <p className='tcenter mlb'>Go on, mess around with em.</p>

      <div className='sketch-gallery'>

        <Daydreamer open={!!currentSketch} onClose={() => setCurrentSketch(null)}>
          <SketchRunner sketchId={currentSketch ? currentSketch.id : null} />
        </Daydreamer>

        {sketches.map(s => (
            <div
              className='glass contain pointer'
              style={{ gridArea: s.id }}
              onMouseOver={() => setHovered(s.id)}
              onMouseOut={() => setHovered(null)}
            >
              <div className='rel flex center full sketch-preview-container'>
                <div className={'sketch-preview flex full center pl'}>
                  <SketchPreview ready={ready} sketch={s.id} hovered={s.id === hovered} />
                </div>

                <div className='flex col center glass ps sketch-details'>
                  {s.implemented ? <>
                    <h4 className='tcenter'>{s.name}</h4>
                    <div className='flex wrap center sketch-buttons'>
                      <button className='code'>Code</button>
                      <button className='demo' onClick={() => setCurrentSketch(s)}>Demo</button>
                    </div>
                  </> : <>
                  <h4 className='tcenter'>Coming soon</h4>
                  <p className='tcenter xs'>Sit tight im workin on it</p>
                  </>}
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default SketchGallery






// import React, { useEffect, useState, useRef } from 'react'
// // import { ReactP5Wrapper } from 'react-p5-wrapper'


// import particleMesh, { initialOptions as initialParticleOptions } from '../sketches/particleMesh'

// import SketchOptions from './SketchOptions'

// const sketches = {
//   particles: {
//     name: 'Particle Mesh',
//     sketch: particleMesh,
//     id: 'particles',
//     description: 'My first complex P5 sketch. Nodes connect when close and attract to the cursor.' ,
//     options: initialParticleOptions
//   },
//   lightning: {
//     name: 'Lightning',
//     sketch: null,
//     id: 'lightning',
//     description: '...' ,
//     options: {}
//   },
//   katakana: {
//     name: 'Raining Katakana',
//     sketch: null,
//     id: 'katakana',
//     description: 'Recreation of the raining code animation from the Matrix' ,
//     options: {}
//   },
//   orbit: {
//     name: 'Orbit?',
//     sketch: null,
//     id: 'orbit',
//     description: '...' ,
//     options: {}
//   },
//   lightspeed: {
//     name: 'Light Speed',
//     sketch: null,
//     id: 'lightspeed',
//     description: 'Animation resembling the light-speed effect from Star Wars.',
//     options: {}
//   },
// }

// const SketchGallery = props => {
//   const [currentSketch, setSketch] = useState(sketches.particles)
//   const [loading, setLoading] = useState(false)

//   const { ready } = props

//   // later, you sould create a state array with all the current sketch settings so they dont reset when switching back
//   // and also have a button to reset all settings
//   const [options, setOptions] = useState(currentSketch.options)

//   // console.log(currentSketch ? currentSketch.options : 'as')

//   useEffect(() => {
//     setOptions(currentSketch.options)

//   }, [currentSketch])

//   function handleOptionsChange(name, val) {
//     const newOptions = JSON.parse(JSON.stringify(options))
//     newOptions[name] = val
//     setOptions(newOptions)
//   }

//   return (
//     <div className='full flex col rounded glass'>
//       <div className='flex wrap pm'>
//         {Object.keys(sketches).map(sketchId => {
//           const cur = currentSketch && (currentSketch.id === sketchId)
//           return (
//             <button
//               key={sketchId}
//               className={`glass mxs ${cur && 'selected'}`}
//               onClick={() => setSketch(sketches[sketchId])}
//             >
//               {sketches[sketchId].name}
//             </button>
//           )
//         })}
//       </div>

//         <div id='sketch-container' className='full flex center dark-bg rounded-bottom contain rel'>
//           {(currentSketch && currentSketch.sketch) ? (
//             <>
//               <ReactP5Wrapper options={options} sketch={currentSketch.sketch} />
//               <SketchOptions options={options} onChange={handleOptionsChange} />
//             </>
//           ) : <div className='full flex center'><p><b>{currentSketch.name}</b> sketch unavailabe :(</p></div>}
//         </div>






//       {/* scratching this for now -- the timing and delays and unpredictability were a bitch */}
//       {/* <LoadingSketch sketch={currentSketch.id} /> */}

//     </div>
//   )
// }

// export default SketchGallery
