var data =  {
 lines:[], //, linesBak=[];
// http://www.mambiente.munimadrid.es/opencms/export/sites/default/calaire/Anexos/INTPHORA-DIA.pdf
 estaciones:{"28079001": {name:"Pº. Recoletos", color:'Orange'}, "28079002": {name:"Glta. de Carlos V", color:'Cyan'},
			"28079003": {name:"Pza. del Carmen", color:'Teal'}, "28079035": {name:"Pza. del Carmen", color:'Teal'},
			"28079004": {name:"Pza. de España", color:'Lavender'},
			"28079005": {name:"Barrio del Pilar", color:'Purple'}, "28079039": {name:"Barrio del Pilar", color:'Purple'},
			"28079006": {name:"Pza. Dr. Marañón", color:'Brown'},
			"28079007": {name:"Pza. M. de Salamanca", color:'Beige'}, "28079008": {name:"Escuelas Aguirre", color:'Maroon'},
			"28079009": {name:"Pza. Luca de Tena", color:'Mint'},
			"28079010": {name:"Cuatro Caminos", color:'Gold'},	"28079038": {name:"Cuatro Caminos", color:'Gold'},
			"28079011": {name:"Av. Ramón y Cajal", color:'Olive'}, "28079012": {name:"Pza. Manuel Becerra", color:'DarkGoldenRod'},
			"28079013": {name:"Vallecas", color:'Coral'}, "28079040": {name:"Vallecas", color:'Coral'},
			"28079014": {name:"Pza. Fdez. Ladreda", color:'CornflowerBlue'}, "28079015": {name:"Pza. Castilla", color:'DarkSalmon'},
			"28079016": {name:"Arturo Soria", color: 'DeepSkyBlue'}, "28079017": {name:"Villaverde Alto", color:'Fuchsia'},
			"28079018": {name:"C/ Farolillo", color:'FireBrick'}, "28079019": {name:"Huerta Castañeda", color:'IndianRed'}, "28079020": {name:"Moratalaz", color:'LawnGreen'},
			"28079036": {name:"Moratalaz II", color:'LawnGreen'}, "28079021": {name:"Pza. Cristo Rey", color:'LightCoral'}, "28079022": {name:"Pº. Pontones", color:'LightPink'},
			"28079023": {name:"Final C/ Alcalá", color:''},
			"28079024": {name:"Casa de Campo", color:'LimeGreen'}, "28079025": {name:"Santa Eugenia", color:'LightSeaGreen'},
			"28079026": {name:"Urb. Embajada (Barajas)", color:'Magenta'}, "28079027": {name:"Barajas", color:'MediumBlue'},
			"28079047": {name:"Méndez Álvaro", color:'MediumSpringGreen'}, "28079048": {name:"Pº. Castellana Alta", color:'OrangeRed'}, "28079049": {name:"Retiro", color:'Orchid'},
			"28079050": {name:"Pza. Castilla", color:'DarkSalmon'},
			"28079054": {name:"Ensanche Vallecas", color:'Coral'}, "28079055": {name:"Urb. Embajada (Barajas)", color:'Magenta'},
			"28079056": {name:"Pza. Fdez. Ladreda", color:'CornflowerBlue'}, "28079057": {name:"Sanchinarro", color:'YellowGreen'},
			"28079058": {name:"El Pardo", color:'Peru'}, "28079059": {name:"Parque Juan Carlos I", color:'Violet'},
			"28079086": {name:"Tres Olivos", color:'Turquoise'},"28079060": {name:"Tres Olivos", color:'Turquoise'}},
 zonas:{"Interior-M30":["28079008","28079048","28079015","28079050","28079011", "28079010", "28079038", "28079004","28079005","28079039","28079003","28079035","28079047","28079049"],
           "Sureste":     ["28079020","28079036","28079013","28079040","28079054"],
		   "Noreste":     ["28079016","28079057","28079026","28079055","28079027","28079086","28079060","28079059"],
		   "Noroeste":    ["28079058","28079024"],
		   "Suroeste":    ["28079014","28079056","28079018","28079017"]},
// https://gestiona.madrid.org/azul_internet/html/web/2_3.htm?ESTADO_MENU=2_3
 magnitudes:{"01": {name: "Dioxido de Azufre",     abrv:"SO2",   unidad:"µg/m3", mediaHoraria:{limite: 350}, mediaDiaria:{limite: 125}},
			 "06": {name: "Monoxido de Carbono",   abrv:"CO",    unidad:"mg/m3", maximaDiaria:{limite: 10}},
			 "07": {name: "Monoxido de Nitrogeno", abrv:"NO",    unidad:"µg/m3"},
			 "08": {name: "Dioxido de Nitrogeno",  abrv:"NO2",   unidad:"µg/m3", mediaAnual:{limite:40}, mediaHoraria:{limite: 200}},
			 "09": {name: "Particulas < 2.5 um",   abrv:"PM2,5", unidad:"µg/m3", mediaAnual:{limite: 25}},
			 "10": {name: "Particulas < 10 um",    abrv:"PM10",  unidad:"µg/m3", mediaDiaria:{limite: 50}, mediaAnual:{limite:40}},
			 "12": {name: "Oxidos de Nitrogeno",   abrv:"NOx",   unidad:"µg/m3", mediaAnual:{critico: 30}},
			 "14": {name: "Ozono Troposférico",    abrv:"O3",    unidad:"µg/m3", maximaDiaria: {objetivo: 120, alerta:240, informacion:180}},
			 "19": {name: "Plomo",                 abrv:"Pb"},
			 "20": {name: "Tolueno",               abrv:"TOL",   unidad:"µg/m3"},
			 "28": {name: "Cadmio",                abrv:"Cd"},
			 "30": {name: "Benceno",               abrv:"BEN",   unidad:"µg/m3", mediaAnual:{limite:5}},
			 "35": {name: "Etilbenceno",           abrv:"EB",    unidad:"µg/m3"},
			 "37": {name: "Metaxileno",            abrv:"m-Xil", unidad:"µg/m3"},
			 "38": {name: "Paraxileno",            abrv:"PXY",   unidad:"µg/m3"},
			 "39": {name: "Ortoxileno",            abrv:"OXY",   unidad:"µg/m3"},
			 "42": {name: "Hidrocarburos totales(hexano)", abrv:"TCH", unidad:"mg/m3"},
			 "43": {name: "Metano",                abrv:"Ch4",   unidad:""},
			 "44": {name: "Hidrocarburos no metanicos (hexano)", abrv:"NMHC", unidad:"mg/m3"}},
onLoad:[],
getLimite : function(magnitud){
	var valor=null;
	if(magnitud!=undefined){
		if('maximaDiaria' in magnitud) valor={valor: magnitud.maximaDiaria, name:'maximaDiaria', limite:-1};
		else if('mediaHoraria' in magnitud) valor={valor: magnitud.mediaHoraria, name:'mediaHoraria', limite:-1};
		else if('mediaDiaria' in magnitud) valor={valor: magnitud.mediaDiaria, name:'mediaDiaria', limite:-1};
		else if('mediaAnual' in magnitud) valor={valor: magnitud.mediaAnual, name:'mediaAnual', limite:-1};
	}
	if(valor!=null && 'limite' in valor.valor) {valor.limite=valor.valor.limite; valor.over='limite'}
	else if(valor!=null && 'critico' in valor.valor) {valor.limite=valor.valor.critico; valor.over='critico'}
	else if(valor!=null && 'alerta' in valor.valor) {valor.limite=valor.valor.alerta; valor.over='alerta'}
	else if(valor!=null && 'informacion' in valor.valor) {valor.limite=valor.valor.informacion*1.5; valor.over='informacion'}
	else if(valor!=null && 'objetivo' in valor.valor) {valor.limite=valor.valor.objetivo*2; valor.over='objetivo'}
	else valor={limite: -1};
	//info('limite en '+magnitud.name+'='+valor.limite);
	return valor;
},

getOverflowSomeLimit : function(line){ // Devuelve el % de overflow sobre el limite establecido
	//if(line.magnitude=='12') return -1;
	var mag=data.magnitudes[line.magnitude];
	//info(line.magnitude+"-->"+mag);
	var limite = data.getLimite(mag);
	var overflow=0;
	if('maximaDiaria' in mag) overflow = line.maxHour!=-1?line.values[line.maxHour]:0;
	else overflow = line.avgValue;
	if (overflow/limite.limite>.5) info(mag.name+' overflow='+overflow+' limite='+limite.limite+' '+limite.name+' '+limite.over);
	return overflow/limite.limite;
},

getZona : function(line){
	for(zona in this.zonas){
		var estaciones = this.zonas[zona];
		for(var i=0; i<estaciones.length; i++) if(estaciones[i]==line.station) return zona;
	}
	return '';
},

getLines : function(){
	if(this.lines.length>0) return this.lines;
	info('callAjax');
	var HttpClient = function() {
		this.get = function(aUrl, aCallback) {
			var httpRq = new XMLHttpRequest();
			httpRq.onerror = function(e){
				//aCallback('28,079,059,10,08,02,2018,10,21,00017,V,00012,V,00006,V,00007,V,00004,V,00005,V,00016,V,00019,V,00012,V,00022,V,00014,V,00008,V,00012,V,00005,V,00003,V,00002,V,00001,V,00000,N,00000,N,00000,N,00000,N,00000,N,00000,N,00000,N\n28,079,055,10,02,02,2018,10,21,01.27,V,01.27,V,01.27,V,01.27,V,01.27,V,01.26,V,01.26,V,01.26,V,01.30,V,01.27,V,01.27,V,01.27,V,01.27,V,01.27,V,01.28,V,01.27,V,01.26,V,00000,N,00000,N,00000,N,00000,N,00000,N,00000,N,00000,N\n28,079,004,10,48,02,2018,10,21,000.3,V,000.3,V,000.3,V,000.3,V,000.2,V,000.2,V,000.2,V,000.3,V,000.2,V,000.2,V,000.3,V,000.3,V,000.3,V,000.3,V,000.4,V,000.3,V,00040,V,00020,V,00005,V,00010,V,00008,V,00002,V,00015,V,00000,N');
				info('fallo. leemos fichero');
				if(data.lines.length==0) data.readTextFile('data.txt');
			};
			httpRq.onreadystatechange = function() {
				info('gl onreadystatechange: readyState='+httpRq.readyState+' status='+httpRq.status+' text='+httpRq.responseText);
				if (httpRq.readyState == 4 && httpRq.status == 200){
					aCallback(httpRq.responseText);
				}
				else if(data.lines.length==0) data.readTextFile('data.txt');
			}

			httpRq.open( "GET", aUrl, true );            
			/*httpRq.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
			httpRq.setRequestHeader("Access-Control-Allow-Origin", "*");
			httpRq.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			httpRq.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
			httpRq.withCredentials = true;*/
			httpRq.send(  );
			var lastCallAjax = new Date().getTime(); // milliseconds since midnight, January 1, 1970
		}
	}
	var client = new HttpClient();
	client.get('http://www.mambiente.munimadrid.es/opendata/horario.txt', function(response) {
		data.setLinesFromStr(response);
	});
	return this.lines;
},

setLinesFromStr : function(response){
	info('response received');
	var linesStr = response.split(/\r?\n/);
	data.lines.splice(0, data.lines.length);

	for(var i=0; i<linesStr.length; i++){
		var cols=linesStr[i].split(',');
		if(cols.length>9){
			var line={station: cols[0]+cols[1]+cols[2], magnitude:cols[3], tech:cols[4], day:cols[6]+cols[7]+cols[8], values:data.parseValues(cols.slice(9))};
			data.setStatistics(line);
			data.lines.push(line);
			//linesBak=lines.slice(); //copy
			//info(line.station+' '+line.magnitude+'('+data.getLimite(data.magnitudes[line.magnitude])+') '+line.day+' '+line.values.length);
		}
	}
	info(data.lines.length+' lines loaded');
	////
	info('Llamando a '+data.onLoad.length+' funciones');
		if(data.onLoad.length>0){
			for(var i=0; i<data.onLoad.length; i++) data.onLoad[i]();
		}
},

removeEmptyLines : function(lines){
	info('1 lines.length='+lines.length);
	for(var i=lines.length-1; i>=0; i--) if(this.isEmpty(lines[i])) lines.splice(i, 1);
	info('2 lines.length='+lines.length);
	return lines;
},

isEmpty : function(line){
	empty=true;
	for(var i=0; i < line.values.length && empty; i++) if(line.values[i]!=-1) empty=false;
	return empty;
},

readTextFile : function(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true); // ["GET", "POST", "PUT", "DELETE"] , URL , ASYNC
    rawFile.onreadystatechange = function (){
		info('XMLHttpRequest.onreadystatechange.status='+rawFile.status);
        if(rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)){
			var allText = rawFile.responseText;
            data.setLinesFromStr(allText);
        }
    }
    rawFile.send(null);
},

