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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

///////////////////////

function info(str){
	console.log(str);
}

///////////////////////

var myPieP5 = new p5(sketch, 'pieChart').setPie();
//var myLineP5 = new p5(sketch, 'lineChart').setLine();
//var myAreaP5 = new p5(sketch, 'areaChart').setArea();
var myBarP5 = new p5(sketch, 'barChart').setBar();


var lines = []; //data.getLines();
data.onLoad.push(function(){
	lines=data.getLines();
	
	myPieP5.setLines(lines);
myBarP5.setLines(lines);
//myLineP5.setLines(lines);
//myAreaP5.setLines(lines);

myPieP5.setExtVName("myPieP5");
myBarP5.setExtVName("myBarP5");
//myAreaP5.setExtVName("myAreaP5");
//myLineP5.setExtVName("myLineP5");

p1Init();

document.getElementById('titulo').innerHTML=lines[0].day;
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
	if(donde==null) navigator.app.exitApp();
	else{
		donde=null;
		p1Init();
	}
}

function init(){
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function html(e, attrs, content){ // class,style,transform,
		content=content==undefined||content==null?'':content;
		var atStr='';
		if(attrs!=null)for(attr in attrs)atStr+=attr+'="'+attrs[attr]+'" ';
		return '<'+e+' '+atStr+'>'+(content.length>0?'\n\t':'')+content+'</'+e+'>\n';
	}
