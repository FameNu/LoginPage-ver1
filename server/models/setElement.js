class SetElement {
    constructor(setStyle, color, elementId, heading) {
        this.setStyle = setStyle
        this.color = color
        this.elementId = elementId
        this.heading = heading
    }

    getSetStyle() {
        return this.setStyle
    }

    getColor() {
        return this.color
    }

    getElementId() {
        return this.elementId
    }

    getHeading() {
        return this.heading
    }
}

module.exports = { SetElement }