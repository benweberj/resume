import React, { useState, useEffect, useRef } from 'react'

import SocialMedia from './components/SocialMedia'
import Path from './components/Path'
import TwoFace from './components/TwoFace'
import MyName from './components/MyName'

const Landing = props => {
    const nameRef = useRef()
    const titleRef = useRef()
    // const [nameWidth, setNameWidth] = useState(0)
    // const [titleWidth, setTitleWidth] = useState(0)
    const { ready } = props

    // function toggleReady() {
    //     setReady(!ready)
    // }

    useEffect(() => {
        // console.log('shit')
        // const timer = setInverval(() => {
        //     setReady(!ready)
        // })
    })



    const { goto } = props

    // const nameWidth = nameRef.current ? nameRef.current.offsetWidth : 100
    // const titleWidth = titleRef.current ? titleRef.current.offsetWidth : 100

    // const nameStyles = ready ? {
    //     transform: `translateX(${0}px)`,
    // } : {
    //     transform: `translateX(${titleWidth/2}px)`,
    // }

    // THINK I MIGHT SCRAP THIS, ITS NOT SETTING THE RIGHT WIDTH EARLY ENOUGH

    // const titleStyles = ready ? {
    //     opacity: .5
    // } : {
    //     opacity: '0',
    //     transform: `translateX(${titleWidth/2}px)`,
    // }

    return (
        <section className='full-page landing-page flex col center'>
            
            {/* <h1>Main heading</h1>
            <h2>Main heading</h2>
            <h3>Main heading</h3>
            <p>Main heading</p> */}

            <TwoFace />
            <MyName ready={ready} />
            {/* <div className='flex my-name'>
                <h1 ref={nameRef} className='name' style={nameStyles}>Ben Weber</h1>
                <h1 ref={titleRef} className='title light hazy' style={titleStyles}>Web Developer</h1>
            </div> */}
         
            <SocialMedia />

            <div className='flex col center next-page' onClick={() => goto(1)}>
                {/* <h3 className='tcenter light'>Check out some stuff I've made</h3> */}
                <svg width='33' height='16' viewBox='0 0 33 16' fill='none'>
                    <Path on={ready} d='M2 2L16.5 14L31 2' weight={3}/>
                </svg>
            </div>
        </section>
    )
}

export default Landing

// <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M2 2L16.5 14L31 2" stroke="#EDE6D1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
