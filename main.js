const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'tasks.json');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadURL('http://localhost:3000');
  mainWindow.webContents.openDevTools();

  // Remove the default menu
  //Menu.setApplicationMenu(null);
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Task loading
// You can find these functions in App.js
  ipcMain.handle('load-tasks', () => {
    if (fs.existsSync(filePath)) {
      const tasks = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(tasks);
    }
    return null;
  });
  
  ipcMain.handle('save-tasks', (event, tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks));
  });