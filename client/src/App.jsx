import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import './styles/loginBox.css'
import LoginBox from './components/LoginBox.jsx'
import SettingBox from './components/SettingBox.jsx'
const url = 'http://localhost:3000/'

function App() {
    const [username, setUsername] = useState('')
    const [setting, setSetting] = useState({})

    function setUser(user) {
        setUsername(user.name)
        setSetting(user.setting)
    }

    async function loadPage() {
        try {
            const response = await axios.get(
                `${url}`
            )
            if (response.data.user) {
                setUser(response.data.user)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    async function sendSetting(bgColor, fontColor) {
        try {
            const response = await axios.post(
                `${url}save-setting`,
                {
                    name: username,
                    bgColor,
                    fontColor
                }
            )
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = setting.bgColor
        document.body.style.color = setting.fontColor
    }, [username])

    useEffect(() => {
        window.addEventListener('load', loadPage)
    }, [])

    return (
        <div className='container'>
            <LoginBox sendData={setUser} />
            {username && <SettingBox sendSetting={sendSetting} setting={setting} />}
        </div>
    )
}

export default App
