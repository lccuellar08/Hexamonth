import React from 'react'
import {
    BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import Home from './Home'

export const url = "http://localhost:3001/"

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
        </Router>
    )
}
