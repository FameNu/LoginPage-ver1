import React, { useState } from "react";
import SettingPanel from "./SettingPanel"
import axios from "axios";

function SettingBox(params) {

    const [setting, setSetting] = useState(
        params.setting
    )

    const saveSetting = async () => {
        const bgColor = document.getElementById('bgColor').value
        const fontColor = document.getElementById('fontColor').value
        console.log(bgColor, fontColor)
        try {
            const response = await axios.get(
                `http://localhost:3000/save?bgColor=${bgColor}&fontColor=${fontColor}`
            )
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <div
            className="container"    
            id="setting-container"
        >
            <h2>User Setting</h2>
            <SettingPanel 
                setting={setting?.bgColor}
            />
            <SettingPanel 
                setting={setting?.fontColor}
            />
            <button onClick={saveSetting}>Save</button>
        </div>
    )
}

export default SettingBox;