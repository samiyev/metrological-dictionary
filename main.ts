import {app, BrowserWindow, screen} from 'electron';
import * as path from 'path';
import * as FS from 'fs';
import * as datastore from 'nedb-promise';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

if (serve) require('electron-reload')(__dirname, {});

const DB =  {
  words:"",

  async init() {
    const database = path.join(__dirname + "/assets/db/dictionary.json");
    const native_dir = app.getAppPath();
    const db_dir = path.join(native_dir, "db");
    const collection = path.join(db_dir, "dictionary.json");

    if (!FS.existsSync(db_dir)) FS.mkdirSync(db_dir, 0o777);
    FS.writeFileSync(collection, FS.readFileSync(database), {mode: 0o777});

    this.words = datastore({filename: collection, autoload: true});

    console.log(await this.words.findOne({}));
    // this.queries.ensureIndex({ fieldName: ''});
    return this;
  }
};

async function createWindow() {
  win = new BrowserWindow({
    width: 950,
    height: 665,
    modal: true,
    center: true,
    hasShadow: true,
    resizable: false,
    // alwaysOnTop: true,
    autoHideMenuBar: true,
    fullscreenable: false,
    thickFrame: false,
    frame: false,
    transparent: true
  });

  win.loadURL('file://' + __dirname + '/index.html');
  if (serve) win.webContents.openDevTools();
  win.on('closed', () => win = null);

  global['DB'] = await DB.init();
}

try {
  app.on('ready', createWindow);
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (win === null) createWindow();
  });
}
catch (e) {

}


