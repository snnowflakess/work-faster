const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL("http://localhost:3000"); // your React app
};

app.whenReady().then(createWindow);
