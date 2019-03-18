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
var typeFilter={max:{txt:"valor máximo", fn:[data.sortAscByMax,data.sortDescByMax]},
				min:{txt:"valor mínimo", fn:[data.sortAscByMin,data.sortDescByMin]},
				avg:{txt:"media", fn:[data.sortAscByAvg,data.sortDescByAvg]},
//				cnt:{txt:"nº mediciones", fn:[data.sortAscByCntValues,data.sortDescByCntValues]},
				median:{txt:"mediana", fn:[data.sortAscByMedian,data.sortDescByMedian]}};
var typeChart=type.area;
var typeFilterSelected={tf: typeFilter.max, idxFn:0, cnt:3, zones:["M-30","NE","NO","SE","SO"]};
var textSizeSlider={value:16, max:32, min:5}, extVName;
var font, menu={}, contaminante={}, filterType={}, botonClose={}, botonSuma={visible:false}, doubleSize=false;
var azul='#008CBA';

p.setExtVName = function(name){ extVName=name; }

p.preload = function() {
  font = p.loadFont('./assets/texgyreheros-regular.otf');
}
p.setup = function() {
  //var canva=p.createCanvas(screen.width, screen.height/4);
  p.textFont(font);
  contaminante.code=10;
  
  var canva=p.createCanvas(p.windowWidth, p.windowHeight);
  debug(canva);
  //var canva=p.createCanvas(p._userNode.clientWidth, p._userNode.clientHeight);
  //canva.parent('pieChart');
  p.noStroke();
  //p.strokeWeight(1);
  //noLoop();  // Run once and stop
  //p.callAjax();
  this.setMenu();
  canva.mousePressed(this.doOnMousePress);
  p.windowResized();
}

p.setTextSize = function (newValue){
	textSizeSlider.value=newValue; //textSizeSlider.value*scale;
	p.windowResized();
}
p.getTextSize = function(){
	return textSizeSlider.value;
}

p.windowResized = function () {
  p.resizeCanvas(window.innerWidth, (window.innerHeight/2.2)*(doubleSize?2:1));
  lastLinesLength=lines.length-1;
  this.setMenu();
  //info('lastLinesLength=lines.length-1'+lastLinesLength+' '+lines.length);
}
p.setDoubleSize=function(sw){
	doubleSize=sw;
	p.windowResized();
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
			lines2=data.filterByZones(p.getZoneNames(),lines2);
			lines2=typeFilterSelected.tf.fn[typeFilterSelected.idxFn](lines2).slice(-1*typeFilterSelected.cnt);
			if (data.magnitudes[contaminante.code] !== undefined){
				var magnitude=data.magnitudes[contaminante.code].name;
				var str = typeFilterSelected.tf.txt+' '+(typeFilterSelected.idxFn==0?"mas alto":"mas bajo"); // typeFilterSelected.cnt+' con '+
				if     (type.pie ==typeChart) p.pieChart(magnitude, str, lines2);
				else if(type.area==typeChart) p.areaLineChart(magnitude, str, lines2, true);
				else if(type.line==typeChart) p.areaLineChart(magnitude, str, lines2, false);
				else if(type.bar ==typeChart) p.barChart(magnitude, str, lines2, false);
			}
		}
		swDraw=false;
	}
}

