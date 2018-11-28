function e(e, attrs, content){ // class,style,transform,
	content=content==undefined||content==null?'':content;
	var atStr='';
	if(attrs!=null)for(attr in attrs)atStr+=attr+'="'+attrs[attr]+'" ';
	return '<'+e+' '+atStr+'>'+(content.length>0?'\n\t':'')+content+'</'+e+'>\n';
}
function slider(min, max, value, attrs){
	attrs=undefined||attrs==null?{}:attrs;
	attrs.min=min; attrs.max=max; attrs.value=value;
	return e('range', attrs);
}
function rectComplex(attrs){return e('rect',attrs);} // x,y,width,height y rx,ry para redondear esquinas
function rect(x,y,width,height, attrs){
	attrs=undefined||attrs==null?{}:attrs;
	attrs.x=x; attrs.y=y; attrs.width=width; attrs.height=height;
	return rectComplex(attrs);
}
function circle(attrs){return e('circle',attrs);} // cx,cy,r
function text(attrs,content){return e('text',attrs, content);} // x,y,dx,dy,text-anchor,rotate,textLength,lengthAdjust
function ellipse(attrs){return e('ellipse',attrs);} // cx,cy,rx,ry,pathLength
function line(attrs){return e('line',attrs);} // x1,x2,y1,y2,pathLength
function path(attrs){return e('path',attrs);} // d,pathLength
function polyline(attrs){return e('polyline',attrs);} // points,pathLength
function polygon(attrs){return e('polygon',attrs);} // points,pathLength
function arcComplex(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y, attrs){
	attrs=undefined||attrs==null?{}:attrs;
	attrs.d=['A', rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y].join(' ');
	return e('path',attrs);
}
function arc(x,y, r, angleStart, angleArc, attrs){
	attrs.d=describeArc(x, y, r, angleStart, angleStart + (angleArc%360));
	return e('path', attrs);
}
function pointsAttrValue(points){
	var str='';
	if('x' in points) str=points.x+','+ponts.y;
	else if(points.length>0)for(i in points)str+=points[i].x+','+points[i].y+' ';
	return str;
}
function getSvg(){ return document.getElementById('svg'); }
function setInnerSvg(str){getSvg().innerHTML=str;}
function getBcr(){ return getSvg().getBoundingClientRect(); } // width, height

function loadBody(){
	var str=text({x:66, y:40},'boy')+rect(25, 25,10,10, {fill:"green"})+arc(30,30,20,270,270, {fill:"red"});
	//alert(str);
	setInnerSvg(str);
	sk('svg');
}

/////////////////////

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
				'M', x, y,
				'L', start.x, start.y, 
				"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
				,'Z'
    ].join(" ");

    return d;       
}

function degreesToRadians (degrees) {
	return degrees * (Math.PI/180);     
}

function radiansToDegrees (radians) {
	return radians * (180/Math.PI);
}