setStatistics : function(line){
	var maxValue=-1, minValue=999999999999, sumValues=0, cntValues=0;
	var maxHour=-1, minHour=-1;
	for(var i=0; i<line.values.length; i++){
		if(line.values[i]>maxValue){maxValue=line.values[i]; maxHour=i;}
		if(line.values[i]<minValue && line.values[i]!=-1){minValue=line.values[i]; minHour=i;}
		if(line.values[i]!=-1) {sumValues+=line.values[i]; cntValues++}
	}
	line.maxHour=maxHour;
	line.minHour=minHour;
	line.sumValues=sumValues;
	line.cntValues=cntValues;
	line.avgValue=cntValues==0?-1:sumValues/cntValues;
	// Mediana:
	var values=this.filterBySignificantValues(line.values);
	var idxMitad=Math.trunc(values.length/2)-1;
	line.medianValue=values.length>0?(values.length%2==0?(values[idxMitad]+values[idxMitad+1])/2:values[idxMitad]):-1;
},

sortAscByMax : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		var v1 = a.maxHour==-1?-1:a.values[a.maxHour];
		var v2 = b.maxHour==-1?-1:b.values[b.maxHour];
		return v1 - v2;
	});
	info(lines.length+' lines sorted asc by max');
	return x;
},

sortDescByMax : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		var v1 = a.maxHour==-1?-1:a.values[a.maxHour];
		var v2 = b.maxHour==-1?-1:b.values[b.maxHour];
		return v2 - v1;
	});
	info(lines.length+' lines sorted asc by max');
	return x;
},

