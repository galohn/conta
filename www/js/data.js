var data =  {
 lines:[], //, linesBak=[];
// http://www.mambiente.munimadrid.es/opencms/export/sites/default/calaire/Anexos/INTPHORA-DIA.pdf
 estaciones:{"28079001": {name:"Pº. Recoletos", color:'Orange'}, "28079002": {name:"Glta. de Carlos V", color:'Cyan'},
			"28079003": {name:"Pza. del Carmen", color:'Teal'}, "28079035": {name:"Pza. del Carmen", color:'Teal'},
			"28079004": {name:"Pza. de España", color:'Lavender'},
			"28079005": {name:"Barrio del Pilar", color:'Purple'}, "28079039": {name:"Barrio del Pilar", color:'Purple'},
			"28079006": {name:"Pza. Dr. Marañón", color:'Brown'},
			"28079007": {name:"Pza. M. de Salamanca", color:'Beige'}, "28079008": {name:"Escuelas Aguirre", color:'Tomato'}, // Maroon es rojo
			"28079009": {name:"Pza. Luca de Tena", color:'Mint'},
			"28079010": {name:"Cuatro Caminos", color:'Gold'},	"28079038": {name:"Cuatro Caminos", color:'Gold'},
			"28079011": {name:"Av. Ramón y Cajal", color:'Olive'}, "28079012": {name:"Pza. Manuel Becerra", color:'DarkGoldenRod'},
			"28079013": {name:"Vallecas", color:'Coral'}, "28079040": {name:"Vallecas", color:'Coral'}, "28079054": {name:"Ensanche Vallecas", color:'Coral'},
			"28079014": {name:"Pza. Fdez. Ladreda", color:'CornflowerBlue'}, "28079015": {name:"Pza. Castilla", color:'DarkSalmon'},
			"28079016": {name:"Arturo Soria", color: 'DeepSkyBlue'}, "28079017": {name:"Villaverde Alto", color:'Fuchsia'},
			"28079018": {name:"c/Farolillo", color:'FireBrick'}, "28079019": {name:"Huerta Castañeda", color:'IndianRed'}, "28079020": {name:"Moratalaz", color:'LawnGreen'},
			"28079036": {name:"Moratalaz II", color:'LawnGreen'}, "28079021": {name:"Pza. Cristo Rey", color:'LightCoral'}, "28079022": {name:"Pº. Pontones", color:'LightPink'},
			"28079023": {name:"Final c/Alcalá", color:'DarkKhaki'},
			"28079024": {name:"Casa de Campo", color:'LimeGreen'}, "28079025": {name:"Santa Eugenia", color:'LightSeaGreen'},
			"28079026": {name:"Urb. Embajada", color:'Magenta'}, "28079055": {name:"Urb. Embajada", color:'Magenta'},
			"28079027": {name:"Barajas", color:'MediumBlue'},
			"28079047": {name:"Méndez Álvaro", color:'MediumSpringGreen'}, "28079048": {name:"Pº. Castellana Alta", color:'OrangeRed'}, "28079049": {name:"Retiro", color:'Orchid'},
			"28079050": {name:"Pza. Castilla", color:'DarkSalmon'},
			"28079056": {name:"Pza. Fdez. Ladreda", color:'CornflowerBlue'}, "28079057": {name:"Sanchinarro", color:'YellowGreen'},
			"28079058": {name:"El Pardo", color:'Peru'}, "28079059": {name:"Parque Juan Carlos I", color:'Violet'},
			"28079086": {name:"Tres Olivos", color:'Turquoise'},"28079060": {name:"Tres Olivos", color:'Turquoise'}},
 zonas:{"Interior-M30":["28079008","28079048","28079015","28079050","28079011", "28079010", "28079038", "28079004","28079005","28079039","28079003","28079035","28079047","28079049"],
           "Sureste":     ["28079020","28079036","28079013","28079040","28079054"],
		   "Noreste":     ["28079016","28079057","28079026","28079055","28079027","28079086","28079060","28079059"],
		   "Noroeste":    ["28079058","28079024"],
		   "Suroeste":    ["28079014","28079056","28079018","28079017"]},
// https://gestiona.madrid.org/azul_internet/html/web/2_3.htm?ESTADO_MENU=2_3
 magnitudes:{"01": {name: "Dioxido de Azufre",     abrv:"SO2",   unidad:"µg/m3", mediaHoraria:{limite: 350}, mediaDiaria:{limite: 125}, descripcion:"El SO2 es un gas incoloro", efectos: "A altas concentraciones puede ser detectado por su sabor y por su olor cáustico e irritante"},
			 "06": {name: "Monoxido de Carbono",   abrv:"CO",    unidad:"mg/m3", maximaDiaria:{limite: 10}, descripcion:"Es un gas sin olor ni color. Se encuentra en el humo de la combustión, como lo es el expulsado por automóviles y camiones, candelabros, estufas, fogones de gas y sistemas de calefacción", efectos:"El monóxido de carbono inhalado se combina con la hemoglobina de la sangre provocando la diminución de oxígeno suministrado al cuerpo. Respirar concentraciones de monóxido de carbono puede inducir dolor de cabeza, náuseas, cansancio y dificultad de pensar con claridad"},
			 "07": {name: "Monoxido de Nitrogeno", abrv:"NO",    unidad:"µg/m3", descripcion: "El monóxido de nitrógeno (NO) es un gas incoloro y poco soluble en agua, presente en pequeñas cantidades en los mamíferos. Está también extendido por el aire siendo producido en automóviles y plantas de energía. Se considera un agente tóxico", efectos: "El óxido nitroso (NO) se forma por reacción del nitrógeno atmosférico y del oxígeno en las cámaras de combustión de los motores, a alta temperatura y presión. En las concentraciones en que se produce no es contaminante, pero en el aire se oxida a dióxido de nitrógeno (No2)' importante elemento de la niebla fotoquímica o smog, que se produce en las grandes ciudades."},
			 "08": {name: "Dioxido de Nitrogeno",  abrv:"NO2",   unidad:"µg/m3", mediaAnual:{limite:40}, mediaHoraria:{limite: 200, alerta: 400}, descripcion:"La química atmosférica de los óxidos de nitrógeno es muy compleja. La mayoría de las combustiones liberan sobre todo óxido nítrico, el cual se convierte fácilmente en dióxido de nitrógeno en la atmósfera. La oxidación del NO a NO2 por oxidantes atmosféricos como el ozono, ocurre rápidamente, siendo esta una de las principales rutas de producción del NO2", efectos:"Respirar altos niveles de dióxido de nitrógeno durante poco tiempo perjudica las células pulmonares."},
			 "09": {name: "Particulas <2.5 um",    abrv:"PM2,5", unidad:"µg/m3", mediaAnual:{limite: 25}, descripcion:"Partículas de diámetro aerodinámico inferior o igual a los 2,5 micras (polvo, cenizas, hollín, partículas metálicas, cemento y polen, entre otras). Su origen está principalmente en fuentes de carácter antropogénico como las emisiones de los vehículos diesel.", efectos:"Las partículas PM2,5 tienen efectos más severos sobre la salud que las más grandes, PM10. Asimismo, su tamaño hace que sean más ligeras y por eso, generalmente, permanecen por más tiempo en el aire. Ello no sólo prolonga sus efectos, sino que facilita su transporte por el viento a grandes distancias. Las partículas PM2,5, por tanto, se pueden acumular en el sistema respiratorio y están asociadas, cada vez con mayor consistencia científica, con numerosos efectos negativos sobre la salud, como el aumento de las enfermedades respiratorias y la disminución del funcionamiento pulmonar"},
			 "10": {name: "Particulas <10 um",     abrv:"PM10",  unidad:"µg/m3", mediaDiaria:{limite: 50}, mediaAnual:{limite:40}, descripcion:"Partículas de diámetro aerodinámico inferior o igual a los 2,5 micras (polvo, cenizas, hollín, partículas metálicas, cemento y polen, entre otras). Pueden tener en su composición un importante componente de tipo natural", efectos:"La exposición prolongada o repetitiva a las PM10 puede provocar efectos nocivos en el sistema respiratorio de la persona, no obstante son menos perjudiciales que las PM2,5 ya que al tener un mayor tamaño, no logran atravesar los alveolos pulmonares, quedando retenidas en la mucosa que recubre las vías respiratorias superiores."},
			 "12": {name: "Oxidos de Nitrogeno",   abrv:"NOx",   unidad:"µg/m3", descripcion:"Los óxidos de nitrógeno son un grupo de gases compuestos por óxido nítrico (NO) y dióxido de nitrógeno (NO2). El término NOX se refiere a la combinación de ambas sustancias", efectos:"Es una sustancia corrosiva para la piel y el tracto respiratorio. Una exposición prolongada puede afectar al sistema inmune y al pulmón, dando lugar a una menor resistencia frente a infecciones"},
			 "14": {name: "Ozono Troposférico",    abrv:"O3",    unidad:"µg/m3", maximaDiaria: {objetivo: 120}, mediaHoraria: {alerta:240, informacion:180}, descripcion:"El ozono (O3) es un gas azulado, de olor irritante y muy reactivo.", efectos:"El ozono troposférico, derivado principalmente de las emisiones del tráfico, causa graves problemas sobre la salud humana, especialmente en días soleados."},
			 "19": {name: "Plomo",                 abrv:"Pb",    descripcion:"El plomo es un metal altamente tóxico que está presente en gran parte de las actividades que desempeña el hombre", efectos:"El plomo es una sustancia tóxica que se va acumulando en el organismo afectando a diversos sistemas del organismo. No existe un nivel de exposición al plomo que pueda considerarse seguro."},
			 "20": {name: "Tolueno",               abrv:"TOL",   unidad:"µg/m3", descripcion:"Tolueno es un líquido incoloro transparente con un olor característico. Es un buen solvente.", efectos:"Exposiciones repetidas durante unas semanas puede producir dolores de cabeza y somnolencia y puede alterar la capacidad para pensar claramente. La exposición diaria en el trabajo a cantidades moderadas puede producir cansancio, confusión, debilidad, sensación de embriaguez, pérdida de la memoria, náusea y pérdida del apetito"},
			 "28": {name: "Cadmio",                abrv:"Cd",    descripcion:"Es un metal pesado, blando, blanco azulado, relativamente poco abundante. Es uno de los metales más tóxicos. Normalmente se encuentra en menas de zinc y se emplea especialmente en pilas.", efectos:"Altos niveles de Cadmio puede dañar severamente los pulmones."},
			 "30": {name: "Benceno",               abrv:"BEN",   unidad:"µg/m3", mediaAnual:{limite:5}, descripcion:"El benceno, conocido también como benzol, es un líquido incoloro de olor dulce y es sumamente inflamable.", efectos:"La exposición puede producir letargo, mareo, aceleración del latido del corazón, dolor de cabeza, temblores, confusión y pérdida del conocimiento. En la mayoría de los casos, los efectos desaparecerán cuando la exposición termina y la persona empieza a respirar aire fresco."},
			 "35": {name: "Etilbenceno",           abrv:"EB",    unidad:"µg/m3", descripcion:"El etilbenceno es un líquido incoloro que se encuentra en numerosos productos entre los que se incluyen la gasolina y pinturas.", efectos:"Respirar niveles muy altos de etilbenceno produce mareo e irritación de los ojos y la garganta."},
			 "37": {name: "Metaxileno",            abrv:"m-Xil", unidad:"µg/m3", descripcion:"Líquido incoloro de olor característico", efectos:"Vértigo. Somnolencia. Dolor de cabeza y náuseas."},
			 "38": {name: "Paraxileno",            abrv:"PXY",   unidad:"µg/m3", descripcion:"En condiciones normales, son líquidos incoloros e inflamables con un característico olor parecido al tolueno.", efectos:"En contacto con la piel y los ojos, este compuesto puede provocar irritación, enrojecimiento y dolores agudos."},
			 "39": {name: "Ortoxileno",            abrv:"OXY",   unidad:"µg/m3", descripcion:"Se trata de líquidos incoloros e inflamables con un característico olor parecido al tolueno.", efectos:"Los xilenos son nocivos. Sus vapores pueden provocar dolor de cabeza, náuseas y malestar general."},
			 "42": {name: "Hidrocarburos totales", abrv:"TCH", unidad:"mg/m3", descripcion:"El n-hexano es un sustancia química elaborada a partir del petróleo crudo. El n-hexano puro es un líquido incoloro con un olor ligeramente desagradable. Se evapora fácilmente en el aire y se disuelve muy poco en el agua.", efectos:"Esta sustancia puede causar efectos sobre: el sistema nervioso, generar irritación en las vías respiratorias, producir vértigo, somnolencia, dolor de cabeza, dificultad al respirar."},
			 "43": {name: "Metano",                abrv:"Ch4",   unidad:" ", descripcion:"El metano es uno de los principales gases del efecto invernadero, su efecto negativo sobre el calentamiento del planeta es 21 veces mayor que el del dióxido de carbono. El metano se produce por fuentes naturales.", efectos:"El metano no es tóxico y no es peligroso si se inhala en pequeñas cantidades; sin embargo, si una gran cantidad de gas natural o metano desplaza el aire, la falta de oxígeno podría provocar asfixia."},
			 "44": {name: "Hidrocarburos no metanicos", abrv:"NMHC", unidad:"mg/m3", descripcion:"El n-hexano es un sustancia química elaborada a partir del petróleo crudo. El n-hexano puro es un líquido incoloro con un olor ligeramente desagradable. Se evapora fácilmente en el aire y se disuelve muy poco en el agua.", efectos:"Esta sustancia puede causar efectos sobre: el sistema nervioso, generar irritación en las vías respiratorias, producir vértigo, somnolencia, dolor de cabeza, dificultad al respirar."}},
onLoad:[],
getLimite : function(magnitud){
	var valor=null;
	if(magnitud!=undefined){
		if('maximaDiaria' in magnitud) valor={valor: magnitud.maximaDiaria, name:'maximaDiaria', limite:-1};
		else if('mediaDiaria' in magnitud) valor={valor: magnitud.mediaDiaria, name:'mediaDiaria', limite:-1};
		else if('mediaAnual' in magnitud) valor={valor: magnitud.mediaAnual, name:'mediaAnual', limite:-1};
		else if('mediaHoraria' in magnitud) valor={valor: magnitud.mediaHoraria, name:'mediaHoraria', limite:-1};
	}
	if(valor!=null && 'limite' in valor.valor) {valor.limite=valor.valor.limite; valor.over='limite'}
	else if(valor!=null && 'critico' in valor.valor) {valor.limite=valor.valor.critico; valor.over='critico'}
	else if(valor!=null && 'alerta' in valor.valor) {valor.limite=valor.valor.alerta; valor.over='alerta'}
	else if(valor!=null && 'informacion' in valor.valor) {valor.limite=valor.valor.informacion*1.5; valor.over='informacion'}
	else if(valor!=null && 'objetivo' in valor.valor) {valor.limite=valor.valor.objetivo*1.5; valor.over='objetivo'}
	else valor={limite: -1};
	// info('limite en '+magnitud.name+'='+valor.limite);
	return valor;
},

getOverflowSomeLimit : function(line){ // Devuelve el % de overflow sobre el limite establecido
	//if(line.magnitude=='12') return -1;
	if (data.magnitudes[line.magnitude] == undefined) return 0;
	else{
		var mag=data.magnitudes[line.magnitude];
		//info(line.magnitude+"-->"+mag);
		var limite = data.getLimite(mag);
		var overflow=0;
		if('maximaDiaria' in mag) overflow = line.maxHour!=-1?line.values[line.maxHour]:0;
		else overflow = Math.max(line.medianValue, line.avgValue);
		if (overflow/limite.limite>.5)
			debug(mag.name+' overflow='+overflow+' limite='+limite.limite+' '+limite.name+' '+limite.over);
		return limite.limite==-1?-1:overflow/limite.limite;
	}
},

getZonaEstacion : function(station){
	for(zona in this.zonas){
		var estaciones = this.zonas[zona];
		for(var i=0; i<estaciones.length; i++) if(estaciones[i]==station) return zona;
	}
	return '';
},

getZona : function(line){
	return data.getZonaEstacion(line.station);
},

getLines : function(){
	//if(this.lines.length>0) return this.lines;
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
				info('gl onreadystatechange: readyState='+httpRq.readyState+' status='+httpRq.status+' text='+httpRq.responseText.length);
				if (httpRq.readyState == 4 && httpRq.status == 200){
					aCallback(httpRq.responseText);
				}
				//else if(data.lines.length==0) data.readTextFile('data.txt');
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
	client.get('http://www.mambiente.madrid.es/opendata/horario.txt', function(response) {
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
	debug('1 lines.length='+lines.length);
	for(var i=lines.length-1; i>=0; i--) if(this.isEmpty(lines[i])) lines.splice(i, 1);
	debug('2 lines.length='+lines.length);
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
		info('readTextFile XMLHttpRequest.onreadystatechange.status='+rawFile.status);
        if(rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)){
			var allText = rawFile.responseText;
            data.setLinesFromStr(allText);
        }
    }
    rawFile.send(null);
},

hasDecimals : function(lines){
	for(var i=0; i<lines.length; i++)
		if(lines[i].hasDecimals) return true;
	return false;
},

setStatistics : function(line){
	var maxValue=-1, minValue=999999999999, sumValues=0, cntValues=0;
	var maxHour=-1, minHour=-1;
	line.hasDecimals=false;
	for(var i=0; i<line.values.length; i++){
		if(line.values[i]>maxValue){maxValue=line.values[i]; maxHour=i;}
		if(line.values[i]<minValue && line.values[i]!=-1){minValue=line.values[i]; minHour=i;}
		if(line.values[i]!=-1) {sumValues+=line.values[i]; cntValues++}
		line.hasDecimals=line.hasDecimals||(line.values[i]!=Math.round(line.values[i]));
	}
	line.maxHour=maxHour;
	line.minHour=minHour;
	line.maxValue=maxHour==-1?-1:line.values[maxHour];
	line.minValue=minHour==-1?-1:line.values[minHour];
	line.sumValues=sumValues;
	line.cntValues=cntValues;
	line.avgValue=cntValues==0?-1:sumValues/cntValues;
	// Mediana:
	var values=this.sortValues(this.filterBySignificantValues(line.values));
	var idxMitad=Math.trunc(values.length/2)-1;
	line.medianValue=values.length>0?(values.length%2==0?(values[idxMitad]+values[idxMitad+1])/2:values[idxMitad]):-1;
},

sortValues : function(values){
	if(values!=null && values.length>0){
		values.sort(function (a,b) {
			return a - b;
		});
	}
	return values;
},

sortAscByMin : function(lines){
	// Ordena de menor a mayor según su mínimo valor en el dia
	var x=lines.sort(function(a, b) {
		var v1 = a.minHour==-1?-1:a.values[a.minHour];
		var v2 = b.minHour==-1?-1:b.values[b.minHour];
		return v1 - v2;
	});
	//info(lines.length+' lines sorted asc by min');
	return x;
},
sortDescByMin : function(lines){
	// Ordena de menor a mayor según su mínimo valor en el dia
	var x=lines.sort(function(a, b) {
		var v1 = a.minHour==-1?-1:a.values[a.minHour];
		var v2 = b.minHour==-1?-1:b.values[b.minHour];
		return v2 - v1;
	});
	//info(lines.length+' lines sorted desc by min');
	return x;
},

sortAscByMax : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		var v1 = a.maxHour==-1?-1:a.values[a.maxHour];
		var v2 = b.maxHour==-1?-1:b.values[b.maxHour];
		return v1 - v2;
	});
	//info(lines.length+' lines sorted asc by max');
	return x;
},

