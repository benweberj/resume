import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Path from '../components/Path'

const SketchPreview = props => {
    const { sketch, ready, hovered } = props
    const is = .2
    if (sketch === 'particles') {
        return <svg width={393*is} height={429*is} viewBox='0 0 395 429' fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path on={ready && !hovered} styles={{ transitionDelay: '0s' }} d="M357 353C357 392.243 325.405 424 286.5 424C247.595 424 216 392.243 216 353C216 313.757 247.595 282 286.5 282C325.405 282 357 313.757 357 353Z" weight={15}/>
            <Path on={ready && !hovered} styles={{ transitionDelay: '.2s' }} d="M142 176.5C142 195.614 126.718 211 108 211C89.2822 211 74 195.614 74 176.5C74 157.386 89.2822 142 108 142C126.718 142 142 157.386 142 176.5Z" weight={15}/>
            <Path on={ready && !hovered} styles={{ transitionDelay: '.4s' }} d="M5,337.5a55.5,55.5 0 1,0 111,0a55.5,55.5 0 1,0 -111,0" weight={15} fill='none'/>
            <Path on={ready && !hovered} styles={{ transitionDelay: '.6s' }} d="M388 55.5C388 83.3482 365.209 106 337 106C308.791 106 286 83.3482 286 55.5C286 27.6518 308.791 5 337 5C365.209 5 388 27.6518 388 55.5Z" weight={15}/>
            <Path on={ready && !hovered} styles={{ transitionDelay: '.7s' }} d="M299 280L329 110" weight={7} />
            <Path on={ready && !hovered} styles={{ transitionDelay: '.8s' }} d="M119 343L213 350" weight={7} />
            <Path on={ready && !hovered} styles={{ transitionDelay: '.9s' }} d="M78 281L98 214" weight={7} />
            <Path on={ready && !hovered} styles={{ transitionDelay: '1s' }} d="M108 309L304 97" weight={7} />
            <Path on={ready && !hovered} styles={{ transitionDelay: '1.1s' }} d="M135 203L232 302" weight={7} />
        </svg>
    }



    // onhover: icon scales down to 0, info panel slides up, or unblurs into focus

    if (sketch === 'mech') {
        return <Mech ready={ready && !hovered} />
    }

    if (sketch === 'lightning') {
        return <svg width={427*is*1.2} height={321*is*1.2} viewBox="0 0 427 321" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path on={ready && !hovered} styles={{ transitionDelay: '0s' }} weight={3} d="M276 0.5L275.5 23.5L253 51.5L257 66L223 77L221 91.5L192.5 106L175.5 97.5L168 108L149.5 103L126 123L128.5 138L114.5 144L101 171L89.5 179.5L79.5 177.5L75 194.5L94.5 211.5L100 222L84.5 232L81.5 241.5L71 245" />
            <Path on={ready && !hovered} styles={{ transitionDelay: '.1s' }} weight={8} d="M276 0.5L294.5 38L262 96.5L268.5 124L234 147.5L230 177.5L218.5 191L234 201.5L243.5 240.5L268.5 255L262 320" />
            <Path on={ready && !hovered} styles={{ transitionDelay: '.2s' }} weight={5} d="M276 0.5L294.5 38L270 82L273.5 102.5L302 128L313 131L319.5 140L329 145L324.5 157L344 177H356L357 185L389.5 195L398.5 211L397 220.5L405 231" />
            <Path on={ready && !hovered} styles={{ transitionDelay: '.4s' }} weight={2} d="M276 0.5L275.5 23.5L253 51.5L257 66L223 77L221 91.5L192.5 106L175.5 97.5L168 108L149.5 103L134 88L110.5 79L98.5 85L73 77L66 95.5" />
            <Path on={ready && !hovered} styles={{ transitionDelay: '.5s' }} weight={2} d="M276 0.5L294.5 38L262 96.5L268.5 124L234 147.5L230 177.5L218.5 191L234 201.5L257.5 232.5L282 243.5L294.5 265L289.5 279.5L298 290" />
            <Path on={ready && !hovered} styles={{ transitionDelay: '.7s' }} weight={2} d="M276 0.5L275.5 23.5L253 51.5L257 66L223 77L221 91.5L192.5 106L175.5 97.5L168 108L149.5 103L126 123L128.5 138L114.5 144L101 171L89.5 179.5L79.5 177.5L75 194.5L94.5 211.5L100 222L103 231L95.5 243L100 250L95.5 252L99 271L111.5 280" />
            <Path on={ready && !hovered} styles={{ transitionDelay: '.8s' }} weight={2} d="M276 0.5L294.5 38L280 64L284.5 73.5H296L319 97L317.5 101H327.5L328.5 110.5" />
            <Path on={ready && !hovered} styles={{ transitionDelay: '.9s' }} weight={2} d="M276 0.5L294.5 38L280 64L284.5 73.5H296L319 97L313.5 110L320 123" />
        </svg>
    }

    if (sketch === 'snake') {

        return <svg width={451*is*1} height={449*is*1} viewBox="0 0 451 449" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path round={false} time={2} on={ready && !hovered} d="M39 39H66V11H11V64H66V90H11V117H66V144.5H11V170H66V196.5H11V222.5H66V248.5H11V275.5H92.5V304H11V332H119.5V304H226.5V414H39V383.5H199.5V332H147V355.5H11V437.5H439.5V64H360V39H439.5V11H92.5V248.5H119.5V275.5H253V414H411.5V90H388V383.5H360V90H333V383.5H306.5V64H333V39H278.5V64H253V39H119.5V64H226.5V222.5H174.5V196.5H199.5V170H147V144.5H199.5V90H174.5V117H147V90H119.5V196.5V222.5H147V248.5H253V90H278.5V304" weight={19} />
            <Path time={2} rect on={ready && !hovered} x="269" y="338" width="21" height="21" fill="#DE7777"/>
        </svg>

    }

    if (sketch === 'orbit') {
        return (
            <div className={`orbit-ring flex center ${(!ready || hovered) && 'off'}`}>
                <div className='orbit-planet' />
                <div className='orbit-object' />
            </div>
        )
    }

    if (sketch === 'wordle') {
        return <Wordle hovered={hovered} ready={ready} />
    }

    if (sketch === 'avoid') {
        return (
            <div className={`avoid ${(!ready || hovered) && 'off'}`}>
                <div className='player' />
                <div className='enemy enemy-1' />
                <div className='enemy enemy-2' />
                <div className='enemy enemy-3' />
            </div>
        )
    }

    if (sketch === 'matrix') {
        return <svg width={102*is*2.6} height={128*is*2.6} viewBox="0 0 94 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path on={ready && !hovered} d="M0.5 5.5H85.5C82.5 11.8333 72.9 27.2 58.5 38" weight={10} />
            <Path on={ready && !hovered} delay={'.1s'} d="M40.5 21.5C42.3333 37.6667 39.2 72.6 12 83" weight={10} />
            <Path on={ready && !hovered} delay={'.3s'} d="M48 59H88C89 71.6667 87.4 96.2 73 93" weight={6} />
            <Path on={ready && !hovered} delay={'.4s'} d="M67 46C67.3333 57.1667 64.1 82.2 48.5 93" weight={6} />
            <Path on={ready && !hovered} delay={'.6s'} d="M8.5 100.5H16.5M42.5 100.5H16.5M16.5 100.5V116" weight={4} />
            <Path on={ready && !hovered} delay={'.7s'} d="M32 92V128" weight={4} />
            <Path on={ready && !hovered} delay={'.8s'} d="M44 116.5H7" weight={4} />
            <Path on={ready && !hovered} delay={'1s'} d="M55.5 120.5L59.5 119.959M74 118L59.5 119.959M59.5 119.959L65.5 102" weight={2} />
            <Path on={ready && !hovered} delay={'1.1s'} d="M70.5 111.5L74 118L76 122.5" weight={2} />
        </svg>
    }

    if (sketch === 'fireworks') {
        return (
            <div className={`fireworks-outer-ring ${(!ready || hovered) && 'off'}`}>
                <div>
                    <div>
                        <div />
                    </div>
                </div>
            </div>
        )
    }

    return <div>{sketch} not implemented</div>
}


