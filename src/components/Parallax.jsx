import React from 'react'
import Tilt from 'react-parallax-tilt'

const Parallax = props => {
  return (
    <Tilt
      trackOnWindow={false}
      className='parallax-effect'
      transitionSpeed={1000}
      // style={{ border: '1px solid red' }}
      tiltReverse={true}
      perspective={500}
      // glareEnable={true} glareMaxOpacity={0.5} glareColor="#ffffff" glarePosition="bottom"
      // scale={1.05}
      
      {...props}
    >
      {props.children}
    </Tilt>
  )
}

export default Parallax