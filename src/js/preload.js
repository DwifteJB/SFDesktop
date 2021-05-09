const fs = require('fs')
const path = require("path");
const { contextBridge, ipcRenderer } = require('electron')
const downloadsFolder = require('downloads-folder');
const Downloader = require('nodejs-file-downloader');

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
    gibConfigPath: () => {
        const configPath = path.join(dataPath, 'config.json')
        return `file://${configPath}`;
    },
    openUserPath(data) {
        require('child_process').exec(`start "" "${data}"`);
    },
    addKey(data) {
        const new_conf_json = {
            userData: dataPath,
            key: data
        }
        fs.writeFileSync(dataPath + "/config.json", JSON.stringify(new_conf_json, null, 4));
    },
    sendEvent(eventName) {
        ipcRenderer.send(eventName);
    },
    async userInfo() {
        const LocalUserData = await fetch("file://" + path.join(dataPath, 'config.json')).then(response => response.json())
        return LocalUserData;
    },
    
    dlFile(url, name) {
        const dlfolder = downloadsFolder();
        const downloader = new Downloader({
            url: url,
            directory: dlfolder,
            fileName: name
        });
        downloader.download().then(() => require('child_process').exec(`start "" "${dlfolder}"`));
    }
});