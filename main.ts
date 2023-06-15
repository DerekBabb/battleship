enum RadioMessage {
    message1 = 49434
}
function showReport () {
    if (myGuess == 0) {
        reportImage = images.createImage(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    } else if (myGuess == 1) {
        reportImage = images.createImage(`
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            `)
    } else if (myGuess == 2) {
        reportImage = images.createImage(`
            . . . . .
            . . . . .
            # # # # #
            . . . . .
            . . . . .
            `)
    } else if (myGuess == 3) {
        reportImage = images.createImage(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
    }
    reportImage.showImage(0)
}
input.onButtonPressed(Button.A, function () {
    guessColumn = guessColumn + 1
    if (guessColumn >= 5) {
        guessColumn = 0
    }
    showGuess()
})
function sendReport () {
    radio.sendValue("report", guessResult)
}
function showGuess () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    led.plot(guessColumn, guessRow)
}
input.onButtonPressed(Button.AB, function () {
    radio.sendValue("spot", guessRow * 10 + guessColumn)
})
input.onButtonPressed(Button.B, function () {
    guessRow = guessRow - 1
    if (guessRow < 0) {
        guessRow = 4
    }
    showGuess()
})
radio.onReceivedValue(function (name, value) {
    if (name == "spot") {
        checkShot(value)
        sendReport()
    } else if (name == "report") {
        myGuess = value
        showReport()
    }
})
function showSpot () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    led.unplot(myColumn, myRow)
}
function moveToRandomLocation () {
    myColumn = randint(0, 4)
    myRow = randint(0, 4)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    showSpot()
})
function moveRandom () {
    if (randint(0, 1) == 0) {
        myColumn = myColumn + 1
        if (myColumn >= 5) {
            myColumn = 0
        }
    } else {
        myRow = myRow + 1
        if (myRow >= 5) {
            myRow = 0
        }
    }
    showSpot()
}
function checkShot (num: number) {
    guessResult = 0
    if (num % 10 == myColumn) {
        guessResult = guessResult + 1
    }
    if (Math.floor(num / 10) == myRow) {
        guessResult = guessResult + 2
    }
}
let myRow = 0
let myColumn = 0
let guessResult = 0
let reportImage: Image = null
let myGuess = 0
let guessColumn = 0
let guessRow = 0
radio.setGroup(1)
guessRow = 4
guessColumn = 0
moveToRandomLocation()
showGuess()
