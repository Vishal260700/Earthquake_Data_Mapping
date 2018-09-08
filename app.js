let mapimg;

var clon = 0;
var clat = 0;
var zoom = 1;
var earthquakes;



function preload(){
	mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0/1024x512?access_token=pk.eyJ1IjoidmlzaGFsMjYwNzAwIiwiYSI6ImNqbHNtb3Z3cTBncmQzcWxieHVnaDFpdXgifQ.tLV__alrVz7n0LIUOc9R2w")
	earthquakes = loadStrings('./all_week.csv')
}

function mercX(lon){
	lon = radians(lon);
	var a = (256 / PI)*(pow(2,zoom));
	var b = lon + PI;
	return a*b;
}

function mercY(lat){
	lat = radians(lat);
	var a = (256 / PI)*(pow(2,zoom));
	var b = (PI-log(tan(PI/4 + lat/2)));
	return a*b;
}

function setup(){
	createCanvas(1024,460);
	translate(width/2,height/2);
	imageMode(CENTER)
	image(mapimg,0,0);

	var cx = mercX(clon);
	var cy = mercY(clat);

	for(var i = 0 ; i < earthquakes.length ; i++){
		var data = earthquakes[i].split(/,/);

		//console.log(data);

		var lat = data[1];
		var lon = data[2];

		var x = mercX(lon) - cx;
		var y = mercY(lat) - cy;

		var size = data[4];

		size = sqrt(pow(10,size));
		var maxSize = sqrt(pow(10,10));

		size = map(size , 0 , maxSize , 0 , 500);

		fill(243, 156, 18);
		ellipse(x,y,size,size);
	}

}
