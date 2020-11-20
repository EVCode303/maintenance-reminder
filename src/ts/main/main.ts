import electron from 'electron';
import windowStateKeeper from 'electron-window-state';
import { Database } from './database';
const {app, BrowserWindow} = electron;
let mainWindow, mainWindowPosition;

const createWindow = ():any => {
    mainWindowPosition = windowStateKeeper({
        defaultWidth: 1150,
        defaultHeight: 750
    });

    mainWindow = new BrowserWindow({
        width: mainWindowPosition.width,
        height: mainWindowPosition.height,
        x: mainWindowPosition.x,
        y: mainWindowPosition.y,
        minWidth: 800,
        minHeight: 600,
        maxWidth: 1250,
        maxHeight: 900,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindowPosition.manage(mainWindow);
    mainWindow.loadFile('src/index.html');
    mainWindow.setMenu(null);
    mainWindow.once('ready-to-show', mainWindow.show);
};

app.once('ready', createWindow);