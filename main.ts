radio.onReceivedValue(function (name, value) {
    ZeitstempelEmpfangen = input.runningTime()
    if (name == "F") {
        if (value == 1) {
            Fahren = true
        } else {
            Fahren = false
        }
    } else if (name == "L") {
        MotorLinks = value
    } else if (name == "R") {
        MotorRechts = value
    } else if (name == "X") {
        LedX = value
    } else if (name == "Y") {
        LedY = value
    } else {
    	
    }
})
let LedY = 0
let LedX = 0
let MotorRechts = 0
let MotorLinks = 0
let Fahren = false
let ZeitstempelEmpfangen = 0
let Timeout = 500
radio.setGroup(1)
basic.setLedColor(0x007fff)
serial.redirectToUSB()
basic.forever(function () {
    if (Fahren && input.runningTime() < ZeitstempelEmpfangen + Timeout) {
        basic.setLedColor(0x00ff00)
        basic.clearScreen()
        LedX = Math.map(LedX, 0, 4, 4, 0)
        LedY = Math.map(LedY, 0, 4, 4, 0)
        led.plot(LedX, LedY)
        serial.writeValue("L", MotorLinks)
        serial.writeValue("R", MotorRechts)
        motors.dualMotorPower(Motor.A, MotorLinks)
        motors.dualMotorPower(Motor.B, MotorRechts)
    } else {
        basic.setLedColor(0x007fff)
        motors.dualMotorPower(Motor.A, 0)
        motors.dualMotorPower(Motor.B, 0)
    }
})
