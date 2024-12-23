const array = JSON.parse(json);
const length = Object.keys(array).length;

function WriteHTML(id, contents){
	document.getElementById(id).innerHTML = contents;
}

function WriteSrc(id, url){
	document.querySelector(id).setAttribute("src", url);
}



function Hide(column){
	const dirID = "#dir" + column;
	const typeID = "#type" + column;
	WriteSrc(dirID, "");
	WriteHTML("time"+column, "");
	WriteSrc(typeID, "");
	WriteHTML("dst"+column, "");
}

function Display(column){
	if( i+column < length ){
		const dirID = "#dir" + column;
		if(array[i+column].dir == 0){ WriteSrc(dirID, "./direction/up.SVG"); }
		if(array[i+column].dir == 1){ WriteSrc(dirID, "./direction/down.SVG"); }

		WriteHTML("time"+column, array[i+column].time);

		const typeID = "#type" + column;
		if(array[i+column].type == 0){ WriteSrc(typeID, "./type/local.SVG"); }
		if(array[i+column].type == 1){ WriteSrc(typeID, "./type/rapid.SVG"); }
		if(array[i+column].type == 2){ WriteSrc(typeID, "./type/semi.SVG"); }
		if(array[i+column].type == 3){ WriteSrc(typeID, "./type/express.SVG"); }				
		if(array[i+column].type == 4){ WriteSrc(typeID, "./type/special.SVG"); }
		if(array[i+column].type == 5){ WriteSrc(typeID, "./type/liner.SVG"); }
		if(array[i+column].type == 6){ WriteSrc(typeID, "./type/takao.SVG"); }
		const mod = Math.floor( Sec / SwitchInterval ) % 2;
		if(array[i+column].type == 30){
			if( mod == 0 ){ WriteSrc(typeID, "./type/express.SVG"); }
			if( mod == 1 ){ WriteSrc(typeID, "./type/takahatafudo.SVG"); } 
		}
		if(array[i+column].type == 40){
			if( mod == 0 ){ WriteSrc(typeID, "./type/special.SVG"); }
			if( mod == 1 ){ WriteSrc(typeID, "./type/takahatafudo.SVG"); } 
		}

		WriteHTML("dst"+column, array[i+column].dst);
	}else{
		Hide(column);
	}
}

function Blink(column){
	const mod = Sec % BlinkInterval;
	if( mod == 0 ){
		Display(column);
		WriteHTML("info", "電車がきます。ご注意ください。");
		document.querySelector("#info").style.color = "#f43";
	}else{
		Hide(column);
		WriteHTML("info", "");
	}
}



function Main(){

	const RealTime = new Date();
	const Hour = RealTime.getHours();
	const Min = RealTime.getMinutes();
	Sec = RealTime.getSeconds();
	BlinkInterval = 2;
	SwitchInterval = 7.5;

	if( Hour >= 1 ){
		var N = Hour * 60 + Min;
	}else{
		var N = ( Hour + 24 ) * 60 + Min;
	}
	
	//var N = 1460;

	const TimeStr = RealTime.toLocaleTimeString('ja-JP', {hour12:false});
	WriteHTML("realtime",TimeStr);

	if( 270 < N ){
		for( i = 0; i < length; i++ ){
			if( N <= array[i].n ){
				if( N == array[i].n ){
					Blink(0);
				}else{
					Display(0);
				}
				Display(1);
				Display(2);
				Display(3);
				Display(4);
				break;
			}
		}
	}else{
		WriteHTML("info", "◆本日の運転は終了しました◆");
		document.querySelector("#info").style.color = "#f43";
	}
}



setInterval(Main,1000);