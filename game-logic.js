const sizeField = 3

let step = 0
let arrayCross = []
let arrayZero = []

// initgame
function createVariable() {
    step = 0
    arrayCross = []
    arrayZero = []
}

function movePlayer(x, y) {
    drawLetter(x, y)
    lockButtonAfterPressing(x, y)
    changeArrayOfMoves(x, y)
    const currentArray = step % 2 === 0 ? arrayCross : arrayZero
    const currentMove = step % 2 + 1

    const combinationVictory = checkVictoryCondition(currentArray.length, arrayCross)
    if (combinationVictory !== undefined) {
        paintCellAfterWin(combinationVictory)
        alertVictory(`победил ${currentMove}-ый`)
        lockButton()
    } else if (combinationVictory === undefined && step === 8) {
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
    step % 2 == 0 ? arrayCross.push([x,y]) : arrayZero.push([x,y])
}

function checkVictoryCondition(quantity, arr) {
    let combinationVictory
    if (arr.length >= 3) {
        for (let i = 0; i < quantity - 2; i++) {
            for (let j = i + 1; j < quantity - 1; j++) {
                for (let k = j + 1; k < quantity; k++) {
                    if (calculationArea(arr[i], arr[j], arr[k]) === 0) {
                        return combinationVictory = [arr[i], arr[j], arr[k]]
                    }
                }
            }
        }
    }
    return combinationVictory
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