p.setMenu = function(){
	menu.labels = ['Area','Linea','Barra','Tarta'];
	if(!('bounds' in menu)) menu.bounds = font.textBounds(menu.labels[2], 0, border, this.getTextSize());
	//info(p.height+'------------'+p.width);
	var h = p.height-contaminante.y1;
	menu.y0=contaminante.y1;
	menu.width = p.width/3>h? (border*2)+menu.bounds.w : menu.bounds.w +10;
	menu.xMin=p.width-menu.width;
	
	menu.gap=h*(8/100);
	menu.gaps=menu.gap*(menu.labels.length+1);
	menu.buttonHeight = (h - menu.gaps) / menu.labels.length;
}
p.showMenu = function(){
	p.push();
	p.textAlign(p.CENTER, p.CENTER);
	for(var i=0; i<menu.labels.length; i++){
		p.fill(azul);
		p.rect(menu.xMin, menu.y0+i*menu.buttonHeight+(menu.gap*(i+1)), menu.width, menu.buttonHeight, 7);
		p.fill('white');
		p.text(menu.labels[i], menu.xMin+(p.width-menu.xMin)/2, menu.y0+i*menu.buttonHeight+((i+1)*menu.buttonHeight-i*menu.buttonHeight)/2+(menu.gap*(i+1)));
	}
	p.pop();
}
p.seleccionaZonaPanel = function(){
	var lis="";
	for(idx in zones){
		var z=zones[idx];
		lis+=html('li', {"class":"tg-list-item"},
				html('span', {"class":"tgl-title"}, z.abrv)+
				html('input',{"class":"tgl tgl-skewed", id:"cb"+z.abrv, type:"checkbox"})+
				html('label',{"class":"tgl-btn", "data-tg-off":"Off", "data-tg-on":"On", "for":"cb"+z.abrv})
			);
	}
	var ul=table({style:"margin:15px 0px;"},tr({width:"100%"}, td({style:"font-size:0.65em;"+backColor('lightgray')},"Zo<br />nas:")+td({width:"100%"}, html('ul',{"class":"tg-list"}, lis))));
	return ul;
}
p.seleccionaZona = function(){
	for(idx in zones){
		var z=zones[idx];
		document.getElementById("cb"+z.abrv).checked = typeFilterSelected.zones.indexOf(z.abrv)>=0;
	}
}
p.setZoneClicked = function(zoneAbrv){
	typeFilterSelected.zones=[zoneAbrv];
	p.windowResized();
}
p.getZoneNames = function(){
	var names=[];
	for(var i in typeFilterSelected.zones) names.push(zoneName(typeFilterSelected.zones[i]));
	return names;
}
p.guardaZona = function(){
	typeFilterSelected.zones.splice(0,typeFilterSelected.zones.length);
	for(idx in zones){
		var z=zones[idx];
		if(document.getElementById("cb"+z.abrv).checked) typeFilterSelected.zones.push(z.abrv);
	}
}
p.isMenuPressed = function(n){
	return p.mouseY > menu.y0+menu.buttonHeight*(n-1)+menu.gap*n && p.mouseY<menu.y0+menu.buttonHeight*(n)+menu.gap*(n);
}

