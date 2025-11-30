import React from 'react'
import ReactDOM from 'react-dom/client'
import { DemoApp } from './DemoApp'
import './styles/index.css'

// Create a basic CSS file if it doesn't exist or ensure tailwind directives are present
// Since we can't easily check/create in one go, we'll assume styles/index.css exists or we should create it.
// But wait, the file list showed `styles` dir. Let's assume we need to add tailwind directives there.

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DemoApp />
    </React.StrictMode>,
)
