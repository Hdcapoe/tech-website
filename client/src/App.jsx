import axios from 'axios'

import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import './App.css'


function App() {

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    async function getUser(token) {
        try {
            const response = await axios.get('/api/users', {
                headers: {
                    Authorization: token
                }
            })
            setUser(response.data)
        } catch(err) {
            console.log(err)
            localStorage.removeItem("token")
        }
        setIsLoading(false)
    }

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {
            // get user info
            getUser(token)
        } else {
            setIsLoading(false)
        }

    }, [])

    let loggedIn = user.username

    return ( 
        <div className="app">
            <Navbar username={user.username} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                {loggedIn ? 
                    <>
                        <Route path="/profile" element={<Profile username={user.username} email={user.email} />} />
                        {!isLoading && <Route path="*" element={<Navigate to="/" />} />}
                    </>
                    :
                    <>
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/register" element={<Register setUser={setUser} />} />
                        {!isLoading && <Route path="*" element={<Navigate to="/login" />} />}
                    </>
                }
            </Routes>
        </div>
     );
}

export default App;