const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

const DEVELOPER = 1;

let mainWindow;
let secondWindow;
let thirdWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file',
        slashes: true
    }));

    mainWindow.on('closed', function(){
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function Second(){
    secondWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Second Window'
    });
    secondWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'secondWindow.html'),
        protocol:'file',
        slashes: true
    }));
    secondWindow.on('close', function(){
        secondWindow = null;
    });
}

function Third(){
    
}

const mainMenuTemplate = [
    {
        label:'Events',
        submenu: [
            {
                label: 'Second',
                click(){
                    Second();
                }
            },
            {
                label: 'Third',
                click(){
                    Third();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwain' ? 'Command+Q' :
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

if (process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

if (DEVELOPER !== 0){
    mainMenuTemplate.push({
        label: 'Dev Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwain' ? 'Command+I' :
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}