import React, { useState, useEffect } from 'react'
import ReactPageScroller from 'react-page-scroller'
import { GlobalStyles } from './styles'

import Landing from './Landing'
import Animations from './Animations'

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
                    <Animations ready={ready && page==1} />
                ]}
            </ReactPageScroller>
        </>
    )
}

export default App