import React, { useState } from 'react'
import axios from 'axios'

function LoginBox(params) {
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showLogoutBox, setShowLogoutBox] = useState(false)

    const handeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const callData = (response) => {
        setUsernameInput('')
        setPasswordInput('')
        setErrMsg('')
        setShowLogoutBox(!showLogoutBox)
        params.toLoadData(response)
    }

    const checkValidInput = () => {
        if (usernameInput && passwordInput) return true
        if (!usernameInput && !passwordInput) setErrMsg('Please enter username and password')
        else if (!usernameInput) setErrMsg('Please enter username')
        else if (!passwordInput) setErrMsg('Please enter password')
        return false
    }

    const onToSignIn = async () => {
        if (!checkValidInput()) return
        try {
            const response = await axios.get(
                `http://localhost:3000/login?name=${usernameInput}&password=${passwordInput}`
            )
            callData(response)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const onToSignUp = async () => {
        if (!checkValidInput()) return
        try {
            const response = await axios.post(
                `http://localhost:3000/register?name=${usernameInput}&password=${passwordInput}`
            )
            callData(response)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const signOut = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3000/logout`
            )
            callData(response)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <>
        {
            showLogoutBox &&
            <div id='logout-box'>
                <h2>Are you sure?</h2>
                <button onClick={signOut}>Sign-out</button>
            </div>
        }
        {
            !showLogoutBox &&
            <div className='container' id='login-container'>
                {errMsg && <h2>{errMsg}</h2>}
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
                    <input
                        type='checkbox'
                        name='show-password'
                        id='show-password'
                        checked={showPassword}
                        onChange={handeShowPassword}
                    />
                </div>
                <div id='button-box'>
                    <button onClick={onToSignIn}>Sign-in</button>
                    <button onClick={onToSignUp}>Sign-up</button>
                </div>
            </div>
        }
        </>
        
    )
}

export default LoginBox
