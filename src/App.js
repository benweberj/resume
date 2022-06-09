import React, { useState, useEffect } from 'react'
import ReactPageScroller from 'react-page-scroller'
import { GlobalStyles } from './styles'

import Landing from './Landing'
import SketchGallery from './SketchGallery'

const App = () => {
    const [page, setPage] = useState(0)

    const [ready, setReady] = useState(false)

    // lets get this shit started
    useEffect(() => {
        setTimeout(() => setReady(!ready), 1*1000)
    }, [])

    function handlePageChange(pageNum) {
        setPage(pageNum)
    }


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
                pageOnChange={handlePageChange}
                customPageNumber={page}
            >
                {[
                    <Landing ready={ready && page==0} goto={num => setPage(num) } />,
                    // <SketchGallery />
                    <div className='full-page flex center'><SketchGallery ready={ready && page==1} /></div>
                    // <Games ready={ready && page==1} goto={num => setPage(num)}  />
                    // <Animations ready={ready && page==1} />
                ]}
            </ReactPageScroller>
        </>
    )
}

export default App
