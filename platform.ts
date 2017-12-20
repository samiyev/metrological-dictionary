import * as Electron from 'electron';

export class Window {
  private screen: Electron.Screen;
  private native: Electron.BrowserWindow;
  private options: Electron.BrowserWindowConstructorOptions;

  constructor(options: Electron.BrowserWindowConstructorOptions) {
    this.options = options;
  }

  create() {
    this.screen = Electron.screen;
    const args = process.argv.slice(1);
    const serve = args.some(val => val === '--serve');
    this.native = new Electron.BrowserWindow(this.options);

    if (serve) {
      require('electron-reload')(__dirname, {});
      this.native.webContents.openDevTools();
    }

    this.native.loadURL('file://' + __dirname + '/index.html');
    this.native.on('closed', () => this.native = null);
    return this;
  }
}

export class App {
  private native: Electron.App;
  private windows: Array<Window>;
  private createdWindows: Array<Window> = [];

  constructor(windows: Array<Window>) {
    this.native = Electron.app;
    this.windows = windows;
    this.onInit();
  }

  onInit() {
    try {
      this.native.on('ready', this.onCreateWindows.bind(this));
      this.native.on('activate', this.onFludAndCreate.bind(this));
      this.native.on('window-all-closed', this.onQuit.bind(this));
    }
    catch (error){
      console.log(error);
    }
  }

  onQuit() {
    if (process.platform !== 'darwin') this.native.quit();
  }

  onCreateWindows() {
    this.windows.forEach(window => {
      this.createdWindows.push(window.create());
    });
  }

  onFludAndCreate() {
    this.createdWindows.forEach(window => {
      if (!window) {
        const indx = this.windows.indexOf(window);
        window = this.windows[indx].create();
      }
    });
  }
}
