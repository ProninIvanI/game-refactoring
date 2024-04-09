function creatingField() {
    creatingString()
    creatingCell()
    addButtonInCell()
    addImgInbutton()
    outputMessageVictory()
}

function creatingString() {
    for (let i = 0; i < sizeField; i++) {
        var element = document.createElement("div")
        element.className = "stringField"
        element.id = "str" + i
        document.body.append(element)
    }
}

function creatingCell() {
    for (let i = 0; i < sizeField; i++) {
        let stringField = document.getElementById("str" + i)
        for (let j = 0; j < sizeField; j++) {
            let cell = document.createElement("div")
            cell.className = "cellField"
            cell.id = "str" + i + "cell" + j
            stringField.appendChild(cell)
        }
    }
}

function addButtonInCell() {
    for (let i = 0; i < sizeField; i++) {
        for (let j = 0; j < sizeField; j++) {
            let button = document.createElement("button")
            button.id = "bt" + i + j
            button.className = "btnOnField"
            button.onclick = function() {
                movePlayer(i, j)
            }
            let cell = document.getElementById("str" + i + "cell" + j)
            cell.append(button)
        }
    }
}

function addImgInbutton() {
    for (let i = 0; i < sizeField; i++) {
        for (let j = 0; j < sizeField; j++) {
            let img = document.createElement("img")
            img.className = "imgOnBtn"
            img.id = "img" + i + j
            let btn = document.getElementById("bt" + i + j)
            btn.append(img)
        }
    }
}

function outputMessageVictory() {
    let form = document.createElement("div")
    form.className = "formForMessage"
    form.id = "form"
    form.style.visibility = "hidden"
    document.body.append(form)
}