var sk = function( svgId ) {
	var colors = ['Orange','Cyan','Teal','Lavender','Brown','Beige','Maroon','Mint','Olive','DarkGoldenRod','Coral','CornflowerBlue','DarkSalmon'];
	var mouseAngle;
	var lines=[], linesBak=[], checks=[];
	var lastLinesLength=0;
	var swCallAjax=true;
	var swDraw=false;
	var border=24;
	var type={area:0, line:1, bar:2, pie:3};
	var typeFilter={max:{txt:"valor mas alto", fn:data.sortAscByMax}, avg:{txt:"media mas alta", fn: data.sortAscByAvg}, cnt:{txt:"mas valores", fn:data.sortAscByCntValues}, median:{txt:"mediana mas alta", fn:data.sortAscByMedian}};
	var typeChart=type.area;
	var typeFilterSelected=typeFilter.max;
	var textSizeSlider, extVName;
	var font, menu={}, contaminante={}, filterType={};
	
	noStroke = function(){};
	setExtVName = function(name){ extVName=name; }
	var svg = document.getElementById(svgId);

	addSvg=function(e){
		svg.innerHTML+=e;
	}
	
	slider=function(x, y, width){
		path({onmousedown: 'moveDotStart(evt)', onmousemove:'moveDot(evt)', onmouseup:'moveDotEnd(evt)',
					onmouseout:'moveDotEnd(evt)', id:'slideBar', stroke:'lime opacity=.3', 'stroke-width':30,
					d:'M '+x+' '+y+' L '+x+width+','+y});
		path({id:'sliderPath',stroke:'red', fill:'none','stroke-width':5, d:'M '+x+' '+y+'a147,147,0,1,1,280,1'});
		circle({'pointer-events':'none',id:'dot',fill:'blue',cx:x,cy:y,r:14});
	}
	var MoveDot=false;
function moveDotStart(evt){
   MoveDot=true
}
function moveDot(evt){
    if(MoveDot==true)
    {
        var pathLength=sliderPath.getTotalLength()
        var barLength=slideBar.getTotalLength()
        var xCursor=evt.clientX-10-200
        var moveRatio=xCursor/barLength
        var dotPathLength=moveRatio*pathLength
        var dotPnt=sliderPath.getPointAtLength(dotPathLength)
        dot.setAttribute("cx",dotPnt.x)
        dot.setAttribute("cy",dotPnt.y)
    }

}
function moveDotEnd(evt){
  MoveDot=false
}
	setup = function() {
		//var canva=createCanvas(screen.width, screen.height/4);
		contaminante.code=10;
		
//		var canva=createCanvas(windowWidth, windowHeight/2.3);
//		info(canva);
		//var canva=createCanvas(_userNode.clientWidth, _userNode.clientHeight);
		//canva.parent('pieChart');
		noStroke();
		//strokeWeight(1);
		//noLoop();  // Run once and stop
		//callAjax();
		var str = slider(10, 72, 16);
		addSvg(str);
		//info(textSizeSlider);
		this.setMenu();
	//	canva.mousePressed(this.doOnMousePress);
	window.addEventListener("resize", windowResized);
	}
	
	getTextSize = function(){
		return textSizeSlider.value();
	}
	
	windowResized = function () {
		resizeCanvas(window.innerWidth, window.innerHeight/2.3);
		lastLinesLength=lines.length-1;
		this.setMenu();
		//info('lastLinesLength=lines.length-1'+lastLinesLength+' '+lines.length);
	}
	
	draw = function() {
		//info('swCallAjax='+swCallAjax+' swDraw='+swDraw+' lines='+lines.length);
		if(lastLinesLength!=lines.length){
			background(100);
			lastLinesLength=lines.length;
			//info('2 swCallAjax='+swCallAjax+' swDraw='+swDraw+' lines='+lines.length);
			if(lines.length>0){
				var lines2=data.removeEmptyLines(data.filterByMagnitude(contaminante.code, lines));
				//lines2=data.sortAscByMax(lines2).slice(-3);
				lines2=typeFilterSelected.fn(lines2).slice(-3);
				var magnitude=data.magnitudes[contaminante.code].name;
				var str = '3 con '+typeFilterSelected.txt;
				if     (type.pie ==typeChart) pieChart(magnitude, str, lines2);
				else if(type.area==typeChart) areaLineChart(magnitude, str, lines2, true);
				else if(type.line==typeChart) areaLineChart(magnitude, str, lines2, false);
				else if(type.bar ==typeChart) barChart(magnitude, str, lines2, false);
			}
			swDraw=false;
		}
	}
	
	setMenu = function(){
/*		menu.labels = ['Area','Linea','Barra','Tarta'];
		if(!('bounds' in menu)) menu.bounds = font.textBounds(menu.labels[2], 0, border, this.getTextSize());
		//info(height+'------------'+width);
		menu.width = width/3>height? (border*2)+menu.bounds.w : menu.bounds.w +10;
		menu.xMin=width-menu.width;
		menu.buttonHeight = height/menu.labels.length;*/
	}
	showMenu = function(){
		push();
		textAlign(CENTER, CENTER);
		for(var i=0; i<menu.labels.length; i++){
			fill(colors[colors.length-i-1]);
			rect(menu.xMin, i*menu.buttonHeight, menu.width, (i+1)*menu.buttonHeight);
			fill('white');
			text(menu.labels[i], menu.xMin+(width-menu.xMin)/2, i*menu.buttonHeight+((i+1)*menu.buttonHeight-i*menu.buttonHeight)/2);
		}
		pop();
	}
	
	doOnMousePress = function () {
		info('Detectado mouse pressed en '+typeChart);
		var resized=false;
			if(mouseX>menu.xMin){
			if(mouseY<menu.buttonHeight) setArea();
			else if(mouseY<menu.buttonHeight*2) setLine();
			else if(mouseY<menu.buttonHeight*3) setBar();
			else if(mouseY<menu.buttonHeight*4) setPie();
			resized=true;
		}else if(checks.length>0){
			info('valido checks '+checks.length);
			for(var i=0; i<checks.length && !resized; i++){
				info(mouseX+' >= '+checks[i].x0+' '+mouseY+' >= '+checks[i].y0+' '+mouseX+' >= '+checks[i].x1+' '+mouseY+' >= '+checks[i].y1);
				if(mouseIntersectWith(checks[i])){
					checks[i].selected=!checks[i].selected;
					resized=true;
				}
			}
		}
		if (!resized && mouseIntersectWith(contaminante)){
			resized=true;
			info('--------------');
			var str='', i=0;
			for(mag in data.magnitudes){
				if(data.filterByMagnitude(mag, lines).length>0)
					str+='<div onclick="'+extVName+'.setMagnitud(\''+mag+'\');" style="background-color:'+colors[i++]+'">'+data.magnitudes[mag].name+'</div>'
			}
			str='<div id="myDropdown" class="show">'+str+'</div>';
			
			var menuMag=document.getElementById('menu');
			menuMag.innerHTML=str;
			menuMag.style.display = 'block';
			document.getElementById('cuerpo').style.display = 'none';
		}
		if (!resized && mouseIntersectWith(filterType)){
			resized=true;
			var str='', i=0;
			for(idx in typeFilter){
				var tf = typeFilter[idx];
				str+='<div onclick="'+extVName+'.setTypeFilter(\''+idx+'\');" style="background-color:'+colors[i++]+'">'+tf.txt+'</div>'
			}
			str='<div id="myDropdown" class="show">'+str+'</div>';
			
			var menuMag=document.getElementById('menu');
			menuMag.innerHTML=str;
			menuMag.style.display = 'block';
			document.getElementById('cuerpo').style.display = 'none';
		}
		if(resized) windowResized();
	}
	
	setTypeFilter = function(code){
		typeFilterSelected=typeFilter[code];
		windowResized();
		document.getElementById('menu').style.display = 'none';
		document.getElementById('cuerpo').style.display = 'block';
	}
	setMagnitud = function(code){
		contaminante.code=code;
		windowResized();
		document.getElementById('menu').style.display = 'none';
		document.getElementById('cuerpo').style.display = 'block';
	}
	
	mouseIntersectWith = function(anObject){
		return mouseX>=anObject.x0 && mouseY>=anObject.y0 && mouseX<=anObject.x1 && mouseY<=anObject.y1;
	}
	
	setArea = function(){ typeChart=type.area; return this;}
	setLine = function(){ typeChart=type.line; return this;}
	setBar = function(){ typeChart=type.bar; return this;}
	setPie = function(){ typeChart=type.pie; return this;}
	
	redrawPie = function(){
		info('redraw!');
		swCallAjax=true;
	}
	
	createButton=function(txt, x, y, c1, c2){
		var b = font.textBounds(txt, x, y, this.getTextSize());
		var r = {x0: x, y0: y, x1: x+b.w+4, y1: y+b.h+4}; // y1 es arriba
		r.h = r.y0 - r.y1;
		r.w = r.x1 - r.x0;
		push();
		fill(c2);
		rect(r.x, r.y, r.w, r.h);
		fill(c1);
		text(txt, r.x+2, r.y-2);
		pop();
	}
	
	showContaminante=function(cont){
		textSize(this.getTextSize());
		fill('gray');
		var bounds = font.textBounds(cont, 10, 10, this.getTextSize());
		rect(10, border*1.5-bounds.h, bounds.w+10, bounds.h+8);
		contaminante.x0=10; contaminante.y0=border*1.5-bounds.h; contaminante.x1=contaminante.x0 + bounds.w+10; contaminante.y1=contaminante.y0+bounds.h+8;
		//text(title, 10-1, (border*2)-1); y0 es arriba e y1 es abajo
		fill('white');
		text(cont, 10+5, contaminante.y1-4); //border*1.5+4);
	}
	
	showFilter=function(filterTxt){ // origin [0, 0] is the coordinate in the upper left of the window
		push();
		textSize(this.getTextSize());
		fill('gray');
		var bounds = font.textBounds(filterTxt, 20, 20, this.getTextSize());
		//rect(10, contaminante.y1+bounds.h+5, bounds.w+5, contaminante.y1+5);
		filterType.x0=contaminante.x0;             filterType.y1=contaminante.y1+20+bounds.h;  // y1 es abajo
		filterType.x1=filterType.x0 + bounds.w+10; filterType.y0=filterType.y1-bounds.h-10; // y0 es arriba
		filterType.w=filterType.x1-filterType.x0;
		filterType.h=filterType.y1-filterType.y0;
		info(filterType);
		info(bounds);
		rect(filterType.x0, filterType.y0, filterType.w, filterType.h);
		//text(title, 10-1, (border*2)-1);
		fill('white');
		//textAlign(CENTER, CENTER);
		textAlign(CENTER, BOTTOM);
		text(filterTxt, filterType.x0+filterType.w/2, filterType.y1);
		//text(filterTxt, filterType.x0+((filterType.x1-filterType.x0)/2), filterType.y1+((filterType.y0-filterType.y1)/2));
		//this.createButton(filterTxt, 10, 20, 'white', 'gray');
		pop();
	}
	
	pieChart = function(cont, filterTxt, lines) {
		var diameter = Math.min(width, height)-border;
		if(height*1.6>width) diameter=diameter-border*3;
		var lastAngle = 0;
		var angles=getAngles(lines);
		this.showContaminante(cont);
		this.showFilter(filterTxt);
		this.showMenu();
		for (var i = 0; i < lines.length; i++) {
			var lin = lines[i];
			var gray = map(i, 0, lines.length, 0, 255);
		fill(colors[i]);
			//fill(getColor(i, lines));
		var xy=pieCenter();
		// arc(x, y, weight, height, start, stop, [CHORD|PIE|OPEN])
			s=arc(xy.x, xy.y, diameter, diameter, lastAngle, lastAngle+radians(angles[i]));
		//info(s);
		var angle=lastAngle+radians(angles[i])/2;
		var radio_ = diameter/2;
		var x0=xy.x + radio_*cos(angle);
		var y0=xy.y + radio_*sin(angle);
		var str = data.estaciones[lin.station]+'\r\n'+data.getZona(lin)+' - '+lin.maxHour+'h ['+(lin.maxHour==-1?0:lin.values[lin.maxHour])+(data.magnitudes[lin.magnitude].unidad)+']';
		//str=str.replace(' ','\r\n');
		textSize(this.getTextSize());
		if(x0<xy.x) textAlign(CENTER);
		else textAlign(LEFT);
		this.shadowText(str, x0, y0, 'white', 'red');
			lastAngle += radians(angles[i]);
		}
	}
	
	isPointInsideArc = function (){
		/* https://www.geeksforgeeks.org/check-whether-point-exists-circle-sector-not/
			Convert x, y to polar coordinates using this
			Angle = atan(y/x); Radius = sqrt(x * x + y * y);
			Then Angle must be between StartingAngle and EndingAngle, and Radius between 0 and your Radius.
	*/
	}
	
	getColor = function(i, data){
		var fll = map(i, 0, data.length, 0, 255);
		var fillFocus = color(fll, 99, 99, 255);
		var fillNoFocus = color(fll, 89, 49, 189);
		return fillFocus;
	}
	
	pieCenter = function(){ return {x:width/2, y:height/2};}
	
	getAngles = function(lines){
		// calcula el % de angulo en funcion de la suma de los maxValues
		var sum=0;
		var angles=[]
		for(i=0; i<lines.length; i++) sum+=lines[i].maxHour==-1?0:lines[i].values[lines[i].maxHour];
		for(i=0; i<lines.length; i++) angles[i]=map(lines[i].maxHour==-1?0:lines[i].values[lines[i].maxHour], 0,sum,0,360);
		return angles;
	}
	
	setLines = function(inLines){
		lines=inLines;
		//info('setLines:');
		//info(lines);
		info('recibido '+lines.length+' lines');
	}
	
	barChart = function(cont, filterTxt, lines){
		//info(lines);
		this.showContaminante(cont);
		this.showFilter(filterTxt);
		this.showMenu();
		var lastIdx = data.maxIdxValueWithoutValue(lines);
		var limite = data.getLimite(data.magnitudes[contaminante.code]);
		var maxValue=Math.max(data.maxValue(lines), limite);
		var margin = border,
				w = width-menu.width - 2 * margin, // chart area width and height
				h = height - 2 * margin;
	
		var barWidth =  (w / lastIdx) * 0.8 / lines.length; // width of bar
		var barMargin = (w / lastIdx) * 0.2; // margin between two bars
	
		push();
		stroke('dark-gray');
		line(margin, h+margin, margin+w, h+margin);
		textSize(this.getTextSize());
		var labels=[];
		for(var idxLine=0; idxLine<lines.length; idxLine++){
		var line=lines[idxLine];
		var values = line.values.slice(0, lastIdx);
		info('barChart con '+values.length+' values');
	
		var x=margin+(idxLine*barWidth), y=margin+h;
		
			push();
			fill(colors[idxLine%colors.length]);
			noStroke();
		for(var i=0; i<lastIdx; i++) {
			if(values[i]!=-1){
				value = map(values[i], 0, maxValue, 0, h);
				//info(values[i]+'   '+values[line.minHour]+'   '+values[line.maxHour]+'   '+0+'   '+w);
				// rect x,y width height
				rect(x, y, barWidth, -value); // draw rect
				
				labels.push({txt: values[i], x: x-2, y: y-value-2});
			}
			//fill('#FFF');
			//text(i+"h", 5, barWidth/2 + 5); // write data
			x = x + (barWidth*lines.length + barMargin);
		}
		pop();
		}
		// Limite
		drawLimite(limite, maxValue, margin, w, y, margin, data.magnitudes[contaminante.code].unidad);
		// labels
		noStroke();
		removeLabels(labels);
		for(var i=0; i<labels.length; i++) this.shadowText(labels[i].txt, labels[i].x, labels[i].y, 'white', 'red');
		// Horas
		labels=[]
		for(var i=0; i<lastIdx; i++) labels.push({txt: i+"h", x: margin+(barWidth/2)+(i*(barWidth*lines.length+barMargin)), y: height-2}); //+ barWidth/2 + 5});
		fill('#FFF'); noStroke();
		//textAlign(CENTER);
		removeLabels(labels);
		for(var i=0; i<labels.length; i++) text(labels[i].txt, labels[i].x, labels[i].y);
		pop();
	}
	
	drawLimite = function(limite, maxValue, margin, w, yMin, yMax, unidad){
		push();
		if(limite>0){
			var value = map(limite, 0, maxValue, yMin, yMax);
			info('limite='+limite+' maxValue='+maxValue+' entre '+yMax+'-'+yMin+'='+value);
			stroke('red');
			line(margin, value, margin+w, value);
			
			fill('red');
			noStroke();
			var str='Límite: '+limite+' '+unidad;
			if(value < yMax*1.2){
				var bounds = font.textBounds(str, margin, value, this.getTextSize());
				margin = w - bounds.w + margin;
				value+=(2+bounds.h);
			}else value=value-2;
			text(str, margin, value);
		}
		pop();
	}
	
	isCheckSelected = function(idx){
		return checks.length<=idx || checks[idx].selected;
	}
	
	areaLineChart = function(cont, filterTxt, lines, isArea){
		this.showContaminante(cont);
		this.showFilter(filterTxt);
		this.showMenu();
		var colores=isArea?colors:['yellow','red','white','LawnGreen'];
		var limite = data.getLimite(data.magnitudes[contaminante.code]);
		var maxValue=Math.max(data.maxValue(lines), limite);
		var xMin=border;
		var xMax=width-border-menu.width;
		var yMin=height-(border*2);
		var yMax=border;
		var labels=[];
		// line de abajo:
		stroke('dark-gray');
		line(xMin, yMin, xMax, yMin);
		noStroke();
	
		for(var idx=0; idx<lines.length; idx++){
			if(isCheckSelected(idx)){
				var line=lines[idx];
				var values=[];
				var vals=data.removeLastDataWithoutValue(line.values);
				//for(var i=line.values.length-1; i>=0 && line.values[i]==-1; i--) line.values.splice(i,1); // Aqui quitamos las ultimas horas sin valor
				
				//values.splice(0);
				for(var i=0; i<vals.length; i++){
					var yValue = vals[i]==-1?yMin:map(vals[i], 0, maxValue /*line.values[line.maxHour]*/, yMin, yMax);
					var xValue = map(i, 0, vals.length-1, xMin, xMax);
					//vertex(xValue, yValue);
					values.push({x:xValue, y:yValue, value:vals[i], hour:i});
					
					//info(line.values[i]+'=vertex ('+xValue+', '+yValue+') en ('+width+', '+height+')');
				}
	
				//
				let c = color(colores[idx%colores.length]);
				if(isArea) c.setAlpha(128);
				if(isArea) fill(c);	else {noFill(); stroke(c);}
	
				beginShape();
				vertex(xMin, yMin);
				for(var i=0; i<values.length; i++) vertex(values[i].x, values[i].y);
				vertex(xMax, yMin);
				if(isArea) endShape(CLOSE);	else endShape();
				for(var i=0; i<values.length; i++) if(values[i].value!=-1) labels.push({txt: values[i].value, x: values[i].x, y: values[i].y-1});
			}
		}
		// Limite
		drawLimite(limite, maxValue, xMin, xMax-xMin, yMin, yMax, data.magnitudes[contaminante.code].unidad);
		//
		noStroke();
		// pintamos los labels
		textAlign(CENTER);
		//textSize(this.getTextSize());
		//fill('red');
		removeLabels(labels);
		for(var i=0; i<labels.length; i++) this.shadowText(labels[i].txt, labels[i].x, labels[i].y, 'white', 'red');
		// Pintamos las horas
		if(!(values==undefined)){
			fill('white');
			var horas=[]
			for(var i=0; i<values.length; i++) horas.push({txt: i+'h', x: values[i].x, y: yMin+border-5});
			removeLabels(horas);
			for(var i=0; i<horas.length; i++) text(horas[i].txt, horas[i].x, horas[i].y);
		}
		// Pintamos los textos de las series
		textAlign(LEFT);
		noStroke();
		var x=10;
		var y=height-1;
		for(var idx=0; idx<lines.length; idx++){
			//var chk=checks.length>idx?checks[idx]:{};
			let c = color(colores[idx%colores.length]);
			if(lines.length>1) c.setAlpha(128);
			fill(c);
			var txt = data.estaciones[lines[idx].station];
			//rect(x,y-15, 15, 15);
			var chk = {x0:x, y0:y-15, x1:x+15, y1:y, selected: true};
			if(checks[idx]==undefined || checks[idx]==null){
				checks.push(chk);
			}else{
				checks[idx].x0=chk.x0; checks[idx].y0=chk.y0; checks[idx].x1=chk.x1; checks[idx].y1=chk.y1;
			}
			drawCheck(x,y-15,15,15,checks[idx].selected);
			
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
	
	drawCheck = function(x, y, width, height, selected){
		rect(x,y, width, height);
		if(selected){
			push();
			stroke(60);
			color('red');
			line(x,y+height,x+width,y);
			line(x,y,x+width,y+height);
			pop();
		}
	}
	
	shadowText = function(txt, x, y, color, shadow){
		push();
		fill(shadow);
		text(txt, x-1, y-1);
		fill(color);
		text(txt, x, y);
		pop();
	}
	
	removeLabels = function(labels){
		var bor=border+(this.getTextSize()-16)+4;
		for(var i=0; i<labels.length; i++){
			var l1 = labels[i];
			for(var j=labels.length-1; j>i; j--){
				var l2=labels[j];
				if(l2.x-bor <= l1.x && l2.x+bor >=l1.x && l2.y-bor <= l1.y && l2.y+bor >=l1.y) labels.splice(j,1);
			}
		}
	}
	
	setup();
	draw();
}
	