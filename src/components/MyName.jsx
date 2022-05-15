import React, { useEffect, useState, useRef } from 'react'

function MyName(props) {
    // initialReady is the global start beacon, but the Web Dev title is going to 
    // appear slightly delayed. initialReady=for name, ready=for title
    const { ready:initialReady } = props
    const [ready, setReady] = useState(false)

    const hs = 5 // half of the spacing between name and title (10px)
    

    const nameRef = useRef()
    const titleRef = useRef()

    const slideDuration = 600

    const hiddenStyles = {
        transform: 'perspective(200px) rotateX(-90deg) translateY(50px)',
        opacity: '0',
    }

    const justNameStyles = {
        transform: 'perspective(300px)',
    }

    const readyStyles = titleRef.current ? {
        transform: `perspective(300px) translateX(-${titleRef.current.clientWidth/2 + hs}px)`
    } : { transform: `perspective(300px)` }

    const styles = !initialReady ? hiddenStyles : !ready ? justNameStyles : readyStyles


    useEffect(() => {
        if (initialReady && !ready) { // time to start title animation
            setTimeout(phase2, 1*1000)
        }
    })

    function phase2() {
        setReady(true)

        setTimeout(() => {
            const n = nameRef.current
            const t = titleRef.current
            const diff = n.clientHeight - t.clientHeight - 2
            t.style.opacity = .5
            t.style.position = 'absolute'
            t.style.left = `${n.getBoundingClientRect().right + 10}px`
            t.style.top = `${n.getBoundingClientRect().top + diff}px`
        }, slideDuration)
        
        
    }

    return (
        <>
            <h1 ref={nameRef} style={{
                ...styles,
                transition: `transform ${slideDuration}ms ease`
            }}>Ben Weber</h1>
            <h2 ref={titleRef} className='light reference'>Web Developer</h2>
        </>

    )
}


export default MyName