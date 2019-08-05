/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function() {
		p1Init();
		var isAndroid = (/(android)/i.test(navigator.userAgent));
		info("isAndroid="+isAndroid);
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		if ((/(ipad|iphone|ipod|android)/i.test(navigator.userAgent))) {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		} else {
			app.onDeviceReady();
		}
		app.hammerZona('p1Izq',showP0,p1Clicked);
		app.hammerZona('cuerpo',showP1,contaminantesClicked);
		app.hammerZona('contaminantes',p1Clicked,goToP1Der);
		app.hammerZona('p1Der',contaminantesClicked,showP0);
		
		app.detectZoom('pieChart', myPieP5);
		app.detectZoom('barChart', myBarP5);
		info('hammer setted');
	},
	hammerZona : function(nombre, fIzq, fDer){
		var zona = document.getElementById(nombre);
		var hammer = new Hammer(zona);

		hammer.on('swipe', function(ev){
			if(ev.type=='swipe'){
				if(ev.direction==2){fDer();} // mov a la izquierda
				if(ev.direction==4){fIzq();}//zona.className='swipe-derecha';
			}
		});
	},
	detectZoom : function(elementId, chartElement){
		var zona=new Hammer(document.getElementById(elementId));
		zona.get('pinch').set({ enable: true });
		zona.on('pinch', function(ev){
			info('jjjjj '+ev.scale);
			if(new Date().getTime()-app.lastPinch.time > 90){
				var value=chartElement.getTextSize();
				var newValue=ev.scale>1?value+1:value-1;
				newValue=Math.min(28,Math.max(6,newValue));
				info(value+" ==> "+newValue);
				chartElement.setTextSize(newValue); ///app.lastPinch.value)));
				app.lastPinch.time = new Date().getTime();
				app.lastPinch.value=ev.scale;
			}
		});
	},
	lastPinch:{time: new Date().getTime(), value:16},
	// Bind Event Listeners
	bindAdEvents: function () {
		if (window.admob) {
			//document.addEventListener("orientationchange", this.onOrientationChange, false);
			document.addEventListener(admob.events.onAdLoaded, this.onAdLoaded, false);
			document.addEventListener(admob.events.onAdFailedToLoad, this.onAdFailedToLoad, false);
			document.addEventListener(admob.events.onAdOpened, function (e) { }, false);
			document.addEventListener(admob.events.onAdClosed, function (e) { }, false);
			document.addEventListener(admob.events.onAdLeftApplication, function (e) { }, false);
			document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) { }, false);
		} else {
			info('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
		}
	},
	onAdLoaded: function (e) {
		app.showProgress(false);
		if (window.admob && e.adType === window.admob.AD_TYPE.INTERSTITIAL) {
			if (app.autoShowInterstitial) {
				window.admob.showInterstitialAd();
			} else {
				info("Interstitial is available. Click on 'Show Interstitial' to show it.");
			}
		}
	},
	onAdFailedToLoad: function (e) {
		app.showProgress(false);
		info("Could not load ad: " + JSON.stringify(e));
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	removeOnDeviceReady: function(){
		info("limpio ondeviceready:");
		try{
			document.removeEventListener('deviceready', app.onDeviceReady);
		}catch(err){
			info('Error: '+err.message);
		}
		info("limpiado ondeviceready.");
	},
	onDeviceReady: function() {
		app.removeOnDeviceReady();
		init();
		info("Set AdMobAds options:");
		//info(!!admob);
		if(typeof admob == 'undefined'){ info('admob is undefined') }else info('admob is OK');
		if(typeof AdMob == 'undefined'){ info('AdMob is undefined') }else info('AdMob is OK');
		if(typeof window.admob == 'undefined'){ info('admob is undefined') }else info('admob is OK'); // -------- este 
		if(typeof window.AdMob == 'undefined'){ info('AdMob is undefined') }else info('AdMob is OK');
		if(typeof document.admob == 'undefined'){ info('admob is undefined') }else info('admob is OK');
		if(typeof document.AdMob == 'undefined'){ info('AdMob is undefined') }else info('AdMob is OK');
		if(window.plugins){
			info("plugins: "+JSON.stringify(window.plugins));
			//info(window.plugins.AdMob);
			//info(window.plugins.admob);
		}
		window.setInterval(recurrente, 5*60*1000); // x5Minuto
		if(window.admob){
			app.bindAdEvents();
			info(admob);
			info("admob setOptions:");
			admob.setOptions({
				publisherId:          "ca-app-pub-9862323093910331~8860637734"  // Required ca-app-pub-9862323093910331/8933871494
				//interstitialAdId:     "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII",  // Optional
				//tappxIdiOS:           "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
				//tappxIdAndroid:       "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
				//tappxShare:           0.5                                        // Optional
				,bannerAtTop: false // set to true, to put banner at top
				,overlap: false // set to true, to allow banner overlap webview
				,isTesting: false // receiving test ads (do not test with real ads as your account will be banned)
				,autoShowBanner: true // auto show banners ad when loaded
			});
			info("creando banner:");
			admob.createBannerView(function (){}, function (e) {
				info(JSON.stringify(e));
			});
			info('banner puesto');
		}else{info("ADMOB IS NOT DEFINED");}
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		/*var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');*/

		info('Received Event: ' + id);
	}
};

