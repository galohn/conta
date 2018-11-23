
var no={name:'Noroeste', txts:[{txt:'Noroeste',     x:127,y:170}],coords:[{x:338, y:211},{x:281, y:251},{x:266, y:266},{x:243, y:294},{x:264, y:352},{x:264, y:370},{x:271, y:380},{x:284, y:384},{x:281, y:393},{x:256, y:396},{x:256, y:406},{x:239, y:411},{x:231, y:417},{x:215, y:421},{x:209, y:416},{x:203, y:402},{x:202, y:383},{x:215, y:374},{x:214, y:352},{x:188, y:351},{x:183, y:327},{x:173, y:317},{x:132, y:317},{x:125, y:309},{x:131, y:268},{x:122, y:258},{x:123, y:246},{x:104, y:239},{x:106, y:218},{x:75, y:156},{x:61, y:155},{x:58, y:133},{x:65, y:125},{x:63, y:112},{x:85, y:98},{x:95, y:108},{x:167, y:88},{x:158, y:70},{x:178, y:78},{x:174, y:87},{x:206, y:85},{x:257, y:104},{x:260, y:116},{x:302, y:116},{x:322, y:96},{x:322, y:75},{x:353, y:53},{x:355, y:26},{x:364, y:14},{x:374, y:14},{x:382, y:25},{x:396, y:26},{x:403, y:44},{x:403, y:60},{x:418, y:62},{x:419, y:85},{x:438, y:92},{x:439, y:109},{x:409, y:127},{x:376, y:128},{x:362, y:105},{x:353, y:102},{x:310, y:123},{x:324, y:137},{x:340, y:185},{x:349, y:199},{x:338, y:211}]};
var ne={name:'Noreste', txts:[{txt:'Noreste',      x:378,y:289}],coords:[{x:338, y:211},{x:281, y:251},{x:266, y:266},{x:243, y:294},{x:278, y:300},{x:317, y:280},{x:343, y:280},{x:341, y:296},{x:357, y:321},{x:358, y:345},{x:365, y:357},{x:359, y:370},{x:364, y:390},{x:380, y:396},{x:409, y:401},{x:426, y:398},{x:457, y:412},{x:491, y:434},{x:509, y:427},{x:532, y:425},{x:551, y:429},{x:549, y:402},{x:527, y:386},{x:515, y:408},{x:497, y:396},{x:474, y:401},{x:469, y:389},{x:459, y:380},{x:474, y:362},{x:497, y:363},{x:503, y:352},{x:534, y:346},{x:531, y:334},{x:540, y:334},{x:544, y:307},{x:529, y:302},{x:527, y:281},{x:519, y:274},{x:519, y:265},{x:499, y:256},{x:505, y:238},{x:473, y:236},{x:450, y:251},{x:439, y:251},{x:423, y:236},{x:382, y:243},{x:364, y:232},{x:354, y:215},{x:338, y:211}]};
var c={name:'Interior-M30', txts:[{txt:'Interior',x:265,y:333},{txt:'M-30',x:290,y:400}],coords:[{x:243, y:294},{x:278, y:300},{x:317, y:280},{x:343, y:280},{x:341, y:296},{x:357, y:321},{x:358, y:345},{x:365, y:357},{x:359, y:370},{x:364, y:390},{x:347, y:429},{x:334, y:436},{x:334, y:445},{x:327, y:449},{x:311, y:437},{x:295, y:422},{x:283, y:422},{x:281, y:411},{x:285, y:404},{x:281, y:393},{x:284, y:384},{x:271, y:380},{x:264, y:370},{x:264, y:352},{x:243, y:294}]};
var so={name:'Suroeste', txts:[{txt:'Suroeste',     x:160,y:465}],coords:[{x:281, y:393},{x:285, y:404},{x:281, y:411},{x:283, y:422},{x:295, y:422},{x:311, y:437},{x:320, y:476},{x:320, y:555},{x:294, y:553},{x:274, y:533},{x:280, y:484},{x:233, y:496},{x:203, y:487},{x:188, y:495},{x:179, y:483},{x:160, y:481},{x:129, y:429},{x:154, y:429},{x:160, y:437},{x:200, y:433},{x:210, y:423},{x:209, y:416},{x:215, y:421},{x:231, y:417},{x:239, y:411},{x:256, y:406},{x:256, y:396},{x:281, y:393}]};
var se={name:'Sureste', txts:[{txt:'Sureste',      x:360,y:480}],coords:[{x:320, y:555},{x:320, y:476},{x:311, y:437},{x:327, y:449},{x:334, y:445},{x:334, y:436},{x:347, y:429},{x:364, y:390},{x:380, y:396},{x:409, y:401},{x:426, y:398},{x:457, y:412},{x:491, y:434},{x:509, y:427},{x:532, y:425},{x:551, y:429},{x:541, y:440},{x:519, y:435},{x:502, y:499},{x:463, y:549},{x:468, y:566},{x:433, y:570},{x:418, y:560},{x:403, y:558},{x:379, y:537},{x:333, y:553},{x:320, y:555}]};