sortDescByMax : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		var v1 = a.maxHour==-1?-1:a.values[a.maxHour];
		var v2 = b.maxHour==-1?-1:b.values[b.maxHour];
		return v2 - v1;
	});
	//info(lines.length+' lines sorted asc by max');
	return x;
},

sortAscByAvg : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		return a.avgValue - b.avgValue;
	});
	//info(lines.length+' lines sorted asc by avg');
	return x;
},

sortDescByAvg : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		return b.avgValue - a.avgValue;
	});
	//info(lines.length+' lines sorted desc by avg');
	return x;
},

sortAscByCntValues : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		return a.cntValues - b.cntValues;
	});
	//info(lines.length+' lines sorted asc by cntValues');
	return x;
},

sortDescByCntValues : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		return b.cntValues - a.cntValues;
	});
	//info(lines.length+' lines sorted desc by cntValues');
	return x;
},

sortAscByMedian : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		return a.medianValue - b.medianValue;
	});
	//info(lines.length+' lines sorted asc by median');
	return x;
},

sortDescByMedian : function(lines){
	// Ordena de menor a mayor según su máximo valor en el dia
	var x=lines.sort(function(a, b) {
		return b.medianValue - a.medianValue;
	});
	//info(lines.length+' lines sorted desc by median');
	return x;
},

