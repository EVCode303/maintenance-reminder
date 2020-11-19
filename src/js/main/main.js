"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = __importDefault(require("electron"));
var electron_window_state_1 = __importDefault(require("electron-window-state"));
var app = electron_1.default.app, BrowserWindow = electron_1.default.BrowserWindow;
var mainWindow, mainWindowPosition;
var createWindow = function () {
    mainWindowPosition = electron_window_state_1.default({
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
    mainWindow.once('ready-to-show', mainWindow.show);
};
app.once('ready', createWindow);
