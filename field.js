function creatingGame() {
    creatingCustomizationArea()
    creatingField()
}

function creatingField() {
    creatingFieldLocationArea()
    creatingString()
    creatingCell()
    addButtonInCell()
    addImgInbutton()
}

function creatingCustomizationArea() {
    creatingArea()
    addAreaInputInAreaCustomize("Width", "Ширина")
    addAreaInputInAreaCustomize("Height", "Высота")
    addAreaInputInAreaCustomize("LengthWinCombination", "Длина победной комбинации")
    addButtonInAreaCustomize()
}

function creatingArea() {
    const element = document.createElement("div")
    element.className = "areaCustomize"
    element.id = "areaCustomize"
    document.body.append(element)
}

function creatingAreaInput(id) {
    const areaInput = document.createElement("div")
    areaInput.className = "areaInput"
    areaInput.id = "areaInput" + id

    return areaInput
}

function creatingFormInput(id, text) {
    const formForInput = document.createElement("form")
    formForInput.id = "form" + id
    const inputStr = document.createElement("input")
    const labelStr = document.createElement("label")

    inputStr.type = "text"
    inputStr.id = "inputStr" + id
    inputStr.value = ""

    labelStr.textContent = text
    labelStr.className = "labelStr"

    formForInput.appendChild(labelStr)
    formForInput.appendChild(inputStr)

    return formForInput
}

function addFormInAreaInput(id, text) {
    const area = creatingAreaInput(id)
    const form = creatingFormInput(id, text)
    area.appendChild(form)

    return area
}

function createButtonSave() {
    const buttonSave = document.createElement("button")
    buttonSave.id = "buttonSave"
    buttonSave.className = "buttonSave"
    buttonSave.textContent = "Сохранить"
    buttonSave.onclick = function() {
        initNewGame()
    }

    return buttonSave
}

function addAreaInputInAreaCustomize(id, text) {
    const areaInput = addFormInAreaInput(id, text)
    const areaCustomize = document.getElementById("areaCustomize")
    areaCustomize.appendChild(areaInput)
}

function addButtonInAreaCustomize() {
    const buttonSave = createButtonSave()
    const areaCustomize = document.getElementById("areaCustomize")
    areaCustomize.appendChild(buttonSave)
}

function creatingFieldLocationArea() {
    const areaField = document.createElement("div")
    areaField.id = "areaField"
    document.body.append(areaField)
}

function creatingString() {
    const areaField = document.getElementById("areaField")
    for (let i = 0; i < heightField; i++) {
        var element = document.createElement("div")
        element.className = "stringField"
        element.id = "str" + i
        areaField.appendChild(element)
    }
}

function creatingCell() {
    for (let i = 0; i < heightField; i++) {
        const stringField = document.getElementById("str" + i)
        for (let j = 0; j < widthField; j++) {
            const cell = document.createElement("div")
            cell.className = "cellField"
            cell.id = "str" + i + "cell" + j
            stringField.appendChild(cell)
        }
    }
}

function addButtonInCell() {
    for (let i = 0; i < heightField; i++) {
        for (let j = 0; j < widthField; j++) {
            const button = document.createElement("button")
            button.id = "bt" + i + j
            button.className = "btnOnField"
            button.onclick = function() {
                movePlayer(i, j)
            }
            const cell = document.getElementById("str" + i + "cell" + j)
            cell.append(button)
        }
    }
}

function addImgInbutton() {
    for (let i = 0; i < heightField; i++) {
        for (let j = 0; j < widthField; j++) {
            const img = document.createElement("img")
            img.className = "imgOnBtn"
            img.id = "img" + i + j
            const btn = document.getElementById("bt" + i + j)
            btn.append(img)
        }
    }
}

function outputMessageVictory(num) {
    const formForMessage = document.createElement("div")
    formForMessage.className = "formForMessage"
    formForMessage.id = "formForMessage"
    formForMessage.textContent = num
    document.body.append(formForMessage)
}