import React, { useState } from 'react'
import styled from 'styled-components'


const Dot = styled.div(props => {
  const dx = 2*props.dim - props.dim/2
  const dur = .5
  return ({
    '@keyframes night': {
      from: {
        transform: `translateX(0px)`
      },
      to: {
        transform: `translateX(${dx}px)`
      },
    },
  
    '@keyframes day': {
      from: {
        transform: `translateX(${dx}px)`
      },
      to: {
        transform: `translateX(0px)`
      },
    },
  
    // transform: `translateX(${props.theme.mode ==== 'dark' ? (2*props.dim - props.dim/2) : 0}px)`,
    background: props.theme.base,
    borderRadius: 999,
    width: props.dim,
    height: props.dim,
    animation: `${props.theme.mode === 'dark' ? 'night' : 'day'} ${dur}s ease-out`,
    animationFillMode: 'forwards'
  })
})

const BoolToggle = props => {
  const [hov, setHov] = useState(false)
  const { toggle, on=false } = props

  const dim = 15

  return (
    <div onClick={toggle} className={`bool-toggle ${on && 'on'}`} {...props}>
        <div></div>
    </div>
  )
    // <div className='flex center ms dark-bg' {...props} onMouseOver={() => setHov(true)} onMouseOut={() => setHov(false)}>
    //   <p className={`${hov && 'hazy'}`}>ON</p>

    //   <div className={'msx pxs circle dark-bg'} style={{ width: dim, height: dim }} onClick={toggle}>
    //     <Dot dim={dim} />
    //   </div>

    //   <p className={`${hov && 'hazy'}`}>OFF</p>
    // </div>
//   )

  // return <Tooltip bottom msg={`Switch to ${theme.mode ==== 'dark' ? 'light' : 'dark'} mode`}><Toggler onClick={handleClick} used={used} {...props} /></Tooltip>
}

export default BoolToggle