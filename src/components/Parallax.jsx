import React from 'react'
import Tilt from 'react-parallax-tilt'

const Parallax = props => {
  return (
    <Tilt
      trackOnWindow={props.fs || false}
      className={props.className + ' ' + 'parallax-effect'}
      transitionSpeed={1000}
      // style={{ border: '1px solid red' }}
      tiltReverse={true}
      perspective={props.perspective || 500}
      style={{ ...props.style,  }}
      // glareEnable={true} glareMaxOpacity={0.5} glareColor="#ffffff" glarePosition="bottom"
      // scale={1.05}

    >
      {props.children}
    </Tilt>
  )
}

export default Parallax