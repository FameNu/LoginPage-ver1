const { SetElement } = require('./setElement')

class Setting {
    constructor(bgColor = '#f0f0f0', fontColor = '#000000') {
        this.bgColor = new SetElement(
            'background-color',
            bgColor,
            'bgColor',
            'Background Color'
        )
        this.fontColor = new SetElement(
            'color',
            fontColor,
            'fontColor',
            'Font Color'
        )
    }

    getBgColor() {
        return this.bgColor
    }

    getFontColor() {
        return this.fontColor
    }

    setBgColor(bgColor) {
        this.bgColor = new SetElement(
            'background-color',
            bgColor,
            'bgColor',
            'Background Color'
        )
    }

    setFontColor(fontColor) {
        this.fontColor = new SetElement(
            'color',
            fontColor,
            'fontColor',
            'Font Color'
        )
    }
}

module.exports = { Setting }