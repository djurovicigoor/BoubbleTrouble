var Timer =
{

};
var btn_return = false;
var brojac = 20;
var odbrojava = false;
Timer.startovanje = function(){

	$("div#timer").html(brojac);
	stoperica = setInterval(function(){

		if(brojac>0){

			odbrojava=true;
			brojac--;
			$("div#timer").html(brojac);

		} else {

			$("div#bubble").off();
			clearInterval(stoperica);
			odbrojava=false;
			alert("Brojac "+brojac);
			Bubble.score();

		}

	},1000);
};
