let widthField = 3
let heightField = 3
let lengthWinCombination = 3

let step = 0
let arrayStep = []

function initStartGame() {
    step = 0
    widthField = 3
    heightField = 3
    lengthWinCombination = 3
    initArrayStep(arrayStep)
}

function initNewGame() {
    clearField()

    num1 = document.getElementById("inputStrWidth").value
    num2 = document.getElementById("inputStrHeight").value
    num3 = document.getElementById("inputStrLengthWinCombination").value

    if (validationData(num1) && validationData(num2) && validationData(num3)) {
        widthField = Number(num1)
        heightField = Number(num2)
        lengthWinCombination = Number(num3)
        step = 0
        initArrayStep(arrayStep)
        creatingField()
    } else {
        alert("введены данные c ошибкой")
        initStartGame()
        creatingField()
    }
}

function clearField() {
    const message = document.getElementById("formForMessage")
    if (message !== null) {
       message.remove()
    }
    document.getElementById("areaField").parentNode.removeChild(areaField)
}

function initArrayStep(arrayStep) {
    for (let i = 0; i < heightField; i++) {
        arrayStep.push(new Array(widthField))
        for (let j = 0; j < widthField; j++) {
            arrayStep[i][j] = 0
        }
    }
}

function validationData(text) {
    return /^\d+$/.test(text)
}

function movePlayer(x, y) {
    drawLetter(x, y)
    lockButtonAfterPressing(x, y)
    changeArrayOfMoves(x, y)
    const currentMove = step % 2 + 1

    const combinationVictory = checkVictory(arrayStep)
    if (combinationVictory !== undefined) {
        paintCellAfterWin(combinationVictory)
        alertVictory(`победил ${currentMove}-ый`)
        lockButton()
    } else if (combinationVictory === undefined && step === widthField * heightField - 1) {
        alertVictory("ничья")
        lockButton()
    }
    step += 1
}

function drawLetter(x, y) {
    const letter = step % 2 == 0 ? `cross` : `zero`
    document.getElementById("img" + x + y).src = `/img/${letter}.png`
}

function lockButtonAfterPressing(x, y) {
    document.getElementById("bt" + x + y).disabled = 'true'
}

function changeArrayOfMoves(x, y) {
    step % 2 == 0 ? arrayStep[x][y] = 1 : arrayStep[x][y] = 2
}

function checkVictory(arr) {
    let arrayCombination
    let flag
    for (let i = 0; i < heightField; i++) {
        for (let j = 0; j < widthField; j++) {
            if (arr[i][j] !== 0) {
                if (i + lengthWinCombination <= heightField) {
                    arrayCombination = createLine(i, j, 1, 0)
                    flag = checkArray(arrayStep, arrayCombination)
                    if (flag) {
                        return arrayCombination
                    }
                }
                if (j + lengthWinCombination <= widthField) {
                    arrayCombination = createLine(i, j, 0, 1)
                    flag = checkArray(arrayStep, arrayCombination)
                    if (flag) {
                        return arrayCombination
                    }
                }
                if (i + lengthWinCombination <= heightField && j + lengthWinCombination <= widthField) {
                    arrayCombination = createLine(i, j, 1, 1)
                    flag = checkArray(arrayStep, arrayCombination)
                    if (flag) {
                        return arrayCombination
                    }
                }
                if (i + lengthWinCombination <= heightField && j - lengthWinCombination + 1 >= 0) {
                    arrayCombination = createLine(i, j, 1, -1)
                    flag = checkArray(arrayStep, arrayCombination)
                    if (flag) {
                        return arrayCombination
                    }
                }
            }
        }
    }
    return undefined
}

function createLine(x, y, num1, num2) {
    let combination = []
    combination.push([x, y])
    for (let i = 0; i < lengthWinCombination - 1; i++) {
        x = x + num1
        y = y + num2
        combination.push([x, y])
    }
    return combination
}

function checkArray(arrayStep, arrayCombination) {
    for (let i = 0; i < lengthWinCombination - 1; i++) {
        if (arrayStep[arrayCombination[i][0]][arrayCombination[i][1]] !== arrayStep[arrayCombination[i + 1][0]][arrayCombination[i + 1][1]]) {
            return false
        }
    }
    return true
}


function calculationArea(a, b, c) {
    return ((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) * 0.5
}

function paintCellAfterWin(arr) {
    for (let i = 0; i < arr.length; i++) {
        document.getElementById("bt" + arr[i][0] + arr[i][1]).style.background = "green"
    }
}

function alertVictory(num) {
    outputMessageVictory(num)
}

function lockButton() {
    for (let i = 0; i < heightField; i++) {
        for (let j = 0; j < widthField; j++) {
            document.getElementById("bt" + i + j).disabled = 'true'
        }
    }
}