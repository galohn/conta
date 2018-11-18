// Wait for device API libraries to load
//
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
//
function onDeviceReady() {
    // Register the event listener
    //document.addEventListener("backbutton", onBackKeyDown, false);
	init();
	p1Init();
}

// Handle the back button
//
function onBackKeyDown() {
}

function start(){
}