p.doOnMousePress = function () {
	debug('Detectado mouse pressed en '+typeChart);
	var resized=false;
    if(p.mouseX>menu.xMin){
		if(p.isMenuPressed(1)) p.setArea();
		else if(p.isMenuPressed(2)) p.setLine();
		else if(p.isMenuPressed(3)) p.setBar();
		else if(p.isMenuPressed(4)) p.setPie();
		resized=true;
	}else if(checks.length>0){
		debug('valido checks '+checks.length);
		for(var i=0; i<checks.length && !resized; i++){
			debug(p.mouseX+' >= '+checks[i].x0+' '+p.mouseY+' >= '+checks[i].y0+' '+p.mouseX+' >= '+checks[i].x1+' '+p.mouseY+' >= '+checks[i].y1);
			if(p.mouseIntersectWith(checks[i])){
				checks[i].selected=!checks[i].selected;
				resized=true;
			}
		}
	}
	if (!resized && p.mouseIntersectWith(contaminante)){
		resized=true;
		debug('--------------');
		var str='', i=0;
		for(mag in data.magnitudes){
			ids.mag.push(mag.abrv);
			var colorMag=getMagnitudeColor(data.magnitudes[mag]);
			var estilo=colorOverMag[colorMag];
			if(data.filterByMagnitude(mag, lines).length>0){
				var dentro=data.magnitudes[mag].abrv+" : "+data.magnitudes[mag].name;
				//str+='<div onclick="'+extVName+'.setMagnitud(\''+mag+'\');" style="background-color:'+colors[i++]+'">'+data.magnitudes[mag].name+'</div>'
				//str+=html('div',{onclick: extVName+'.setMagnitud(\''+mag+'\');', style:"background-color:DarkSalmon"},dentro);
				str+=div({onclick: extVName+'.setMagnitud(\''+mag+'\');', "class":"mini-boton",style:estilo.style},dentro);
			}
		}
		str=div({id:"myDropdown",'class':"show"},str);
		
		var menuMag=document.getElementById('menu');
		menuMag.innerHTML=str;
		menuMag.style.display = 'block';
		document.getElementById('cuerpo').style.display = 'none';
	}
	if (!resized && p.mouseIntersectWith(filterType)){
		resized=true;
		var trs='';
		for(var attr in typeFilter){
			var tf = typeFilter[attr];
			//str+='<div onclick="'+extVName+'.setTypeFilter(\''+idx+'\');" style="background-color:'+colors[i++]+'">'+tf.txt+'</div>'
			//str+=html('div',{onclick: extVName+'.setTypeFilter(\''+idx+'\');', style:"background-color:DarkSalmon"}, tf.txt);
			trs+=tr({style:"text-transform:capitalize;font-size:.9em;height:2.2em"},
					td({style:backColor('GoldenRod')}, tf.txt)+ // MediumSeaGreen
					td(p.attrsTypeFilter(attr, 0), 'Mayor')+
					td(p.attrsTypeFilter(attr, 1), 'Menor')
				);
		}
		var tds=""
		for(var i=0; i<6; i++) tds+=td(p.attrsCnt(i+1),i+1);
		var str=table({width:"100%"},tr(td({colspan:3,style:"font-size:0.75em;"},"Selecciona función:"))+trs)+
			p.seleccionaZonaPanel()+
			table({width:"100%"},tr(td({width:"10%",style:"font-size:0.75em;"+backColor('lightgray')},'nº de<br />valores:')+tds))+
		    div({onclick:extVName+".setTypeFilter()","class":"mini-boton",style:textAlign(Center)+";font-size:.9em"},"Hecho!");
		str=div({id:"myDropdown",'class':"show"},div(str));
		
		var menuMag=document.getElementById('menu');
		menuMag.innerHTML=str;
		menuMag.style.display = 'block';
		document.getElementById('cuerpo').style.display = 'none';
		p.seleccionaZona();
	}
	debug(botonClose);
	if (!resized && p.mouseIntersectWith(botonClose.rect)){
		debug('boton close');
		if('fn' in botonClose) botonClose.fn();
	}
	if (!resized && p.mouseIntersectWith(botonSuma.rect)){
		debug('boton suma');
		if('fn' in botonSuma) botonSuma.fn();
	}
	if(resized) p.windowResized();
}
p.attrsTypeFilter=function(keyName, zeroOrOne){
	var myClass=typeFilterSelected.tf==typeFilter[keyName]&&typeFilterSelected.idxFn==zeroOrOne?"mini-boton-selected":"mini-boton";
	return {id:"tf"+keyName+zeroOrOne, "class":myClass, onclick: extVName+'.setTypeFilterFn(\''+keyName+'\','+zeroOrOne+');'}
}
p.attrsCnt=function(i){
	var myClass=typeFilterSelected.cnt==i?"mini-boton-selected":"mini-boton";
	return {id:'cnt'+i,"class":myClass,style:textAlign(Center),onclick:extVName+'.setCnt('+i+')'};
}
p.setCnt = function(cnt){
	var ids=['cnt1','cnt2','cnt3','cnt4','cnt5','cnt6'];
	cambiaTodos(ids,'',"mini-boton-selected","mini-boton");
	toggle(document.getElementById('cnt'+cnt), "mini-boton", "mini-boton-selected");
	typeFilterSelected.cnt=cnt;
}
p.setTypeFilterFn = function(code,idx){
	debug('setTypeFilter code='+code+" idx="+idx);
	typeFilterSelected.tf=typeFilter[code];
	typeFilterSelected.idxFn=idx;
	//
	var ids=[];
	for(var attr in typeFilter) for(var i in [0,1]) ids.push("tf"+attr+i);
	cambiaTodos(ids,'',"mini-boton-selected","mini-boton");
	toggle(document.getElementById("tf"+code+idx), "mini-boton", "mini-boton-selected");
}
p.setTypeFilter = function(){
	p.windowResized();
	p.guardaZona();
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
	return (!!anObject) && ('x0' in anObject) && p.mouseX>=anObject.x0 && p.mouseY>=anObject.y0 && p.mouseX<=anObject.x1 && p.mouseY<=anObject.y1;
}

