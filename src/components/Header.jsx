import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const [user, setUser] = useState({ name: '', email: '' })
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
            setUser(storedUser)
        }
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        setUser({ name: '', email: '' })
        navigate('/')
    }

    return (
        <header className="bg-gradient-to-r from-blue-400 to-purple-600 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">Image Search Application</div>
            <div className="flex items-center space-x-4">
                <div>{user.name}</div>&nbsp;||&nbsp;
                <div>{user.email}</div>
                <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Header