setMinMax : function(lines, obj){
	obj.max=lines[0];
	obj.min=lines[lines.length-1];
},

getStatistics : function(lines){
	var stat={value:{}, avg:{}, median:{}, cntValues:{}}; // object
	data.setMinMax(data.sortAscByMax(lines), stat.value);
	data.setMinMax(data.sortAscByAvg(lines), stat.avg);
	data.setMinMax(data.sortAscByMedian(lines), stat.median);
	data.setMinMax(data.sortAscByCntValues(lines), stat.cntValues);
	return stat;
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
filterByZones:function(zoneNames, lines){
	var st=[]
	for(var i=0; i<zoneNames.length; i++) for(var i2 in this.zonas[zoneNames[i]]) st.push(this.zonas[zoneNames[i]][i2]);
	debug(zoneNames);
	debug(st);
	var result=[];
	if(st!=null && st.length>0){
		for(var i=0; i<st.length; i++){
			var s = st[i];
			for(var j=0; j<lines.length; j++) if(lines[j].station==s) result.push(lines[j]);
		}
	}
	debug(result.length+' zones '+zoneNames.length+' in '+lines.length+' lines found');
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
	//info(linesInMagnitude.length+' linesInMagnitude found of '+inMagnitude+' in '+lines.length+' lines.length');
	return linesInMagnitude;
},

lastIdxWithValue : function(values){
	var i;
	for(i=values.length-1; i>=0 && values[i]==-1; i--){}; // Aqui buscamos la ultima horas con valor
	return i;
},

maxIdxValueWithoutValue: function(lines){
	var max=0;
	for(idxLine in lines){
		var idx=this.lastIdxWithValue(lines[idxLine].values);
		if(idx>max) max=idx;
	}
	return max+1;
},

removeLastDataWithoutValue: function(valuesIn){
	var values=[];
	for(var i=0; i<valuesIn.length; i++) values.push(valuesIn[i]);
	values.splice(this.lastIdxWithValue(values)+1); // Aqui quitamos las ultimas horas sin valor
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
