import React from 'react'
import Tilt from 'react-parallax-tilt'

const Parallax = props => {
  const { shine } = props

  const shineProps = shine ? {
    glareEnable: true,
    glareMaxOpacity: .9,
    glareColor: '#ffffff',
    glarePosition: 'left',
    glareBorderRadius: '999px',
  } : {}

  return (
    <Tilt
      trackOnWindow={props.fs || false}
      className={props.className + ' ' + 'parallax-effect'}
      transitionSpeed={1000}
      tiltReverse={true}
      perspective={props.perspective || 500}
      style={{ ...props.style }}
      {...shineProps}
    >
      {props.children}
    </Tilt>
  )
}

export default Parallax