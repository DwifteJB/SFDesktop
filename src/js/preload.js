const fs = require('fs')
const path = require("path");

let dataPath = "";

if (process.platform === "win32") {
    dataPath = process.env.APPDATA;
} else if (process.platform === "darwin") {
    dataPath = dataPath = path.join(electron.app.getPath("userData"), "..");
} else {
    dataPath = process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : path.join(process.env.HOME, ".config");
}
dataPath = path.join(dataPath, "SFDesktop") + "/";
// Does it exist???
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath)
}
if (!fs.existsSync(path.join(dataPath, "plugins"))) {
    fs.mkdirSync(path.join(dataPath, "plugins"));
}
if (!fs.existsSync(path.join(dataPath, "themes"))) {
    fs.mkdirSync(path.join(dataPath, "themes"));
}

const conf_json = {
    userData: dataPath,
    key: '',
}
fs.writeFileSync(dataPath + "/config.json", JSON.stringify(conf_json, null, 4));