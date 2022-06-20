import React, { useEffect, useState } from 'react'

import SketchPreview from './sketches/Preview'
import SketchRunner from './sketches/Runner'
import Daydreamer from './components/Daydreamer'
import Path from './components/Path'

const sketches = [
  { implemented: true, id: 'particles', name: 'Particle Mesh', description: '...', github: 'https://github.com/benweberj/particle_mesh'},
  { implemented: false, id: 'orbit', name: 'Orbit', description: '...', github: ''},
  { implemented: true, id: 'mech', name: 'Mech', description: '...', github: ''},
  { implemented: true, id: 'matrix', name: 'Raining Code', description: '...', github: 'https://github.com/benweberj/matrix'},
  { implemented: false, id: 'lightning', name: 'Lightning', description: '...', github: 'https://github.com/benweberj/lightning'},
  { implemented: true, id: 'wordle', name: 'Wordle Solver', description: '...', github: ''},
  { implemented: false, id: 'snake', name: 'Snake', description: '...', github: ''},
  { implemented: false, id: 'avoid', name: 'Avoid', description: '...', github: ''},
  { implemented: false, id: 'fireworks', name: 'Fireworks', description: '...', github: ''},
  // { id: 'lightspeed', name: 'LightSpeed', description: '...', },
]

const SketchGallery = props => {
  const { ready, setInFocus } = props
  const [hovered, setHovered] = useState(null)
  
  // const [currentSketch, setCurrentSketch] = useState({ id: 'matrix' })
  const [currentSketch, setCurrentSketch] = useState(null)

  useEffect(() => {
    setInFocus(!!currentSketch)
  }, [currentSketch])

  return (
    <div className=''>

      <h2 className='tcenter trans' style={{ transform: !ready && 'scale(0)', filter: !ready && 'blur(10px)' }}>Animations & Games</h2>
      <p className='tcenter mlb trans' style={{ transform: !ready && 'scale(0)', filter: !ready && 'blur(10px)', transitionDelay: '.5s' }}>Go on, mess around with em.</p>

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
                  {s.implemented ? (
                    <div className='top-left ps'>
                      <svg width="12" height="11" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path on={ready} d="M21.5 2.5L9.5 20L2.5 13.5" stroke="#97cfb3" weight={4} />
                      </svg>
                    </div>
                  ) : (
                    <div className='top-left ps'>
                      <svg width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* <circle cx="11.5" cy="11.5" r="10.5" stroke="black" stroke-width="2"/> */}
                        <Path on={ready} d='M1,11.5a10.5,10.5 0 1,0 21,0a10.5,10.5 0 1,0 -21,0' weight={2} />
                        <Path on={ready} d="M11 5V13L17 15.5" weight={2} />
                      </svg>
                    </div>
                  )}
                  <SketchPreview ready={ready} sketch={s.id} hovered={s.id === hovered} />
                </div>

                <div className='flex col center ps sketch-details'>
                  {s.implemented ? <>
                    <h4 className='tcenter'>{s.name}</h4>
                    <div className='flex wrap center sketch-buttons'>
                      <button className={`code ${!s.github && 'disabled'}`} onClick={() => window.open(s.github, '_blank')}>Code</button>
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
