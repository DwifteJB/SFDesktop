const { app, BrowserWindow, globalShortcut, ipcMain} = require('electron')
const path = require('path')
let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
      width: 300,
      height: 400,
      icon: path.join(__dirname, 'starfiles.png'),
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'src/js/preload_preloadwhat.js'),
        contextIsolation: true,
        nodeIntegration: false,
        enableRemoteModule: false,
      }
    })

    mainWindow.setMenuBarVisibility(false)
    mainWindow.setResizable(false)
    mainWindow.setAlwaysOnTop(true)

    mainWindow.loadFile(path.join(__dirname, 'src/preload.html'))
}
ipcMain.on('load-desktop', (event,arg) => {
  let newWin
  function newwindow() {
    newWin = new BrowserWindow({
      width: 1020,
      height: 720,
      icon: path.join(__dirname, 'starfiles.png'),
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'src/js/preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        enableRemoteModule: false,
      }
    })
    newWin.setMenuBarVisibility(false)
    newWin.loadFile(path.join(__dirname, 'src/index.html'))
  }
  ipcMain.on("maximize", () => {
    newWin.isMaximized() ? newWin.unmaximize() : newWin.maximize();
  })
  ipcMain.on("close", () => {
    newWin.close();
    app.quit();
  })
  ipcMain.on("minimize", () => {
    newWin.minimize();
  })
  app.whenReady().then(() => {
    newwindow()
    
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
})
app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
