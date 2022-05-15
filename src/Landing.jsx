import React, { useState, useEffect, useRef } from 'react'

import SocialMedia from './components/SocialMedia'
import Path from './components/Path'
import TwoFace from './components/TwoFace'
import MyName from './components/MyName'

const Landing = props => {
    const nameRef = useRef()
    const titleRef = useRef()
    
    const { ready, goto } = props

    return (
        <section className='full-page landing-page flex col center'>
            <TwoFace ready={ready} className='psb' />
            <MyName ready={ready} />
            <SocialMedia />

            <div className='flex col center next-page' onClick={() => goto(1)}>
                <svg width='33' height='16' viewBox='0 0 33 16' fill='none'>
                    <Path on={ready} d='M2 2L16.5 14L31 2' weight={3}/>
                </svg>
            </div>
        </section>
    )
}

export default Landing
