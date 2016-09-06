var Bubble =
{

};
var vrednostBal = $("#scale").html();
var unisteni_baloni=0;

var pom_left, pom_top;

var licniPodaci;

Bubble.generisanjePozicijeLeft = function(){

	pom_left = Math.round(Math.random()*1130);
};

Bubble.generisanjePozicijeTop = function(){

	pom_top = Math.round(Math.random()*470);

};

Bubble.randomPozicija = function(){

	Bubble.generisanjePozicijeLeft();
	Bubble.generisanjePozicijeTop();

	// $(document).append("<audio src='mp3/balloon.mp3' autoplay></audio>");

	alert("Random");
	$("div#bubble").css("left",pom_left + "px");
	alert($("div#bubble").css("left"));
	$("div#bubble").css("top", pom_top + "px");

	alert($("div#bubble").css("top"));

};
//objekat za score
var settings={
		vreme1: 0,
		unisteni1: 0,
		licniP1: 0,
		vreme2: 0,
		unisteni2: 0,
		licniP2: 0,
		vreme3: 0,
		unisteni3: 0,
		licniP3: 0
};
//
// Citamo vrednosti iz fajla i pasiramo string
Ucitaj = function(){
	var fileObj = fileSystemObj.openCommonFile(curWidget.id + '/podaci.data','a+');
	var temp = fileObj.readAll();
	if (temp != '') {
	licniPodaci = JSON.parse(temp);
	}
	fileSystemObj.closeCommonFile(fileObj);
}
//Upisuje objekat settings u file
Upisi = function(){
	alert("OVOJE"+settings);
	var fileObj = fileSystemObj.openCommonFile(curWidget.id + '/podaci.data','w');
	fileObj.writeAll(JSON.stringify([settings]));
	fileSystemObj.closeCommonFile(fileObj);
}
Bubble.score = function(){

	$("#myAudio").trigger('pause');
	var string = "Pogodili ste "+unisteni_baloni+" za " + brojac_global + " sekundi";
	alert(string);
	$("div#bubble").hide();
	$("div#timer").hide();
	$("div#score").html(string);
	$("#container2").show();
	// Citamo vrednosti iz fajla i pasiramo string
	Ucitaj();

//Citamo stare vrednosti iz pasiranog stringa
$.each(licniPodaci, function (key, value) {
	//upisujemo staru i novu vrednost vremena u objekat
	/*var s = vreme+velbal;
	var k = unisteni+velbal;
	var m = licniP+velbal;*/

	var x = brojac_global + "," + value["vreme"+velbal];
	settings["vreme"+velbal] = x;
	//upisujemo staru i novu vrednost unistenih u objekat
	var y = unisteni_baloni + "," + value["unisteni"+velbal];
	settings["unisteni"+velbal] = y;
	//Cuvanje vrednost licniP iz objekta kako se ne bi gubio pri cuvanju objekta.
	var z = value["licniP"+velbal];
	settings["licniP"+velbal] = z;
});

	Upisi();


//za tastaturu
	Main.createInputObjects('name', 100, 200);

};



Bubble.generisanjePozicije = function(){

	$("#myAudio").trigger('play');

	alert("Klikova: " + unisteni_baloni);


	if(startovano==false && odbrojava==false){

		Timer.startovanje();
		unisteni_baloni=0;
		Bubble.randomPozicija();
		startovano=true;
		unisteni_baloni++;
	} else if(startovano==true && odbrojava==true){

		Bubble.randomPozicija();
		unisteni_baloni++;

	}
$("#real_time_score").html(unisteni_baloni);

};
