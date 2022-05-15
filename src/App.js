import React, { useState, useEffect } from 'react'
import ReactPageScroller from 'react-page-scroller'
import { GlobalStyles } from './styles'

import Landing from './Landing'
import Animations from './Animations'

const App = () => {
    const [page, setPage] = useState(2)
    const [ready, setReady] = useState(false)

    // lets get this shit started
    useEffect(() => {
        setTimeout(() => setReady(!ready), 1.5*1000)
    }, [])

    return (
        <>
            <GlobalStyles />
            <ReactPageScroller
                animationTimer={750}
                pageOnChange={p => setPage(p)}
                customPageNumber={page}
            >
                {[
                    <Landing ready={ready} goto={num => setPage(num) } />,
                    <Animations />
                ]}
            </ReactPageScroller>
        </>
    )
}

export default App