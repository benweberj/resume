import { type } from '@testing-library/user-event/dist/type'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import WORD_LIST, { commonWords } from './words'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const validChar = c => c.length === 1 && alphabet.includes(c)
const colors = { right: '#618654', wrong: '#616466', maybe: '#9f9151', empty: '#222' }
const modes = Object.keys(colors)

const WordleSolver = () => {
   const [focusedCell, setFocusedCell] = useState(0)
   const [possibleWords, setPossibleWords] = useState(WORD_LIST)
   const [stagedChar, setStagedChar] = useState(null)
   // const [goingBack, setGoingBack] = useState(false)

   const goingBack = useRef(false)
   // const [status, setStatus] = useState(emptyBoard())

   function getLetters() {
      let i = 0
      const letters = []
      while (i < 25) {
         const input = getInput(i)
         const cell = getCell(i)
         
         if (!input.value || input.value.length != 1) break
         const classes = cell.className.split(' ')

         let status = 'empty'

         if (classes.includes('right')) { status = 'right' }  
         else if (classes.includes('maybe')) { status = 'maybe' }
         else if (classes.includes('wrong')) { status = 'wrong' }

         if (status === 'empty') break

         letters.push([input.value, status])

         i++
      }

      return letters


   }


   function evaluate() {
      const letters = getLetters()
      
      const states = {}

      letters.forEach(([letter, status], i) => {
         const idx = i % 5
         const indices = states[letter]
         
         if (typeof indices === 'object') { // we have information about this characters position
            if (status === 'right') {
               if (indices.length === 1 && typeof indices[0] !== 'object' && indices[0] != idx) {
                     states[letter] = [[indices[0], idx]]
               } else {
                  states[letter] = [idx]
               }
            }
            if (status === 'maybe' && indices.length > 1) {
               states[letter] = indices.filter(x => x != idx)
            }
         } else {
            // create a new entry
            if (status === 'wrong') states[letter] = []
            else if (status === 'right') states[letter] = [idx]
            else if (status === 'maybe') states[letter] = [0,1,2,3,4].filter(x => x != idx)
         }
      })

      const rights = {}
      const maybes = []
      for (let i = 0; i < 25; i++) {
         const cell = getCell(i)
         const idx = i % 5
         if (cell.className.includes('right')) {
            rights[idx] = getInput(i).value
         } else if (cell.className.includes('maybe')) {
            maybes.push(getInput(i).value)
         }
      }
      
      Object.keys(states).forEach(letter => {
         if (states[letter].length > 1) {
            Object.keys(rights).forEach(i => {
               i = parseInt(i)
               if (states[letter].includes(i)) {
                  states[letter] = states[letter].filter(x => x != i)
               }
            })
         }
      })

      const spotsFilter = word => {
         for (let i = 0; i < 5; i++) {
            const curChar = word[i]
            
            let charState = states[curChar]
            if (charState) {
               if (charState.length===0) return false

               if (charState.length===1) {
                  if (typeof charState[0] === 'object') {
                     const spot1 = charState[0][0]
                     const spot2 = charState[0][1]
                     
                     if (!(word[spot1]===curChar && word[spot2]===curChar)) return false
                  }
               } else if (!charState.includes(i)) return false

            } else if (Object.keys(rights).includes(`${i}`)) return false
         }

         for (let m of maybes) if (!word.includes(m)) return false
         
         return true
      }

      setPossibleWords(WORD_LIST.filter(spotsFilter))
   }


   function getCell(i) { return document.getElementById(`wordle-cell-${i}`) }
   function getInput(i) { return document.getElementById(`wordle-cell-input-${i}`) }

   function clearBoard() {
      for (let i = 0; i < 25; i++) {
         getInput(i).value = ''
         getCell(i).className = 'cell empty'
      }
      setPossibleWords(WORD_LIST)
      // focusOn(0)
   }

   function toggleMode(idx, mode) {
      const cell = getCell(idx)
      cell.className = `cell ${mode}`
      if (mode === 'empty') {
         getInput(idx).value = ''
      }
   }

   useEffect(() => {
      clearBoard()
   }, [])

   function handlePress(e, idx) {
      const ch = e.target.value
      if (ch.length===1) {
         toggleMode(idx, 'wrong')
         focusOn(idx+1)
      }
   }

   function focusOn(idx) {
      if (idx < 0) idx = 0
      if (idx > 24) idx = 24
      const input = getInput(idx)
      input.focus()
   }

   function handleFocus(e, idx) {
      setStagedChar(e.target.value)
      getInput(idx).value = ''
   }

   function handleBlur(e, idx) {
      if (!e.target.value) {
         if (goingBack.current) {
            toggleMode(idx, 'empty')
         } else {
            getInput(idx).value = stagedChar
         }
      }
      setStagedChar(null)
      goingBack.current = false
   }

   function handleKeydown(e, idx) {
      if (e.code === 'Backspace') {
         goingBack.current = true
         setStagedChar(null)
         focusOn(idx-1)
      }
   }

   return (
      <div className='wordle-container full flex col center'>

         <h3 className='mlb' style={{ marginTop: 100 }}>Wordle Solver</h3>

         <div className='board'>
            {[...Array(25).keys()].map(i => {
               // const val = status[i].ch

               return (
                  <div id={`wordle-cell-${i}`} className='cell'>
                     <input
                        id={`wordle-cell-input-${i}`}
                        onKeyDown={e => handleKeydown(e, i)}
                        maxLength={1}
                        placeholder={(document.activeElement == getInput(i)) && stagedChar}
                        onFocus={e => handleFocus(e, i)}
                        onBlur={e => handleBlur(e, i)}
                        onChange={e => handlePress(e, i)}
                     />

                     <div className='toggler'>
                        {modes.map(m => (
                           <div onClick={() => toggleMode(i, m)} style={{ background: colors[m] }} />
                        ))}
                     </div>
                  </div>
               )

            })}
         </div>

         <div className='flex mmy'>
            <button className='wordle-solve msr' onClick={evaluate}>Solve</button>
            <button className='wordle-clear' onClick={clearBoard}>Clear</button>
         </div>

         <div className='word-list'>
            <p className='p msr'>Possible words <b>({possibleWords.length})</b></p>
            {possibleWords.map(w => (
               <div className='word-option'>{w}</div>
               // <div className={`word-option ${commonWords.includes(w) && 'common'}`}>{w}</div>
            ))}
         </div>
      </div>
   )
}

export default WordleSolver