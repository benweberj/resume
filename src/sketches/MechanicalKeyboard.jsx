import React, { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'

// let keySound = new Audio(`./key_sounds/${'a'.toUpperCase()}.mp3`)

const keyCodeLookup = {
    9: 'tab',
    81: 'q',
    87: 'w',
    69: 'e',
    82: 'r',
    84: 't',
    89: 'y',
    85: 'u',
    73: 'i',
    79: 'o',
    80: 'p',
    219: '[',
    221: ']',
    220: '|',

    20: 'caps',
    65: 'a',
    83: 's',
    68: 'd',
    70: 'f',
    71: 'g',
    72: 'h',
    74: 'j',
    75: 'k',
    76: 'l',
    186: ';',
    222: "'",
    13: 'enter',

    16: 'shift',
    90: 'z',
    88: 'x',
    67: 'c',
    86: 'v',
    66: 'b',
    78: 'n',
    77: 'm',
    188: ',',
    190: '.',
    191: '/',
    38: 'shift',

    17: 'ctrl',
    18: 'alt',
    91: 'win',
    32: 'space',
    93: 'win',
    37: 'alt',
    40:  'fn',
    39: 'ctrl',

    27: 'esc',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    48: '0',
    189: '-',
    187: '+',
    8: '<-----'
}


const Key = props => {
  const [pressed, setPressed] = useState(0)
  const { w, h, name } = props
  const [timer, setTimer] = useState(null)
  const [activeStyles, setActiveStyles] = useState({})

  const styles = w ? {
    fontFamily: 'Fira Code',
    width: w && w,
    height: h && h,
    margin: 2,
    // margin: 2,
    // border: '1px solid #000',
    boxShadow: '2px 2px 1px 0px #0003',
    border: '1px solid #fff3',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 10,
    transition: 'all .15s ease',
    textTransform: 'uppercase',
  } : {}

  useEffect(_ => {
    document.addEventListener('keydown', handlePress)
    document.addEventListener('keyup', e => handleRelease)

    return () => {
      document.removeEventListener('keydown', handlePress)
      document.removeEventListener('keyup', handleRelease)
    }
  }, [])

  // useEffect()

  const handleRelease = e => {
    handlePress(e, 'up')
  }
  
  const handlePress = (e, state='down') => {
    // console.log(id)
    if (name === keyCodeLookup[e.keyCode]) {
      if (state === 'down') {
        let keySound = new Audio(require(`./key_sounds/${name.toUpperCase()}.mp3`))
        if (keySound) { keySound.play()}
        setActiveStyles({
          background: '#EDE6D133',
          transform: 'translateY(3px)',
        })
      } else {
        setTimeout(_ => {
          setActiveStyles({})
        }, 10)
      }
    }
  }


  const onClick = _ => {
  }

  return (
    <div style={{ ...styles, ...activeStyles  }} onClick={onClick}>
      {name}
    </div>
  )
}

const keys = {
  num: ['esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', '<-----'],
  qwerty: ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|'],
  home: ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
  bot: ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'], 
  mod: ['ctrl', 'alt', 'win', 'space', 'win', 'alt', 'fn', 'ctrl'],
}

const App = _ => {
  const ks = 50 // keysize
  const [last, setLast] = useState('_')

  const setLetter = letter => {
    setLast(letter)
  }

  const rowStyle = { display: 'flex', width: '100%' }

  return (
    <div className='mech-container full flex col center'>
      <h3 className='mlb'>Mechanical Keyboard Simulator</h3>
      <div className='keyboard'>
        {/* <audio src={require("./key_sounds/A.mp3")} controls autoPlay /> */}
        <div style={rowStyle}>
          {keys.num.map((key, i) => (
            <Key name={key} w={i===keys.num.length-1 ? ks*2 : ks} h={ks} />
          ))}
        </div>  

        <div style={rowStyle}>
          {keys.qwerty.map((key, i) => (
            <Key name={key} w={(i===0 || i===keys.qwerty.length-1) ? ks*1.5 : ks} h={ks} />
          ))}
        </div>

        <div style={rowStyle}>
          {keys.home.map((key, i) => (
            <Key name={key} w={i===0 ? ks*1.7 : i===keys.home.length-1 ? ks*2.33 : ks} h={ks} />
          ))}
        </div>

        <div style={rowStyle}>
          {keys.bot.map((key, i) => (
            <Key name={key} w={i===0 ? ks*2.1 : i===keys.bot.length-1 ? ks*2.97 : ks} h={ks} />
          ))}
        </div>
        <div style={rowStyle}>
          {keys.mod.map((key, i) =>  (
            <Key name={key} w={i===3 ? ks*6.845 : ks*1.22} h={ks} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