// const glyphs = [ 'ア', 'ィ', 'イ', 'ゥ', 'ウ', 'ェ', 'エ', 'ォ', 'オ', 'カ', 'ガ', 'キ', 'ギ', 'ク', 'グ', 'ケ', 'ゲ', 'コ', 'ゴ', 'サ', 'ザ', 'シ', 'ジ', 'ス', 'ズ', 'セ', 'ゼ', 'ソ', 'ゾ', 'タ', 'ダ', 'チ', 'ヂ', 'ッ', 'ツ', 'ヅ', 'テ', 'デ', 'ト', 'ド', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'バ', 'パ', 'ヒ', 'ビ', 'ピ', 'フ', 'ブ', 'プ', 'ヘ', 'ベ', 'ペ', 'ホ', 'ボ', 'ポ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ャ', 'ヤ', 'ュ', 'ユ', 'ョ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ヮ', 'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン', 'ヴ', 'ヵ', 'ヶ', 'ヷ', 'ヸ', 'ヹ', 'ヺ']


const keys = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,back,caps,enter,space'.split(',')

const Mech = props => {
    const [pressedKey, setPressedKey] = useState(null)
    const { ready } = props

    function pressAKey() {
        let idx = Math.floor(Math.random() * keys.length)
        if (idx === pressedKey) idx += 1

        setPressedKey(idx)
    }

    useEffect(() => {
        let pressInterval = setInterval(pressAKey, 300)
        return () => clearInterval(pressInterval)
    }, [])

    return (
        <div style={{
            display: 'grid',
            width: 150,
            gridGap: 5,
            gridTemplateAreas: `
                "a b c d e f g back back"
                "caps caps h i j k l m enter"
                "n o space space space space space p q"
            `
        }}>
            {keys.map((key, i) => {
                const pressed = pressedKey === i
                return <div className='mech-key' style={{
                    gridArea: key,
                    opacity: pressed && .4,
                    transform: `scale(${ready ? 1 : '0'}) translateY(${pressed ? 1 : 0}px)`,
                    transition: `all .25s ease ${i*.04}s`,
                    height: 10,
                    width: '100%',
                    borderRadius: 3,
                }} />
            })}
        </div>
    )
}