sortAscByAvg : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		return a.avgValue - b.avgValue;
	});
	info(lines.length+' lines sorted asc by avg');
	return x;
},

sortAscByCntValues : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		return a.cntValues - b.cntValues;
	});
	info(lines.length+' lines sorted asc by cntValues');
	return x;
},

sortAscByMedian : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		return a.medianValue - b.medianValue;
	});
	info(lines.length+' lines sorted asc by median');
	return x;
},

filterBySignificantValues:function(values){
	var result=[];
	if(values!=null && values.length>0){
		for(var i=0; i<values.length; i++){
			if(values[i]!=-1) result.push(values[i]);
		}
	}
	return result;
},
filterByZone:function(zoneName, lines){
	var st=this.zonas[zoneName];
	info(st);
	var result=[];
	if(st!=null && st.length>0){
		for(var i=0; i<st.length; i++){
			var s = st[i];
			for(var j=0; j<lines.length; j++) if(lines[j].station==s) result.push(lines[j]);
		}
	}
	info(result.length+' zones '+zoneName+' in '+lines.length+' lines found');
	return result;
},

filterByStation : function(inStation, lines){
	var linesInStation=[];
	for(var i=0; i<lines.length; i++) if(lines[i].station==inStation) linesInStation.push(lines[i]);
	return linesInStation;
},

