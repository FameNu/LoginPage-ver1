import React, { useState } from 'react'
import axios from 'axios'

const url = 'http://localhost:3000/'

function LoginBox(params) {
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showLogoutBox, setShowLogoutBox] = useState(false)
    const [username, setUsername] = useState('')

    const handeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const callData = (data, showLogout = true) => {
        if (data.errMsg) {
            setErrMsg(data.errMsg)
            return
        }
        setUsernameInput('')
        setPasswordInput('')
        setErrMsg('')
        setShowLogoutBox(showLogout)
        setUsername(data.user.name)
        params.sendData(data.user)
    }

    const checkValidInput = () => {
        if (usernameInput && passwordInput) return true
        if (!usernameInput && !passwordInput)
            setErrMsg('Please enter username and password')
        else if (!usernameInput) setErrMsg('Please enter username')
        else if (!passwordInput) setErrMsg('Please enter password')
        return false
    }

    const onToSignIn = async () => {
        if (!checkValidInput()) return
        try {
            const response = await axios.get(
                `${url}login?name=${usernameInput}&password=${passwordInput}`
            )
            callData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const onToSignUp = async () => {
        if (!checkValidInput()) return
        try {
            const response = await axios.post(
                `${url}register?name=${usernameInput}&password=${passwordInput}`
            )
            callData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const signOut = async () => {
        try {
            const response = await axios.get(`${url}`)
            callData(response.data, false)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <>
            <div className='container-login' id='login-container'>
                {errMsg && <h2 className='text-danger'>{errMsg}</h2>}
                <div id='username-box'>
                    <label htmlFor='username'>Enter Name</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                    />
                </div>
                <div id='password-box'>
                    <label htmlFor='password'>Enter Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        id='password'
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                </div>
                <div id='show-password'>
                    <input
                        type='checkbox'
                        name='show-password'
                        id='show-password'
                        checked={showPassword}
                        onChange={handeShowPassword}
                    />
                    <label htmlFor='show-password'>show password</label>
                </div>
                <div id='button-box'>
                    <button onClick={onToSignIn}>Sign-in</button>
                    <button onClick={onToSignUp}>Sign-up</button>
                </div>
                {showLogoutBox && (
                    <div id='logout-box'>
                        <h2>Hello, {username}</h2>
                        <button onClick={signOut}>Sign-out</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default LoginBox
