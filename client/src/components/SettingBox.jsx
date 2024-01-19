import React, { useEffect, useState } from 'react'
import '../styles/settingBox.css'

function SettingBox(params) {
    const [bgColor, setBgColor] = useState('#ffffff')
    const [fontColor, setFontColor] = useState('#000000')

    const handleBgColor = (e) => {
        setBgColor(e.target.value)
    }

    const handleFontColor = (e) => {
        setFontColor(e.target.value)
    }

    const saveBtn = () => {
        params.sendSetting(bgColor, fontColor)
    }

    useEffect(() => {
        setBgColor(params.setting.bgColor)
        setFontColor(params.setting.fontColor)
    }, [params.setting.bgColor, params.setting.fontColor])

    useEffect(() => {
        document.body.style.backgroundColor = bgColor
    }, [bgColor])

    useEffect(() => {
        document.body.style.color = fontColor
    }, [fontColor])

    return (
        <div id='container-setting'>
            <h2>User Setting</h2>
            <div className='box-setting' id='bgColor-box'>
                <label htmlFor='bgColor'>Background Color</label>
                <input
                    type='color'
                    name='bgColor'
                    id='bgColor'
                    value={bgColor}
                    onChange={handleBgColor}
                />
            </div>
            <div className='box-setting' id='fontColor'>
                <label htmlFor='fontColor'>Font Color</label>
                <input
                    type='color'
                    name='fontColor'
                    id='fontColor'
                    value={ fontColor }
                    onChange={handleFontColor}
                />
            </div>
            <button id='btn-save' onClick={saveBtn}>
                Save
            </button>
        </div>
    )
}

export default SettingBox
