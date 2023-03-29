import React, { useState } from 'react'
import StateCon from './CreateContext'

const ContextState = (props) => {
    const [pageRoute, setPageRoute] = useState('blog')
    const state = {
        pageRoute,
        setPageRoute
        // name: 'page'
    }
  return (
        <StateCon.Provider value={state}>
            {props.children}
        </StateCon.Provider>
    )
}

export default ContextState