function recurrente(){
	info("recurrente admob="+window.admob+".");
	data.getLines();
}

///////////////////////

function info(str){
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log(time + " " + str);
}
function debug(str){
	//console.log(str);
}

///////////////////////

var myPieP5 = new p5(sketch, 'pieChart').setPie();
var myBarP5 = new p5(sketch, 'barChart').setBar();


// var lines = []; //data.getLines();
data.onLoad.push(function(){
	// lines=data.getLines();

	myPieP5.setAddBoton(function(){
		document.getElementById('barChart').style.display='block';
		myPieP5.setVisibleAddBoton(false);
		myPieP5.setDoubleSize(false);
	});
	var closeBAction=function(){
		document.getElementById('barChart').style.display='none';
		myPieP5.setVisibleAddBoton(true);
		myPieP5.setDoubleSize(true);
	};
	myBarP5.setCloseBoton(closeBAction);
	myPieP5.setLines(data.lines);
	myBarP5.setLines(data.lines);

	myPieP5.setExtVName("myPieP5");
	myBarP5.setExtVName("myBarP5");

	p1Init();
	
	closeBAction();
});

data.getLines();


function Serie(line){
	this.station = 1;
}

function Chart(title){
	this.title = title;
	this.series=[];
	this.setLines = function(lines){
		if(lines!=null) for(line in lines) series.push(new Serie(line));
	}
}

var donde=null;
function onBackKeyDown(){
	/*if(donde==null) navigator.app.exitApp();
	else{
		donde=null;
		p1Init();
	}*/
	info('onBackKeyDown');
	if(document.getElementById('menu').style.display == 'block') p1Clicked();
	else if(document.getElementById('p1').style.display == 'block') showP0();
	else if(document.getElementById('p0').style.display == 'block') navigator.app.exitApp();
	else showP0(); // contaminantes o p2
}

function init(){
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function html(e, attrs, content){ // class,style,transform,
		content=content==undefined||content==null?'':content;
		var atStr='';
		if(attrs!=null)
			for(attr in attrs)
				//if(attr!=null&&attr.length>2)
					atStr+=attr+'="'+attrs[attr]+'" ';
		return '<'+e+' '+atStr+'>'+(content.length>0?'\n\t':'')+content+'</'+e+'>\n';
	}

// Initialize Leadbolt Event Listeners
document.addEventListener('onModuleLoaded', function(e) {
	// Ad loaded successfully
	// Add code here to pause game and/or all media including audio
	info("onModuleLoaded: "+JSON.stringify(e));
});
document.addEventListener('onModuleLoad', function(e) {
	// Ad loaded successfully
	// Add code here to pause game and/or all media including audio
	info("onModuleLoad: "+JSON.stringify(e));
});
document.addEventListener('onModuleFailed', function(e) {
	if(e.cached) {
		info("onModuleFailed Fallo cache: "+JSON.stringify(e));
	} else {
		info("onModuleFailed Fallo display: "+JSON.stringify(e));
	}
});