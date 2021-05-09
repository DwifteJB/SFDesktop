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
  const newWin = new BrowserWindow({
    width: 1020,
    height: 720,
    icon: path.join(__dirname, 'starfiles.png'),

    webPreferences: {
      preload: path.join(__dirname, 'src/js/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
    }
  })

  newWin.setMenuBarVisibility(false)


  newWin.loadFile(path.join(__dirname, 'src/index.html'))
}) 
app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    globalShortcut.register('Alt+Shift+C', () => {
        mainWindow.webContents.openDevTools()
        // console.warn('Pasting Code in this console has an 69/10 chance of being scammed!');
    })
    globalShortcut.register('Alt+Cmd+C', () => {
        mainWindow.webContents.openDevTools()
        // console.warn('Pasting Code in this console has an 69/10 chance of being scammed!');
    })
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