var bcr=null;
function getBcr(){
	//document.getElementById('svg').style.height=window.innerHeight/3;
	//info(document.getElementById('svg'));
	//return document.getElementById('svg').getBoundingClientRect();
	if(bcr==null)bcr=document.getElementById('svg').getBoundingClientRect();
	return bcr;
}
function perc(){
	var bcr = getBcr();
	return Math.min(bcr.width/600, bcr.height/650);
}
function mapX(v){
	return getBcr().width/2.9 + v * perc();
}
function mapY(v){
	return v * perc();
}
var colorOverMag={rojo:{style:"background-color:red; color: white"}, naranja:{style:"background-color:orange; color: black"}, amarillo:{style:"background-color:yellow; color: black"}, verde:{style:"background-color:green; color: white"}};
function getOverColour(mag, value){
	var limite = data.getLimite(mag);
	var overflow = value/limite.limite;
	if(overflow>=1) return colorOverMag.rojo;
	else if(overflow>=.75) return colorOverMag.naranja;
	else if(overflow>=.5)  return colorOverMag.amarillo;
	else return colorOverMag.verde;
}
function getStyleLines(lines){
	var style='green';
	for(var i=0; i<lines.length; i++){
		var line=lines[i];
		var overflow = data.getOverflowSomeLimit(line);
		if(overflow>=1) return 'red';
		else if(overflow>=.75) style='orange';
		else if(overflow>=.5 && style!='orange') style='yellow';
	}
	return style;
}
function getStyle(zone){
	var ls=data.filterByZone(zone.name, data.lines);
	return getStyleLines(ls);
}
function getZone(zone, style){
	var str='';
	for(var i=0;i<zone.coords.length; i++){
		str+=' '+mapX(zone.coords[i].x)+','+mapY(zone.coords[i].y);
	}
	style=getStyle(zone);
	str='<polygon points="'+str+'"'+(style==null?'':' style="'+'fill:'+style+';stroke:black;stroke-width:1'+'"')+' />';
	for(var i=0; i<zone.txts.length; i++){
		str+='<text x="'+mapX(zone.txts[i].x)+'" y="'+mapY(zone.txts[i].y)+'" fill="black">'+zone.txts[i].txt+'</text>';
	}
	return str;
}
function getMapa(){return getZone(no,'blue')+getZone(ne,'yellow')+getZone(c,'pink')+getZone(so,'green')+getZone(se,'coral');}
function getCuadro(){
	var mag=[];
	var fila1=html('td');
	for(var key in data.magnitudes){
		var magn=data.magnitudes[key];
		if(data.getLimite(magn).limite!=-1){
			magn.code=key;
			mag.push(magn);
			fila1+=html('td',{style:"text-align: center"},magn.abrv);
		}
	}
	//info('mag:'); info(mag);
	var filas="";
	//info(data.zonas);
	for (var keyZ in data.zonas) {
		//info('keyZ:'); info(keyZ);
		var zona=data.zonas[keyZ];
		//info(zona);
		var linesZone=data.filterByZone(keyZ, data.lines);
		var fila="";
		for(var m=0; m<mag.length; m++){
			var value=data.getLimite(mag[m]).limite;
			var linesByZoneAndMag=data.filterByMagnitude(mag[m].code, linesZone);
			var style = getStyleLines(linesByZoneAndMag);
			fila+=html('td',{style:"background-color:"+style}, "<br>");
		}
		fila=html('td',{width:"8%"},keyZ)+fila;
		filas+=html('tr',null,fila);
	}
	//info('cuadro='+filas);
	return html('table',{style:"width:100%; padding: 15px;"}, fila1+filas);
}
function infoMagnitud(mag, lines){
	var valor=null;
	var li = data.getLimite(mag);
	var campos={maximaDiaria:"Máxima diaria", mediaHoraria:"Media horaria", mediaDiaria:"Media diaria", mediaAnual:"Media anual"};
	var limites={limite:"Límite", critico:"Crítico", alerta:"de alerta", informacion:"de información", objetivo:"objetivo"};
	var trs="";
	var str=html('div',null,"Descripción")+html('div',null,mag.descripcion);
	str+=html('div',null,"Efectos")+html('div',null,mag.efectos);
	for(var cKey in campos){
		var td1="";
		if(cKey in mag){
			var campo=mag[cKey];
			td1=html('td',{"class":"valor"},campos[cKey]);
			var td2="";
			for(lKey in limites){
				if(lKey in campo){
					var limite=campo[lKey];
					td2+=html('span',{"class":"limite"},"nivel "+limites[lKey]+": "+limite+" ");
				}
			}
			trs+=html('tr',{"class":"NPI"}, td1+html('td',null, td2));
		}
	}
	if(trs.length>0){
		var pp=html('td',null,html('span',colorOverMag.verde,'Verde')+'<'+(li.limite*.5)+'<br />'+html('span',colorOverMag.amarillo,'Amarillo')+'>='+(li.limite*.5)+'<br />'+html('span',colorOverMag.naranja,'Naranja')+'>='+(li.limite*.75)+'<br />'+html('span',colorOverMag.rojo,'Rojo')+'>='+(li.limite));
		str+=html('table',{"class":"tabla"}, trs) + html('table',null, html('tr',null,pp));
	}
	///
	if(lines.length>0){
		var linesOrder={"Máximos": ["maxValue", data.sortAscByMax(lines).slice(),mag.unidad], "Mínimos": ["minValue", data.sortAscByMin(lines).slice(),mag.unidad], "Media" : ["avgValue", data.sortAscByAvg(lines).slice(),mag.unidad], "Mediana":["medianValue", data.sortAscByMedian(lines).slice(),mag.unidad]}; //, "Nº de valores":["cntValues", data.sortAscByCntValues(lines).slice(),"valores"]};
		trs="";
		var divs="";
		for(klo in linesOrder){
			var property=linesOrder[klo][0];
			var linesO=linesOrder[klo][1];
			var sufijo=linesOrder[klo][2];
			var max=linesO[0], min=linesO[linesO.length-1];
			trs+= html('tr',null,
				html('td',{id:mag.abrv+klo, "class":"mini-boton", onclick:"clickValor('"+mag.abrv+klo+"')"},klo)+
				html('td',null,data.estaciones[max.station].name+'<br />'+spanColoreado(mag,max[property])+' '+sufijo)+
				html('td',null,data.estaciones[min.station].name+'<br />'+spanColoreado(mag,min[property])+' '+sufijo));
				ids.valor.push(mag.abrv+klo);
			var trs2="";
			for(var i in linesO){
				var lin = linesO[i];
				trs2+=html('tr',null,
					html('td',null,data.estaciones[lin.station].name)+
					html('td',null,spanColoreado(mag, lin[property])+' '+sufijo));
			}
			divs+=html('div',{id:mag.abrv+klo+'tabla', "class":"oculto"}, html('table',{"class":"tabla"},trs2));
		}
		str+="<br />"+html("table",{"class":"tabla"},trs)+"<br />"+divs;
	}
	//info(str);
	///
	ids.mag.push(mag.abrv);
	return html('div',{"class":"general",onclick:"clickMag('"+mag.abrv+"')"},mag.name+" ("+mag.abrv+")")+html('div',{id:mag.abrv, "class":"oculto"},str);
}
function spanColoreado(mag, valor){
	var v = Math.round(valor);
	return html('span',getOverColour(mag, v),v);
}
var ids={valor:[], mag:[]};
function ocultaTodos(ids, sufijo){
	for(var i in ids){
		id=ids[i];
		var el = document.getElementById(id+sufijo);
		if(!!el){
			if(el.classList.contains("show")){
				el.classList.remove("show");
				el.classList.add("oculto");
			}
		}
	}
}
function clickValor(code){
	//info(code);
	ocultaTodos(ids.valor,'tabla');
	for(var i in ids.valor){
		id=ids.valor[i];
		var el = document.getElementById(id);
		if(!!el){
			if(el.classList.contains("mini-boton-selected")){
				el.classList.remove("mini-boton-selected");
				el.classList.add("mini-boton");
			}
		}
	}
	document.getElementById(code).classList.remove("mini-boton");
	document.getElementById(code).classList.add("mini-boton-selected");
	var el = document.getElementById(code+'tabla');
	if(el.classList.contains("oculto")){
		el.classList.add("show");
		el.classList.remove("oculto");
	}else{
		el.classList.remove("show");
		el.classList.add("oculto");
	}
}
function clickMag(codeMag){
	ocultaTodos(ids.mag,"");
	var el = document.getElementById(codeMag);
	if(el.classList.contains("oculto")){
		el.classList.add("show");
		el.classList.remove("oculto");
	}else{
		el.classList.remove("show");
		el.classList.add("oculto");
	}
}
function infoContaminantes(){
	var str="";
	ids.valor=[];
	for(var attr in data.magnitudes){
		var mag=data.magnitudes[attr]; //name, abrv, unidad, (maximaDiaria|mediaHoraria|mediaDiaria|mediaAnual)(limite|critico|alerta|informacion|objetivo), descripcion, efectos
		var lines=data.filterByMagnitude(attr, data.lines);
		var stat=data.getStatistics(lines); // stat={value:{}, avg:{}, median:{}, cntValues:{}}; // object
		str += infoMagnitud(mag, lines);
	}
	info("infoContaminantes:");
	info(str);
	return str;
}
function p1Clicked(){
	document.getElementById('p1').style.display = 'none';
	document.getElementById('cuerpo').style.display = 'block';
	donde='p2';
}
function contaminantesClicked(){
	document.getElementById('contaminantes').style.display = 'block';
	document.getElementById('p1').style.display = 'none';
	document.getElementById('cuerpo').style.display = 'none';
	donde='p2';
}
function showP1(){
	document.getElementById('p1').style.display = 'block';
	document.getElementById('cuerpo').style.display = 'none';
	document.getElementById('contaminantes').style.display = 'none';
	document.getElementById('menu').style.display = 'none';
}
function p1Init(){
	console.log('p1 init '+ lines.length);
	document.getElementById("svg").innerHTML = getMapa();
	info(document.getElementById("svg").innerHTML);
	document.getElementById("cuadro").innerHTML = getCuadro();
	document.getElementById("contaminantes").innerHTML = infoContaminantes();
	
	showP1();
}
function resizedP1(){
	p1Init();
}

data.onLoad.push(p1Init);
