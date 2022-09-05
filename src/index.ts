// Modules to control application life and create native browser window
import { is, setContentSecurityPolicy } from 'electron-util';
import install, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

const {app, BrowserWindow, ipcMain, dialog, shell, Notification } = require('electron')
const path = require('path')

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

function showNotification () {
  new Notification({ title: 'Data has been loaded', body: 'Now you can see all the releases found from the source' }).show()
}

setContentSecurityPolicy(`default-src 'self' http://localhost:3003 https://api.discogs.com; img-src * data: file:; frame-src *; connect-src 'self' http://localhost:3003 https://api.discogs.com; style-src 'unsafe-inline';`);

async function createWindow () {
  if (is.development) {
    await install([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
  }

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 510,
    minWidth: 510,
    height: 500,
    minHeight: 500,
    icon: './assets/favicon.ico',
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win?.setTitle(title)
  })

  ipcMain.on('data-loaded', (event) => {
    showNotification();
  });

  // Handle window controls via IPC
  ipcMain.on('shell:open', (event, url) => {
    shell.openExternal(url);
  })

  // const menu = new Menu();
  // menu.append(new MenuItem({
  //   label: 'Custom menu',
  //   submenu: [{
  //     role: 'help',
  //     accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
  //     click: () => { console.log('Electron rocks!') }
  //   }]
  // }))
  //
  // Menu.setApplicationMenu(menu)
}

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // not working in Windows
  app.on('open-url', (event, url) => {
    dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// todo node server code here
require('./../srv/index');
require('./../srv/musicRouter');