filterByMagnitude : function(inMagnitude, lines){
	var linesInMagnitude=[];
	for(var i=0; i<lines.length; i++) if(lines[i].magnitude==inMagnitude) linesInMagnitude.push(lines[i]);
	info(linesInMagnitude.length+' linesInMagnitude found of '+inMagnitude+' in '+lines.length+' lines.length');
	return linesInMagnitude;
},

lastIdxWithoutValue : function(values){
	var i;
	for(i=values.length-1; i>=0 && values[i]==-1; i--){}; // Aqui quitamos las ultimas horas sin valor
	return i;
},

maxIdxValueWithoutValue: function(lines){
	var max=0;
	for(idxLine in lines){
		var idx=this.lastIdxWithoutValue(lines[idxLine].values);
		if(idx>max) max=idx;
	}
	return max;
},

removeLastDataWithoutValue: function(valuesIn){
	var values=[];
	for(var i=0; i<valuesIn.length; i++) values.push(valuesIn[i]);
	values.splice(this.lastIdxWithoutValue(values)); // Aqui quitamos las ultimas horas sin valor
	return values;
},

getValues : function(lines){
	var values=[];
	for(var i=0; i<lines.length; i++) for(var j=0; j<lines[i].values.length; j++) if(lines[i].values[j]!=-1) values.push(lines[i].values[j]);
	return values;
},

parseValues : function(lista){
	valores=[];
	for(var i=1; i<lista.length; i+=2) valores[valores.length]=lista[i]=='V'?parseFloat(lista[i-1]):-1;
	return valores;
},

maxValue : function(lines){
	var maxValue=-1;
	for(var i=0; i<lines.length; i++){
		var l=lines[i];
		if(l.values[l.maxHour]>maxValue) maxValue=l.values[l.maxHour];
	}
	return maxValue;
}

}

//var myp5 = new p5(sketch, document.getElementById('pieChart'));
