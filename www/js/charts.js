var sketch = function( p ) {
//var colors = ['blue-green','red','yellow','violet','green','purple','orange','blue'];
// https://sashat.me/2017/01/11/list-of-20-simple-distinct-colors/
//var colors = ['Red','Green','Yellow','Blue','Orange','Purple','Cyan','Magenta','Lime','Pink','Teal','Lavender','Brown','Beige','Maroon','Mint','Olive','Apricot','Navy','Grey','White','Black'];
var colors = ['Orange','Cyan','Teal','Lavender','Brown','Beige','Maroon','Mint','Olive','DarkGoldenRod','Coral','CornflowerBlue','DarkSalmon'];
var mouseAngle;
var lines=[], linesBak=[], checks=[];
var lastLinesLength=0;
var swCallAjax=true;
var swDraw=false;
var border=24;
var type={area:0, line:1, bar:2, pie:3};
var typeFilter={max:{txt:"valor mas alto", fn:data.sortAscByMax},
				min:{txt:"valor mas bajo", fn:data.sortDescByMax},
				avg:{txt:"media mas alta", fn: data.sortAscByAvg},
				cnt:{txt:"mas valores", fn:data.sortAscByCntValues},
				median:{txt:"mediana mas alta", fn:data.sortAscByMedian}};
var typeChart=type.area;
var typeFilterSelected=typeFilter.max;
var textSizeSlider, extVName;
var font, menu={}, contaminante={}, filterType={};

p.setExtVName = function(name){ extVName=name; }

p.preload = function() {
  font = p.loadFont('./assets/texgyreheros-regular.otf');
}
p.setup = function() {
  //var canva=p.createCanvas(screen.width, screen.height/4);
  p.textFont(font);
  contaminante.code=10;
  
  var canva=p.createCanvas(p.windowWidth, p.windowHeight/2.3);
  info(canva);
  //var canva=p.createCanvas(p._userNode.clientWidth, p._userNode.clientHeight);
  //canva.parent('pieChart');
  p.noStroke();
  //p.strokeWeight(1);
  //noLoop();  // Run once and stop
  //p.callAjax();
  textSizeSlider = p.createSlider(10, 72, 16);
  textSizeSlider.position(25, canva.y);
  //info(textSizeSlider);
  textSizeSlider.changed(function(){p.windowResized();});
  this.setMenu();
  canva.mousePressed(this.doOnMousePress);
}

p.getTextSize = function(){
	return textSizeSlider.value();
}

p.windowResized = function () {
  p.resizeCanvas(window.innerWidth, window.innerHeight/2.3);
  lastLinesLength=lines.length-1;
  this.setMenu();
  //info('lastLinesLength=lines.length-1'+lastLinesLength+' '+lines.length);
}

p.draw = function() {
	//info('swCallAjax='+swCallAjax+' swDraw='+swDraw+' lines='+lines.length);
	if(lastLinesLength!=lines.length){
		p.background(100);
		lastLinesLength=lines.length;
		//info('2 swCallAjax='+swCallAjax+' swDraw='+swDraw+' lines='+lines.length);
		if(lines.length>0){
			var lines2=data.removeEmptyLines(data.filterByMagnitude(contaminante.code, lines));
			//lines2=data.sortAscByMax(lines2).slice(-3);
			lines2=typeFilterSelected.fn(lines2).slice(-3);
			var magnitude=data.magnitudes[contaminante.code].name;
			var str = '3 con '+typeFilterSelected.txt;
			if     (type.pie ==typeChart) p.pieChart(magnitude, str, lines2);
			else if(type.area==typeChart) p.areaLineChart(magnitude, str, lines2, true);
			else if(type.line==typeChart) p.areaLineChart(magnitude, str, lines2, false);
			else if(type.bar ==typeChart) p.barChart(magnitude, str, lines2, false);
		}
		swDraw=false;
	}
}

p.setMenu = function(){
	menu.labels = ['Area','Linea','Barra','Tarta'];
	if(!('bounds' in menu)) menu.bounds = font.textBounds(menu.labels[2], 0, border, this.getTextSize());
	//info(p.height+'------------'+p.width);
	menu.width = p.width/3>p.height? (border*2)+menu.bounds.w : menu.bounds.w +10;
	menu.xMin=p.width-menu.width;
	menu.buttonHeight = p.height/menu.labels.length;
}
p.showMenu = function(){
	p.push();
	p.textAlign(p.CENTER, p.CENTER);
	for(var i=0; i<menu.labels.length; i++){
		p.fill(colors[colors.length-i-1]);
		p.rect(menu.xMin, i*menu.buttonHeight, menu.width, (i+1)*menu.buttonHeight);
		p.fill('white');
		p.text(menu.labels[i], menu.xMin+(p.width-menu.xMin)/2, i*menu.buttonHeight+((i+1)*menu.buttonHeight-i*menu.buttonHeight)/2);
	}
	p.pop();
}

p.doOnMousePress = function () {
	info('Detectado mouse pressed en '+typeChart);
	var resized=false;
    if(p.mouseX>menu.xMin){
		if(p.mouseY<menu.buttonHeight) p.setArea();
		else if(p.mouseY<menu.buttonHeight*2) p.setLine();
		else if(p.mouseY<menu.buttonHeight*3) p.setBar();
		else if(p.mouseY<menu.buttonHeight*4) p.setPie();
		resized=true;
	}else if(checks.length>0){
		info('valido checks '+checks.length);
		for(var i=0; i<checks.length && !resized; i++){
			info(p.mouseX+' >= '+checks[i].x0+' '+p.mouseY+' >= '+checks[i].y0+' '+p.mouseX+' >= '+checks[i].x1+' '+p.mouseY+' >= '+checks[i].y1);
			if(p.mouseIntersectWith(checks[i])){
				checks[i].selected=!checks[i].selected;
				resized=true;
			}
		}
	}
	if (!resized && p.mouseIntersectWith(contaminante)){
		resized=true;
		info('--------------');
		var str='', i=0;
		for(mag in data.magnitudes){
			if(data.filterByMagnitude(mag, lines).length>0){
				var dentro=data.magnitudes[mag].abrv+" : "+data.magnitudes[mag].name;
				//str+='<div onclick="'+extVName+'.setMagnitud(\''+mag+'\');" style="background-color:'+colors[i++]+'">'+data.magnitudes[mag].name+'</div>'
				str+=html('div',{onclick: extVName+'.setMagnitud(\''+mag+'\');', style:"background-color:DarkSalmon"},dentro);
			}
		}
		str='<div id="myDropdown" class="show">'+str+'</div>';
		
		var menuMag=document.getElementById('menu');
		menuMag.innerHTML=str;
		menuMag.style.display = 'block';
		document.getElementById('cuerpo').style.display = 'none';
	}
	if (!resized && p.mouseIntersectWith(filterType)){
		resized=true;
		var str='', i=0;
		for(idx in typeFilter){
			var tf = typeFilter[idx];
			//str+='<div onclick="'+extVName+'.setTypeFilter(\''+idx+'\');" style="background-color:'+colors[i++]+'">'+tf.txt+'</div>'
			str+=html('div',{onclick: extVName+'.setTypeFilter(\''+idx+'\');', style:"background-color:DarkSalmon"}, tf.txt);
		}
		str='<div id="myDropdown" class="show">'+str+'</div>';
		
		var menuMag=document.getElementById('menu');
		menuMag.innerHTML=str;
		menuMag.style.display = 'block';
		document.getElementById('cuerpo').style.display = 'none';
	}
	if(resized) p.windowResized();
}

p.setTypeFilter = function(code){
	typeFilterSelected=typeFilter[code];
	p.windowResized();
	document.getElementById('menu').style.display = 'none';
	document.getElementById('cuerpo').style.display = 'block';
}
p.setMagnitud = function(code){
	contaminante.code=code;
	p.windowResized();
	document.getElementById('menu').style.display = 'none';
	document.getElementById('cuerpo').style.display = 'block';
}

p.mouseIntersectWith = function(anObject){
	return p.mouseX>=anObject.x0 && p.mouseY>=anObject.y0 && p.mouseX<=anObject.x1 && p.mouseY<=anObject.y1;
}

p.setArea = function(){ typeChart=type.area; return this;}
p.setLine = function(){ typeChart=type.line; return this;}
p.setBar = function(){ typeChart=type.bar; return this;}
p.setPie = function(){ typeChart=type.pie; return this;}

p.redrawPie = function(){
	info('redraw!');
	swCallAjax=true;
}

p.createButton=function(txt, x, y, c1, c2){
	var b = font.textBounds(txt, x, y, this.getTextSize());
	var r = {x0: x, y0: y, x1: x+b.w+4, y1: y+b.h+4}; // y1 es arriba
	r.h = r.y0 - r.y1;
	r.w = r.x1 - r.x0;
	p.push();
	p.fill(c2);
	p.rect(r.x, r.y, r.w, r.h);
	p.fill(c1);
	p.text(txt, r.x+2, r.y-2);
	p.pop();
}

p.showContaminante=function(cont){
  p.textSize(this.getTextSize());
  p.fill('gray');
  var bounds = font.textBounds(cont, 10, 10, this.getTextSize());
  p.rect(10, border*1.5-bounds.h, bounds.w+10, bounds.h+8);
  contaminante.x0=10; contaminante.y0=border*1.5-bounds.h; contaminante.x1=contaminante.x0 + bounds.w+10; contaminante.y1=contaminante.y0+bounds.h+8;
  //p.text(title, 10-1, (border*2)-1); y0 es arriba e y1 es abajo
  p.fill('white');
  p.text(cont, 10+5, contaminante.y1-4); //border*1.5+4);
}

p.showFilter=function(filterTxt){ // origin [0, 0] is the coordinate in the upper left of the window
  p.push();
  p.textSize(this.getTextSize());
  p.fill('gray');
  var bounds = font.textBounds(filterTxt, 20, 20, this.getTextSize());
  //p.rect(10, contaminante.y1+bounds.h+5, bounds.w+5, contaminante.y1+5);
  filterType.x0=contaminante.x0;             filterType.y1=contaminante.y1+20+bounds.h;  // y1 es abajo
  filterType.x1=filterType.x0 + bounds.w+10; filterType.y0=filterType.y1-bounds.h-10; // y0 es arriba
  filterType.w=filterType.x1-filterType.x0;
  filterType.h=filterType.y1-filterType.y0;
  info(filterType);
  info(bounds);
  p.rect(filterType.x0, filterType.y0, filterType.w, filterType.h);
  //p.text(title, 10-1, (border*2)-1);
  p.fill('white');
  //p.textAlign(p.CENTER, p.CENTER);
  p.textAlign(p.CENTER, p.BOTTOM);
  p.text(filterTxt, filterType.x0+filterType.w/2, filterType.y1);
  //p.text(filterTxt, filterType.x0+((filterType.x1-filterType.x0)/2), filterType.y1+((filterType.y0-filterType.y1)/2));
  //this.createButton(filterTxt, 10, 20, 'white', 'gray');
  p.pop();
}

p.pieChart = function(cont, filterTxt, lines) {
  var diameter = Math.min(p.width, p.height)-border;
  if(p.height*1.6>p.width) diameter=diameter-border*3;
  var lastAngle = 0;
  var angles=p.getAngles(lines);
  this.showContaminante(cont);
  this.showFilter(filterTxt);
  this.showMenu();
  for (var i = 0; i < lines.length; i++) {
	  var lin = lines[i];
	  var estacion=data.estaciones[lin.station];
    var gray = p.map(i, 0, lines.length, 0, 255);
	//p.fill(colors[i]);
	p.fill(estacion.color);
    //fill(getColor(i, lines));
	var xy=p.pieCenter();
	// arc(x, y, weight, height, start, stop, [CHORD|PIE|OPEN])
    s=p.arc(xy.x, xy.y, diameter, diameter, lastAngle, lastAngle+p.radians(angles[i]));
	//info(s);
	var angle=lastAngle+p.radians(angles[i])/2;
	var radio_ = diameter/2;
	var x0=xy.x + radio_*p.cos(angle);
	var y0=xy.y + radio_*p.sin(angle);
	var str = estacion.name+'\r\n'+data.getZona(lin)+' - '+lin.maxHour+'h ['+(lin.maxHour==-1?0:lin.values[lin.maxHour])+(data.magnitudes[lin.magnitude].unidad)+']';
	//str=str.replace(' ','\r\n');
	p.textSize(this.getTextSize());
	if(x0<xy.x) p.textAlign(p.CENTER);
	else p.textAlign(p.LEFT);
	if(y0>xy.y) y0-=20;
	this.shadowText(str, x0-20, y0, 'white', 'black');
    lastAngle += p.radians(angles[i]);
  }
}

p.isPointInsideArc = function (){
	/* https://www.geeksforgeeks.org/check-whether-point-exists-circle-sector-not/
    Convert x, y to polar coordinates using this
    Angle = atan(y/x); Radius = sqrt(x * x + y * y);
    Then Angle must be between StartingAngle and EndingAngle, and Radius between 0 and your Radius.
*/
}

p.getColor = function(i, data){
	var fll = p.map(i, 0, data.length, 0, 255);
	var fillFocus = p.color(fll, 99, 99, 255);
	var fillNoFocus = p.color(fll, 89, 49, 189);
	return fillFocus;
}

p.pieCenter = function(){ return {x:p.width/2, y:p.height/2};}

p.getAngles = function(lines){
	// calcula el % de angulo en funcion de la suma de los maxValues
	var sum=0;
	var angles=[]
	for(i=0; i<lines.length; i++) sum+=lines[i].maxHour==-1?0:lines[i].values[lines[i].maxHour];
	for(i=0; i<lines.length; i++) angles[i]=p.map(lines[i].maxHour==-1?0:lines[i].values[lines[i].maxHour], 0,sum,0,360);
	return angles;
}

p.setLines = function(inLines){
	lines=inLines;
	//info('setLines:');
	//info(lines);
	info('recibido '+lines.length+' lines');
}

p.barChart = function(cont, filterTxt, lines){
  //info(lines);
  this.showContaminante(cont);
  this.showFilter(filterTxt);
  this.showMenu();
  var lastIdx = data.maxIdxValueWithoutValue(lines);
  var limite = data.getLimite(data.magnitudes[contaminante.code]).limite;
  var maxValue=Math.max(data.maxValue(lines), limite);
  var margin = border,
      w = p.width-menu.width - 2 * margin, // chart area width and height
      h = p.height - 2 * margin;

  var barWidth =  (w / lastIdx) * 0.8 / lines.length; // width of bar
  var barMargin = (w / lastIdx) * 0.2; // margin between two bars

  p.push();
  p.stroke('dark-gray');
  p.line(margin, h+margin, margin+w, h+margin);
  p.textSize(this.getTextSize());
  var labels=[];
  for(var idxLine=0; idxLine<lines.length; idxLine++){
	var line=lines[idxLine];
	var values = line.values.slice(0, lastIdx);
	//info('barChart con '+values.length+' values');

	var x=margin+(idxLine*barWidth), y=margin+h;
  
    p.push();
	var est = data.estaciones[lines[idxLine].station];
	//info('est:'); info(est); info(est.color);
    p.fill(est.color); //p.fill(colors[idxLine%colors.length]);
    p.noStroke();
	for(var i=0; i<lastIdx; i++) {
		if(values[i]!=-1){
			value = p.map(values[i], 0, maxValue, 0, h);
			//info(values[i]+'   '+values[line.minHour]+'   '+values[line.maxHour]+'   '+0+'   '+w);
			// rect x,y width height
			p.rect(x, y, barWidth, -value); // draw rect
			
			labels.push({txt: values[i], x: x-2, y: y-value-2});
		}
		//p.fill('#FFF');
		//p.text(i+"h", 5, barWidth/2 + 5); // write data
		x = x + (barWidth*lines.length + barMargin);
	}
	p.pop();
  }
  // Limite
  p.drawLimite(limite, maxValue, margin, w, y, margin, data.magnitudes[contaminante.code].unidad);
  // labels valores numericos
  p.noStroke();
  p.removeLabels(labels);
  for(var i=0; i<labels.length; i++) this.shadowText(labels[i].txt, labels[i].x, labels[i].y, 'white', 'black');
  // Horas
  labels=[]
  for(var i=0; i<lastIdx; i++) labels.push({txt: i+"h", x: margin+(barWidth/2)+(i*(barWidth*lines.length+barMargin)), y: p.height-2}); //+ barWidth/2 + 5});
  p.fill('#FFF'); p.noStroke();
  //p.textAlign(p.CENTER);
  p.removeLabels(labels);
  for(var i=0; i<labels.length; i++) p.text(labels[i].txt, labels[i].x, labels[i].y);
  p.pop();
}

p.drawLimite = function(limite, maxValue, margin, w, yMin, yMax, unidad){
	p.push();
	if(limite>0){
		var value = p.map(limite, 0, maxValue, yMin, yMax);
		info('limite='+limite+' maxValue='+maxValue+' entre '+yMax+'-'+yMin+'='+value);
		p.stroke('red');
		p.line(margin, value, margin+w, value);
		
		p.fill('red');
		p.noStroke();
		var str='Límite: '+limite+' '+unidad;
		if(value < yMax*1.2){
			var bounds = font.textBounds(str, margin, value, this.getTextSize());
			margin = w - bounds.w + margin;
			value+=(2+bounds.h);
		}else value=value-2;
		p.text(str, margin, value);
	}
	p.pop();
}

p.isCheckSelected = function(idx){
	return checks.length<=idx || checks[idx].selected;
}

p.areaLineChart = function(cont, filterTxt, lines, isArea){
	this.showContaminante(cont);
	this.showFilter(filterTxt);
	this.showMenu();
	var colores=isArea?colors:['yellow','red','white','LawnGreen'];
	var limite = data.getLimite(data.magnitudes[contaminante.code]).limite;
	var maxValue=Math.max(data.maxValue(lines), limite);
	var xMin=border;
	var xMax=p.width-border-menu.width;
	var yMin=p.height-(border*2);
	var yMax=border;
	var labels=[];
	// line de abajo:
	p.stroke('dark-gray');
	p.line(xMin, yMin, xMax, yMin);
	p.noStroke();

	for(var idx=0; idx<lines.length; idx++){
		if(p.isCheckSelected(idx)){
			var line=lines[idx];
			var values=[];
			var vals=data.removeLastDataWithoutValue(line.values);
			//for(var i=line.values.length-1; i>=0 && line.values[i]==-1; i--) line.values.splice(i,1); // Aqui quitamos las ultimas horas sin valor
			
			//values.splice(0);
			for(var i=0; i<vals.length; i++){
				var yValue = vals[i]==-1?yMin:p.map(vals[i], 0, maxValue /*line.values[line.maxHour]*/, yMin, yMax);
				var xValue = p.map(i, 0, vals.length-1, xMin, xMax);
				//p.vertex(xValue, yValue);
				values.push({x:xValue, y:yValue, value:vals[i], hour:i});
				
				//info(line.values[i]+'=vertex ('+xValue+', '+yValue+') en ('+p.width+', '+p.height+')');
			}

			//
			var est = data.estaciones[lines[idx].station];
			let c = p.color(est.color); //p.color(colores[idx%colores.length]);
			if(isArea) c.setAlpha(128);
			if(isArea) p.fill(c);	else {p.noFill(); p.stroke(c);}

			p.beginShape();
			p.vertex(xMin, yMin);
			for(var i=0; i<values.length; i++) p.vertex(values[i].x, values[i].y);
			p.vertex(xMax, yMin);
			if(isArea) p.endShape(p.CLOSE);	else p.endShape();
			for(var i=0; i<values.length; i++) if(values[i].value!=-1) labels.push({txt: values[i].value, x: values[i].x, y: values[i].y-1});
		}
	}
	// Limite
	p.drawLimite(limite, maxValue, xMin, xMax-xMin, yMin, yMax, data.magnitudes[contaminante.code].unidad);
	//
	p.noStroke();
	// pintamos los labels
	p.textAlign(p.CENTER);
	//p.textSize(this.getTextSize());
	//p.fill('red');
	p.removeLabels(labels);
	for(var i=0; i<labels.length; i++) this.shadowText(labels[i].txt, labels[i].x, labels[i].y, 'white', 'black');
	// Pintamos las horas
	if(!(values==undefined)){
		p.fill('white');
		var horas=[]
		for(var i=0; i<values.length; i++) horas.push({txt: i+'h', x: values[i].x, y: yMin+border-5});
		p.removeLabels(horas);
		for(var i=0; i<horas.length; i++) p.text(horas[i].txt, horas[i].x, horas[i].y);
	}
	// Pintamos los textos de las series (estaciones)
	p.textAlign(p.LEFT);
	p.noStroke();
	var x=10;
	var y=p.height-1;
	for(var idx=0; idx<lines.length; idx++){
		//var chk=checks.length>idx?checks[idx]:{};
		var est = data.estaciones[lines[idx].station];
		let c = p.color(est.color); //p.color(colores[idx%colores.length]);
		if(lines.length>1) c.setAlpha(128);
		p.fill(c);
		var txt = est.name;
		//p.rect(x,y-15, 15, 15);
		var chk = {x0:x, y0:y-15, x1:x+15, y1:y, selected: true};
		if(checks[idx]==undefined || checks[idx]==null){
			checks.push(chk);
		}else{
			checks[idx].x0=chk.x0; checks[idx].y0=chk.y0; checks[idx].x1=chk.x1; checks[idx].y1=chk.y1;
		}
		p.drawCheck(x,y-15,15,15,checks[idx].selected);
		
		x+=15+1;
		this.shadowText(txt, x, y, c, 'white');
		var bounds = font.textBounds(txt, x, y, this.getTextSize());
		checks[idx].x1 = checks[idx].x1 + bounds.w;
		//checks.push(chk);
		//info('bounds '+txt+'='+bounds.w);
		x+=bounds.w+15;
		//info('serie: '+txt+': '+x+', '+y);
	}
	//
}

p.drawCheck = function(x, y, width, height, selected){
	p.rect(x,y, width, height);
	if(selected){
		p.push();
		p.stroke(60);
		p.color('red');
		p.line(x,y+height,x+width,y);
		p.line(x,y,x+width,y+height);
		p.pop();
	}
}

p.shadowText = function(txt, x, y, color, shadow){
	p.push();
	p.fill(shadow);
	p.text(txt, x-1, y-1);
	p.fill(color);
	p.text(txt, x, y);
	p.pop();
}

p.removeLabels = function(labels){
	var bor=border+(this.getTextSize()-16)+4;
	for(var i=0; i<labels.length; i++){
		var l1 = labels[i];
		for(var j=labels.length-1; j>i; j--){
			var l2=labels[j];
			if(l2.x-bor <= l1.x && l2.x+bor >=l1.x && l2.y-bor <= l1.y && l2.y+bor >=l1.y) labels.splice(j,1);
		}
	}
}

}

//var myp5 = new p5(sketch, document.getElementById('pieChart'));
