import './index.css'
import './wdyr.js'

import React from 'react'
import ReactDOM from 'react-dom'
import { App1, App2 } from './App'

ReactDOM.render(
    <React.StrictMode>
        <App1 />
        <App2 />
    </React.StrictMode>, 
    document.getElementById('root')
)