p.setArea = function(){ typeChart=type.area; return this;}
p.setLine = function(){ typeChart=type.line; return this;}
p.setBar = function(){ typeChart=type.bar; return this;}
p.setPie = function(){ typeChart=type.pie; return this;}

p.redrawPie = function(){
	debug('redraw!');
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
  p.fill(azul);
  var bounds = font.textBounds(cont, 10, 10, this.getTextSize());
  p.rect(10, border-bounds.h, bounds.w+10, bounds.h+8, 7);
  contaminante.x0=10; contaminante.y0=border-bounds.h; contaminante.x1=contaminante.x0 + bounds.w+10; contaminante.y1=contaminante.y0+bounds.h+8;
  //p.text(title, 10-1, (border*2)-1); y0 es arriba e y1 es abajo
  p.fill('white');
  p.text(cont, 15, contaminante.y1-4); //border*1.5+4);
}

p.setAddBoton=function(fn){
	botonSuma.fn=fn;
}
p.setVisibleAddBoton=function(sw){
	botonSuma.visible=sw;
}
p.setCloseBoton=function(fn){
	botonClose.fn=fn;
}
p.showClose=function(){
	if('fn' in botonClose){
		p.push();
		var pad=10, size=17, x0=p.width-menu.width-pad-size, y0=contaminante.y1+pad;
		p.fill(azul);
		p.rect(x0, y0, size, size);
		p.stroke('white');
		p.line(x0, y0,      x0+size, y0+size);
		p.line(x0, y0+size, x0+size, y0);
		botonClose.rect={x0:x0, y0:y0, x1:x0+size, y1: y0+size};
		p.pop();
	}
}

p.showBotonSuma=function(){
	if('fn' in botonSuma && botonSuma.visible){
		p.push();
		var pad=10, size=17, x0=p.width-menu.width-pad-size, y0=p.height-pad*3-size;
		p.fill(azul);
		p.rect(x0, y0, size, size);
		p.stroke('white');
		p.line(x0, y0+size/2, x0+size, y0+size/2);
		p.line(x0+size/2, y0, x0+size/2, y0+size);
		botonSuma.rect={x0:x0, y0:y0, x1:x0+size, y1: y0+size};
		p.pop();
	}
}

