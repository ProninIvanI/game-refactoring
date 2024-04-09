const sizeField = 3
const quantityCross = Math.ceil(sizeField * sizeField / 2)
const quantityZero = Math.floor(sizeField * sizeField / 2)

let step = 0
let arrayCross = []
let arrayZero = []

function createVariable() {
    step = 0
    arrayCross = []
    arrayZero = []
}

function createArray(arr, quantityNum) {
    arr = new Array(quantityNum)
    for (let i = 0; i < quantityNum; i++) {
        arr[i] = new Array(2)
        for (let j = 0; j < 2; j++) {
            arr[i][j] = 0
        }
    }
    return arr
}

function movePlayer(x, y) {
    let combinationVictory
    drawLetter(x, y)
    lockButtonAfterPressing(x, y)
    changeArrayOfMoves(x, y)
    if (step % 2 == 0) {
        combinationVictory = checkVictoryCondition(arrayCross.length, arrayCross)
        if (combinationVictory != undefined) {
            paintCellAfterWin(combinationVictory)
            alertVicory("победил 1-ый")
            lockButton()
        } else if (combinationVictory == undefined && step == 8) {
            alertVicory("ничья")
            lockButton()
        }
    } else {
        combinationVictory = checkVictoryCondition(arrayZero.length, arrayZero)
        if (combinationVictory != undefined) {
            paintCellAfterWin(combinationVictory)
            alertVicory("победил 2-ой")
            lockButton()
        }
    }
    step += 1
}

function drawLetter(x, y) {
    if (step % 2 == 0) {
        document.getElementById("img" + x + y).src = '/img/cross.png'
    } else {
        document.getElementById("img" + x + y).src = '/img/zero.png'
    }
}

function lockButtonAfterPressing(x, y) {
    document.getElementById("bt" + x + y).disabled = 'true'
}

function changeArrayOfMoves(x, y) {
    if (step % 2 == 0) {
        arrayCross.push([x,y])
    } else {
        arrayZero.push([x,y])
    }
}

function checkVictoryCondition(quantity, arr) {
    let combinationVictory
    if (arr.length >= 3) {
        for (let i = 0; i < quantity - 2; i++) {
            for (let j = i + 1; j < quantity - 1; j++) {
                for (let k = j + 1; k < quantity; k++) {
                    if (calculationArea(arr[i], arr[j], arr[k]) == 0) {
                        return combinationVictory = [arr[i], arr[j], arr[k]]
                    }
                }
            }
        }
    }
    return combinationVictory
}

function calculationArea(a, b, c) {
    return ((b[0] - a[0])*(c[1] - a[1]) - (c[0] - a[0])*(b[1] - a[1])) * 0.5
}

function paintCellAfterWin(arr) {
    for (let i = 0; i < arr.length; i++) {
        document.getElementById("bt" + arr[i][0] + arr[i][1]).style.background = "green"
    }
}

function alertVicory(num) {
    document.getElementById("form").textContent = num
    document.getElementById("form").style.visibility = "visible"
}

function lockButton() {
    for (let i = 0; i < sizeField; i++) {
        for (let j = 0; j < sizeField; j++) {
            document.getElementById("bt" + i + j).disabled = 'true'
        }
    }
}