// const colors = ['#618654', '#837f7f','#9f9151']
// const colors = ['#93C28A', '#949494','#D1C18A']

const colors = ['#EDE6D188', '#EDE6D122','#EDE6D155']

    function populate() {
        let arr = []
        for (let i = 0; i < 20; i++) {
            arr.push(colors[Math.floor(Math.random() * colors.length)])
        }
        return arr
    }

const Wordle = props => {
    const { ready, hovered } = props
    const [colorStates, setColorStates] = useState(populate())

    function toggleEm() {
        let newColorStates = colorStates.slice()
        let numChanges = Math.floor(Math.random() * 10)

        for (let i = 0; i < numChanges; i++) {
            newColorStates[Math.floor(Math.random() * colorStates.length)] = colors[Math.floor(Math.random() * colors.length)]
        }
        setColorStates(newColorStates)
    }

    useEffect(() => {
        let toggleInterval = setInterval(toggleEm, 2000)
        return () => clearInterval(toggleInterval)
    }, [])

    return (
        <div className='wordle-grid' style={{  }}>
            {colorStates.map((c, i) => (
                <div className='box' style={{ background: c, transitionDelay: `${i*.05}s`, transform: `scale(${ready && !hovered ? 1 : 0})` }} />
            ))}
            <div style={{ transform: `scale(${ready && !hovered ? 1 : 0})`, transitionDelay: '1.3s' }} className='box unchanging flex center'>s</div>
            <div style={{ transform: `scale(${ready && !hovered ? 1 : 0})`, transitionDelay: '1.3s' }} className='box unchanging flex center'>o</div>
            <div style={{ transform: `scale(${ready && !hovered ? 1 : 0})`, transitionDelay: '1.3s' }} className='box unchanging flex center'>l</div>
            <div style={{ transform: `scale(${ready && !hovered ? 1 : 0})`, transitionDelay: '1.3s' }} className='box unchanging flex center'>v</div>
            <div style={{ transform: `scale(${ready && !hovered ? 1 : 0})`, transitionDelay: '1.3s' }} className='box unchanging flex center'>e</div>
        </div>
    )
}




export default SketchPreview
