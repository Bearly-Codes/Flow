const { contextBridge, ipcRenderer } = require('electron');

console.log("Preload started");

contextBridge.exposeInMainWorld('electron', {
    saveTasks: (data) => ipcRenderer.invoke('save-tasks', data),
    loadTasks: () => ipcRenderer.invoke('load-tasks'),
});

console.log("Preload finished");