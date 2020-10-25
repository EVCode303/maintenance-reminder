import electron from 'electron';
import windowStateKeeper from 'electron-window-state';
import path from 'path';
const {app, BrowserWindow} = electron;
let mainWindow, mainWindowPosition;

const createWindow = ():any => {
    mainWindowPosition = windowStateKeeper({
        defaultWidth: 900,
        defaultHeight: 750
    });

    mainWindow = new BrowserWindow({
        width: mainWindowPosition.width,
        height: mainWindowPosition.height,
        x: mainWindowPosition.x,
        y: mainWindowPosition.y,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindowPosition.manage(mainWindow);
    mainWindow.loadFile('src/index.html');
    mainWindow.once('ready-to-show', mainWindow.show);
};

app.once('ready', createWindow);