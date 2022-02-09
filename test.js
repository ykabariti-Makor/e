const {specialCharsModifier} = require("./src/functions/modifies");
const {setConfig} = require("./src/config")
const {ValidateIPaddress} = require("./src/functions/auth")
setConfig("specialCharsModifier",{exceptions:"@#$"}) 