const fs = require('fs')
const path = require("path");
const { contextBridge, ipcRenderer } = require('electron');

// The User Data
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

const regex = /\\/g;
dataPath = dataPath.replace(regex, '/');

const conf_json = {
    userData: dataPath,
    key: '',
}

if (!fs.existsSync(path.join(dataPath, "config.json"))) {
    fs.writeFileSync(dataPath + "/config.json", JSON.stringify(conf_json, null, 4));
}
// Doing A ContextBrige

contextBridge.exposeInMainWorld('nodeApi', {
    getJoke() {
        console.log(__dirname)
        const { jokes } = JSON.parse(fs.readFileSync(__dirname + `/jokes.json`));
        return jokes[Math.floor(Math.random() * jokes.length)];
    },
    checkforUpdate() {
        return new Promise((resolve) => {
            const version = "0.0.1";
            const update = (async () => { await fetch(`https://dwiftejb.github.io/starfiles.json`).then(response => response.json()); })();
            if (version !== update.app_ver) {
                resolve(true)
            } else {
                resolve(false)
            }
        });
    },
    preloadIndex() {
        return new Promise((resolve) => {
            ipcRenderer.send("load-desktop");
            resolve(true);
              
        })
    }
});