const electron=require('electron');
//BrowserWindow will create a new browser window 
const { app, BrowserWindow}=electron;
var path = require('path')
// event when it is ready
//Interacting with app object

app.on('ready',()=>{
	const mainWindow=new BrowserWindow({
	width: 1000,
	height: 600,
	backgroundColor: '#312450',
	// show: false,
   	icon: path.join(__dirname, 'icon.png')
	}); 
	//This will create a new broswer window
	mainWindow.loadURL(`file://${__dirname}/mainpage.html`); //This will load a URL 
	mainWindow.once("read-to-show",()=>{mainWindow.show() })
});