p.showFilter=function(filterTxt){ // origin [0, 0] is the coordinate in the upper left of the window
  p.push();
  p.textSize(this.getTextSize());
  p.fill(azul);
  var bounds = font.textBounds(filterTxt, 20, 20, this.getTextSize());
  //p.rect(10, contaminante.y1+bounds.h+5, bounds.w+5, contaminante.y1+5);
  filterType.x0=contaminante.x1+15;          filterType.y1=contaminante.y1;  // y1 es abajo
  filterType.x1=filterType.x0 + bounds.w+10; filterType.y0=contaminante.y0; // y0 es arriba
  filterType.w=filterType.x1-filterType.x0;
  filterType.h=filterType.y1-filterType.y0;
  debug(filterType);
  debug(bounds);
  p.rect(filterType.x0, filterType.y0, filterType.w, filterType.h, 7);
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
  p.push();
  var diameter = Math.min(p.width, p.height)-border;
  if(p.height*1.6>p.width) diameter=diameter-border*3;
  else diameter-=(contaminante.y1+border);
  var lastAngle = 0;
  var angles=p.getAngles(lines);
  this.showContaminante(cont);
  this.showFilter(filterTxt);
  this.showMenu();
  var labels=[];
  for (var i = 0; i < lines.length; i++) {
	var lin = lines[i];
	var estacion=data.estaciones[lin.station];
	var gray = p.map(i, 0, lines.length, 0, 255);
	//p.fill(colors[i]);
	p.fill(estacion.color);
	//fill(getColor(i, lines));
	var xy=p.pieCenter();
	// arc(x, y, weight, height, start, stop, [CHORD|PIE|OPEN])
	s=angles[i]==360?
		p.ellipse(xy.x, xy.y, diameter, diameter)
		:p.arc(xy.x, xy.y, diameter, diameter, lastAngle, lastAngle+p.radians(angles[i]));
	//info(s);
	var angle=lastAngle+p.radians(angles[i])/2;
	var radio_ = diameter/2;
	var x0=xy.x + radio_*p.cos(angle);
	var y0=xy.y + radio_*p.sin(angle);
	var str = ((this.getTextSize()>16&&typeFilterSelected.cnt<=4)||(this.getTextSize()>12&&typeFilterSelected.cnt>4))?
		estacion.name:estacion.name+'\r\n'+data.getZona(lin)+'\r\n'+lin.maxHour+'h ['+(lin.maxHour==-1?0:lin.values[lin.maxHour])+(data.magnitudes[lin.magnitude].unidad)+']';
	//str=str.replace(' ','\r\n');
	p.textSize(this.getTextSize());
	if(x0<xy.x) p.textAlign(p.CENTER);
	else {p.textAlign(p.LEFT); x0-=(radio_/3);}
	if(y0>xy.y) y0-=20;
	//this.shadowText(str, x0-20, y0, 'white', 'black');
	labels.push({str:str, x0:x0-20, y0:y0});
	lastAngle += p.radians(angles[i]);
  }
  for(var i=0; i<labels.length; i++){
	  this.shadowText(labels[i].str, labels[i].x0, labels[i].y0, 'white', 'black');
  }
  p.showClose();
  p.showBotonSuma();
  p.pop();
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

p.pieCenter = function(){ return {x:(p.width-menu.width)/2, y:p.height/2};}

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
  var yInicial=border+contaminante.y1;
  var margin = border,
      w = p.width-menu.width - 2 * margin, // chart area width and height
      //h = p.height - 2 * margin;
	  h = p.height - (border+yInicial);

  var barWidth =  (w / lastIdx) * 0.8 / lines.length; // width of bar
  var barMargin = (w / lastIdx) * 0.2; // margin between two bars

  p.push();
  p.stroke('dark-gray');
  p.line(margin, h+yInicial, margin+w, h+yInicial);
  p.textSize(this.getTextSize());
  var labels=[];
  for(var idxLine=0; idxLine<lines.length; idxLine++){
	var line=lines[idxLine];
	var values = line.values.slice(0, lastIdx);
	//info('barChart con '+values.length+' values');

	var x=margin+(idxLine*barWidth), y=yInicial+h;
  
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
  p.drawLimite(limite, maxValue, margin, w, y, yInicial, data.magnitudes[contaminante.code].unidad);
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

  p.showClose();
  p.showBotonSuma();
}

p.drawLimite = function(limite, maxValue, margin, w, yMin, yMax, unidad){
	p.push();
	if(limite>0){
		var value = p.map(limite, 0, maxValue, yMin, yMax);
		debug('limite='+limite+' maxValue='+maxValue+' entre '+yMax+'-'+yMin+'='+value);
		p.stroke('red');
		p.line(margin, value, margin+w, value);
		
		p.fill('red');
		p.noStroke();
		var str='Límite: '+limite+' '+unidad;
		if(value < yMax*2){ // 1.2 original
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
	var lastIdx = data.maxIdxValueWithoutValue(lines);
	var colores=isArea?colors:['yellow','red','white','LawnGreen'];
	var limite = data.getLimite(data.magnitudes[contaminante.code]).limite;
	var maxValue=Math.max(data.maxValue(lines), limite);
	var xMin=border;
	var xMax=p.width-border-menu.width;
	var yMin=p.height-(border*2);
	var yMax=border+contaminante.y1;
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
				if(vals[i]!=-1){
					var yValue = vals[i]==-1?yMin:p.map(vals[i], 0, maxValue /*line.values[line.maxHour]*/, yMin, yMax);
					//var xValue = p.map(i, 0, vals.length-1, xMin, xMax);
					var xValue = p.map(i, 0, lastIdx-1, xMin, xMax);
					//p.vertex(xValue, yValue);
					values.push({x:xValue, y:yValue, value:vals[i], hour:i});
					
					//info(line.values[i]+'=vertex ('+xValue+', '+yValue+') en ('+p.width+', '+p.height+')');
				}
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
		for(var i=0; i<values.length; i++) horas.push({txt: values[i].hour+'h', x: values[i].x, y: yMin+border-5});
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
  p.showClose();
  p.showBotonSuma();
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
