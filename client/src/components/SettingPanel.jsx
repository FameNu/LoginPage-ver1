import React, { useEffect, useState } from 'react'

function SettingPanel(getParams) {
    const getSetting = getParams.setting

    const { elementId, setStyle, heading } = getSetting

    const [color, setColor] = useState(getSetting.color)

    function handleColorChange(e) {
        setColor(e.target.value)
    }

    useEffect(() => {
        document.body.style[setStyle] = color
    }, [color])

    return (
        <div className='setting-box'>
            <label htmlFor={elementId}>{heading}</label>
            <input 
                type='color'
                name={elementId}
                id={elementId}
                value={color}
                onChange={handleColorChange}
                style={{height: '3em', width: '6em'}}
            />
        </div>
    )
}

export default SettingPanel
