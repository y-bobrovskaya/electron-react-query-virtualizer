// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    open: (url) => ipcRenderer.send('shell:open', url),
    notify: () => ipcRenderer.send('data-loaded'),
})
