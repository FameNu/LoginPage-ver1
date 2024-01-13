import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginBox from './components/LoginBox.jsx'
import SettingBox from './components/SettingBox.jsx'

function App() {
  const [dataUser, setDataUser] = useState(null)
  const [setting, setSetting] = useState(null)
  const [logedIn, setLogedIn] = useState(false)

  const setFunction = (response) => {
    const {data} = response
    if (data?.errMsg) alert(data.errMsg)
    else {
      if (data.dataUser) {
        setDataUser(data.dataUser)
        setSetting(data.dataUser.setting)
        setLogedIn(true)
      } else {
        setDataUser(null)
        setSetting(data.setting)
        const {bgColor, fontColor} = data.setting
        document.body.style[bgColor.setStyle] = bgColor.color
        document.body.style[fontColor.setStyle] = fontColor.color
        setLogedIn(false)
      }
    }
  }

  return (
      <>
        <LoginBox toLoadData={setFunction} />
        {
          logedIn &&
          <div id='display-info'>
            <h1>Hi, {dataUser.user.name}</h1>
            <hr />
            <h4>Your setting</h4>
            <p>bg-Color: {dataUser.setting.bgColor.color}</p>
            <p>font-Color: {dataUser.setting.fontColor.color}</p>
          </div>
        }
        {logedIn && <SettingBox setting={setting} />}
      </>
  )
}

export default App
