import React, { useState, useEffect } from 'react'
import ReactPageScroller from 'react-page-scroller'
import { GlobalStyles } from './styles'

import Landing from './Landing'
import SketchGallery from './SketchGallery'

const App = () => {
    const [page, setPage] = useState(0)
    const [ready, setReady] = useState(false)
    const [inFocus, setInFocus] = useState(false) // if in daydream, or some other modal where you want to prevent scrolling

    // lets get this shit started
    useEffect(() => {
        setTimeout(() => setReady(!ready), 1*1000)
    }, [])

    function handlePageChange(pageNum) {
        setPage(pageNum)
    }

    // function handlePageChangeAttempt(pageNum) {
    //     if (!inFocus) 
    // }

    // useEffect(() => {
    //     alert(inFocus)
    // }, [inFocus])


    // return <>
    // <GlobalStyles />
    // <div className='full-page'><SketchGallery /></div>
    // {/* <Landing ready={ready} goto={num => setPage(num) } /> */}
    // </>
    return (
        <>
            <GlobalStyles />
            <ReactPageScroller
                animationTimer={750}
                blockScrollUp={inFocus}
                blockScrollDown={inFocus}
                pageOnChange={handlePageChange}
                customPageNumber={page}
            >
                {[
                    <Landing ready={ready && page==0} goto={num => setPage(num) } />,
                    // <SketchGallery />
                    <div className='full-page flex center'>
                        <SketchGallery setInFocus={setInFocus} ready={ready && page==1} />
                    </div>
                    // <Games ready={ready && page==1} goto={num => setPage(num)}  />
                    // <Animations ready={ready && page==1} />
                ]}
            </ReactPageScroller>
        </>
    )
}

export default App
