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
    fs.writeFileSync(dataPath + "/config.json", JSON.stringify({}, null, 4));
}
if (!fs.existsSync(path.join(dataPath, "data.json"))) {
    fs.writeFileSync(dataPath + "/data.json", JSON.stringify({}, null, 4));
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
            const version = "0.0.2";
            const update = (async () => { await fetch(`https://dwiftejb.github.io/starfiles.json`).then(response => response.json()); })();
            if (version !== update.app_ver) {
                resolve(true)
            } else {
                resolve(false)
            }
        });
    },
    preloadIndex() {
        return new Promise(async (resolve) => {
            let LocalUserData = await fetch("file://" + path.join(dataPath, 'config.json')).then(response => response.json())
            if (LocalUserData.length < 1) {
                //firsttime.html
            }
            LocalUserData.files = [];
            const userdata = await fetch("https://api.starfiles.co/2.0/users/get_details.php?profile=" + LocalUserData.key).then(response => response.json());
            const folders = await fetch(`https://api.starfiles.co/user/folders?profile=${LocalUserData.key}`).then(response => response.json());
            const files = await fetch(`https://api.starfiles.co/user/files?profile=${LocalUserData.key}`).then(response => response.json());
            // for (data of files) {
            //     const file_info = await fetch(`https://api.starfiles.co/file/fileinfo?file=${data.id}`).then(response => response.json());
            //     console.log(file_info)
            //     dataJS[data.id] = JSON.stringify(file_info, null, 4);
            // }
            LocalUserData.foldersAmount = folders.length;
            LocalUserData.filesAmount = files.length;
            LocalUserData.username = userdata["username"];
            if (userdata["avatar"].length < 1) { 
                LocalUserData.avatar = "https://cdn.starfiles.co/images/logo.png"
            } else {
                LocalUserData.avatar = userdata["avatar"]
            }
            fs.writeFile(path.join(dataPath, 'config.json'), JSON.stringify(LocalUserData, null, 4), function() {
                ipcRenderer.send("load-desktop");
                resolve(true)
            })


        })
    }
});