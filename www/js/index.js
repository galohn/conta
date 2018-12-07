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
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		var zona = document.getElementById('p1');
		var hammer = new Hammer(zona);

		hammer.on('swipe', function(ev){
			if(ev.type=='swipe'){
				if(ev.direction==2){goToP1Der();} // mov a la izquierda
				if(ev.direction==4){showP1();}//zona.className='swipe-derecha';
			}
		});
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		//document.removeEventListener('deviceready', onDeviceReady, false);
		init();
		info("Set AdMobAds options:");
		info(!!admob);
		info(window.admob);
		info(admob);
		info("puglins:");
		info(window.plugins);
		info("puglins de admob:");
		info(window.plugins.AdMob);
		info(window.plugins.admob);
		info("admob setOptions:");
		admob.setOptions({
			publisherId:          "ca-app-pub-9862323093910331~8860637734"  // Required ca-app-pub-9862323093910331/8933871494
			//interstitialAdId:     "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII",  // Optional
			//tappxIdiOS:           "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
			//tappxIdAndroid:       "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
			//tappxShare:           0.5                                        // Optional
			,bannerAtTop: false
			,overlap: false
			,isTesting: true
		});
		info("creando banner:");
		admob.createBannerView();
		info('banner puesto');
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		info('Received Event: ' + id);
	}
};

///////////////////////

function info(str){
	console.log(str);
}

///////////////////////

var myPieP5 = new p5(sketch, 'pieChart').setPie();
var myBarP5 = new p5(sketch, 'barChart').setBar();


var lines = []; //data.getLines();
data.onLoad.push(function(){
	lines=data.getLines();

	myPieP5.setAddBoton(function(){
		document.getElementById('barChart').style.display='block';
		myPieP5.setVisibleAddBoton(false);
		myPieP5.setDoubleSize(false);
	});
	myBarP5.setCloseBoton(function(){
		document.getElementById('barChart').style.display='none';
		myPieP5.setVisibleAddBoton(true);
		myPieP5.setDoubleSize(true);
	});
	myPieP5.setLines(lines);
	myBarP5.setLines(lines);

	myPieP5.setExtVName("myPieP5");
	myBarP5.setExtVName("myBarP5");

	p1Init();

	var fecha=lines[0].day;
	var anio=parseInt(fecha.substring(0,4));
	var mes=parseInt(fecha.substring(4,6))-1;
	var dia=parseInt(fecha.substring(6));
	var myDate=new Date(anio, mes, dia);
	const dayNames=["dom","lun","mar","mié","jue","vie","sáb"];
	const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
	//var titulo="Datos del "+dia+"-"+monthNames[mes]+"-"+anio;
	var titulo=dayNames[myDate.getDay()]+" "+dia+" "+monthNames[mes]+"<br />hasta las "+data.maxIdxValueWithoutValue(lines)+"h";
	document.getElementById('titulo').innerHTML=html('span',{style:"text-transform:none;"},titulo);

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
	else if(document.getElementById('p1Der').style.display == 'block') showP1();
	else if(document.getElementById('p1').style.display == 'block') navigator.app.exitApp();
	else showP1(); // contaminantes o p2
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
