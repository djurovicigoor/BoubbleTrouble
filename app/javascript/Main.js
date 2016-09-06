var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var tmp2 = $("div#scale").html();
var Main =
{

};

var i=0;
var velbal=2;
var brojac_global = 20;
var stoperica;
var startovano=false;
//Za tastaturu
var widgetAPI = new Common.API.Widget();
var pluginAPI = new Common.API.Plugin();
var tvKey = new Common.API.TVKeyValue();

//JSON
var fileSystemObj = new FileSystem();
var bValid = fileSystemObj.isValidCommonPath(curWidget.id);
if (!bValid)
{
   fileSystemObj.createCommonDir(curWidget.id);
   alert("Folder  ne postoji");
} else {
  alert("Folder  postoji");
}
//Za tastaturu
var Input  = function(id,i,j){
    var imeReady = function()
    {
        installFocusKeyCallbacks();
        installStatusCallbacks();
        document.getElementById(id).focus();
    }
    var ime = new IMEShell(id, imeReady, 'en');
    var installFocusKeyCallbacks = function()
    {
        ime.setKeyFunc(tvKey.KEY_RETURN, function(keyCode) {
             Main.footerChange(Main.forFooter)
        });
    }
    var installStatusCallbacks = function()
    {
        ime.setKeypadPos(i, j);
    }
}
Main.createInputObjects = function(inputID,i,j){
    var input = new Input(inputID,i,j);
}

Main.onLoad = function(){
  pluginAPI.registIMEKey();
	this.enableKeys_splash_screen();
	widgetAPI.sendReadyEvent();
};

Main.onUnload = function(){
};



$( document ).ready(function() {
//zvuk balona


  $("#potvrdi").click(function(){
    $("#container").show();
    $("#container2").hide();
    Ucitaj();
    $.each(licniPodaci, function (key, value) {
    //Upis starih i novih imena
      var s = value["licniP"+velbal];
      var n = $("#name").val();
    	var z = n + "," + s;
    	settings["licniP"+velbal] = z;
    });
    Upisi();
  });

	//back dugme iz settings na pocetni ekran
	$("#back").click(function(){
		Main.settings_to_start_screen();
	});
//Ulazak na about us sa pocetnog ekrana
	$("#div_3").click(function(){
		$("#about_us").show();
		$("div#start_screen").hide();
	});
//Izlaz iz about u pocetni ekran
$("#back_about").click(function(){
	$("#about_us").hide();
	$("div#start_screen").show();
});

	$("#score_back").click(function(){
		Main.new_game_from_to_start_screen();
	});

	$("#score_replay").click(function(){
		Main.new_game_from_to_start_screen();
		Main.start_screen_to_new_game();
	});
  $("#back_hs").click(function(){
    Main.high_score_to_start_screen();
  });

});




/**************************************************************************************************
**** Splash Screen <---- START
**************************************************************************************************/


/*Enable keys for splash screen*/

Main.enableKeys_splash_screen = function(){

	$(document).on("keydown", Main.splash_screenKeyHandler);
	$("div#splash_screen").on("click", Main.splash_screen_to_start_screen);
};


/*Disable keys for splash screen*/

Main.disableKeys_splash_screen = function(){

	$(document).off("keydown", Main.splash_screenKeyHandler);
	$("div#splash_screen").off("click", Main.click_splash_screen);
};


/*KeyHandler for splash screen*/

Main.splash_screenKeyHandler = function(){

	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode){
		case tvKey.KEY_RETURN:
			alert("RETURN");
			widgetAPI.blockNavigation(event);
			break;

		case tvKey.KEY_EXIT:
			widgetAPI.sendReturnEvent();
			alert("EXIT");
			break;

		case tvKey.KEY_ENTER:
			Main.splash_screen_to_start_screen();
			alert("ENTER");
			break;

		default:
			break;
	}
};


/**************************************************************************************************
**** Splash Screen <---- END
**************************************************************************************************/


/* Function for change form splash screen to start screen*/

Main.splash_screen_to_start_screen = function(){

	Main.disableKeys_splash_screen();

	$("div#splash_screen").hide();
	$("div#start_screen").show();

	Main.enableKeys_start_screen();
};


/**************************************************************************************************
**** Start Screen <---- START
**************************************************************************************************/


/* Remowe anmiate.css class*/
Main.remoweAnimate = function(){

	$("div.start_screen_class").eq(i).removeClass("animated infinite tada");

};

Main.addAnimate = function(){

	$("div#bubble").addClass("animated infinite pulse");

};

Main.removeAnimatePulse = function(){

	$("div#bubble").removeClass("animated infinite pulse");

};

/*Enable keys for start screen*/

Main.enableKeys_start_screen = function(){

	$(document).on("keydown", Main.start_screenKeyHandler);

	$("div.start_screen_class").on("mouseover", Main.promenaSenke_start_screen);
	$("div.start_screen_class").on("click", Main.click_start_screen);

	$("div.start_screen_class").on("mouseout", Main.remoweAnimate);

};


/*Disable keys for start screen*/

Main.disableKeys_start_screen = function(){

	$(document).off("keydown", Main.start_screenKeyHandler);

	$("div.start_screen_class").off("mouseover", Main.promenaSenke_start_screen);
	$("div.start_screen_class").off("click", Main.click_start_screen);

};


/*Promena senke na stavkama u meniju na start screen-u*/

Main.promenaSenke_start_screen = function(){

	$("div.start_screen_class").eq(i).removeClass("animated infinite tada");
	i = $("div.start_screen_class").index( this );
	$("div.start_screen_class").eq(i).addClass("animated infinite tada");

};


/*Funkcija za click na start screen-u*/

Main.click_start_screen = function(){

	switch($("div.start_screen_class").index( this )){
		case 0:
			Main.start_screen_to_new_game();
			break;

		case 1:
			Main.start_screen_to_settings();
			break;

		case 2:
			Main.start_screen_to_high_score();
			break;

		default:
			break;
	}

};


/*KeyHandler for start screen*/

Main.start_screenKeyHandler = function(){

	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode){

		case tvKey.KEY_RETURN:
			alert("RETURN");
			widgetAPI.blockNavigation(event);
			break;

		case tvKey.KEY_EXIT:
			widgetAPI.sendReturnEvent();
			alert("EXIT");
			break;

		case tvKey.KEY_ENTER:
			switch(i){
				case 0:
				Main.start_screen_to_settings();
				break;

				case 1:
				Main.start_screen_to_settings();
				break;

				default:
				break;
			}
			alert("Enter Key");
			break;
			case 20:
			alert($("div#scale").html());
			break;

		default:
			alert("Unhandled key");
			break;
	}
};

Main.start_screen_to_new_game = function(){

	Main.disableKeys_start_screen();

	$('div#start_screen').hide();
	$('div#new_game_form').show();

	Main.enableKeys_new_game_form();

	Main.game_engine(brojac_global);

	/*timer = brojac_global;*/
}

/**************************************************************************************************
**** Start Screen <---- END
**************************************************************************************************/


/*Funkcija za promenu start ekrana u settings [ON ENTER BUTTON]*/

Main.start_screen_to_settings = function(){

	Main.disableKeys_start_screen();

	$("div#start_screen").hide();
	$("div#settings").show();

	Main.enableKeys_settings();

	$("div#timer2").show();
	$("div#timer2").html(brojac_global);
	$("div#bubble").show();
  $("#bubble").css({top: 250, left: 190});
	$("div#settings_natpis").fadeIn(1500);
};


/*Funkcija za promenu start ekrana u high_score [ON ENTER BUTTON]*/

var Sortiranje = function(splitLicni,splitVreme,splitUnisteni){
  var duzina = splitUnisteni.length;
  var tempScore = 0;
  var tempImena = 0;
  var tempVreme = 0;
  for (var q = 0; q<duzina; q++){
    for (var j = 1; j < (duzina -q); j++){
      if ((splitVreme[j] / splitUnisteni[j])  < (splitVreme[j-1] / splitUnisteni[j-1])){
        tempScore = splitUnisteni[j-1];
        tempImena = splitLicni[j-1];
        tempVreme = splitVreme[j-1];
        splitUnisteni[j-1] = splitUnisteni[j];
        splitLicni[j-1] = splitLicni[j];
        splitVreme[j-1] = splitVreme[j];
        splitUnisteni[j] = tempScore;
        splitLicni[j] = tempImena;
        splitVreme[j] = tempVreme;
      }
    }
  }
}

Main.start_screen_to_high_score = function(){

//JSON
	Ucitaj();
  //citanje podataka iz pasiranog stringa
  alert(licniPodaci);
  $.each(licniPodaci, function (key, value) {

    var a = value["unisteni"+velbal];
    var b = value["vreme"+velbal];
    var c = value["licniP"+velbal];

    var splitUnisteni = a.split(",");
    var splitVreme = b.split(",");
    var splitLicni = c.split(",");

    Sortiranje(splitLicni,splitVreme,splitUnisteni);



    for (var i=0; i<=9; i++){
      $("#hs_score"+i).html(splitUnisteni[i]);
      $("#hs_vreme"+i).html(splitVreme[i]);
      $("#hs_name"+i).html(splitLicni[i]);
    };

  });

	Main.disableKeys_start_screen();
	$("div#start_screen").hide();
	$("div.score").show();
  $("#naslov_high_score").html("Rezultat za velicinu balona " + velbal);

	Main.enableKeys_high_score_screen();

};



/**************************************************************************************************
**** Settings Screen <---- START
**************************************************************************************************/


/*Enable keys for settings*/

Main.enableKeys_settings = function(){

	$(document).on("keydown", Main.settingsKeyHandler);
	$("div#settings").on("click", Main.click_settings);

};


/*Disable keys for settings*/

Main.disableKeys_settings = function(){

	$(document).off("keydown", Main.settingsKeyHandler);
	$("div#settings").off("click", Main.click_settings);

};


/*KeyHandler for settings*/

Main.settingsKeyHandler = function(){

	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode){
		case tvKey.KEY_RETURN:
			widgetAPI.blockNavigation(event);
			Main.settings_to_start_screen();
			alert("RETURN");
		break;

		case tvKey.KEY_ENTER:
			Main.settings_to_new_game_form();
			alert("ENTER");
			break;

			// Blue button or "D"
		case 5:
				Main.update_timer_plus();
				alert("Up timer");
			break;

			// Yellow button or "C"
		case 4:
				Main.update_timer_minus();
				alert("Down timer");
			break;

			// Red button or "A"
		case 29461:
			Main.bubble_size_minus();
			break;

			// Green button or "B"
		case 29460:
			Main.bubble_size_plus();
			break;
	}
};

/*Main.click_settings = function(){

	Main.settings_to_start_screen();
};*/



/*Funkcija koja smanjuje balon*/

Main.bubble_size_minus = function(){


	var tmp2 = $("div#scale").html();


	if (tmp2 == 2) {
			$("div#bubble").width(100);
			$("div#bubble").height(100);
			$("div#scale").html(1);
      velbal=1;

	}
	else if (tmp2 == 3) {
			$("div#bubble").width(150);
			$("div#bubble").height(150);
			$("div#scale").html(2);
      velbal=2;
	}

};


/*Funkcija koja povecava balon */

Main.bubble_size_plus = function(){



	var tmp2 = $("div#scale").html();


	if (tmp2 == 1) {
			$("div#bubble").width(150);
			$("div#bubble").height(150);
			$("div#scale").html(2);
      velbal=2;
	} else if (tmp2 = 2) {
			$("div#bubble").width(200);
			$("div#bubble").height(200);
			$("div#scale").html(3);
      velbal=3;
	}

	alert($("div#scale").html());
};


/* Funkcija koja smanjuje tajmer za 5*/

Main.update_timer_minus = function(){

	if(brojac > 5){
		brojac = brojac - 5;
		$("div#timer2").html(brojac);
		brojac_global = brojac;
	} else {

		$("div#timer2").html(brojac);
	}
};


/* Funkcija koja povecava tajmer za 5*/

Main.update_timer_plus = function(){

	if(brojac < 60){
		brojac = brojac + 5;
		$("div#timer2").html(brojac);
		brojac_global = brojac;
	} else {

		$("div#timer2").html(brojac);
	}
};



/**************************************************************************************************
**** Settings Screen <---- END
**************************************************************************************************/


/*Funkcija za promenu settings u start screen*/

Main.settings_to_start_screen = function(){

	Main.disableKeys_settings();

	$("div#settings").hide();
	$("div#start_screen").show();
	$("div#bubble").hide();
	Main.enableKeys_start_screen();


};



/**************************************************************************************************
**** New Game Screen <---- START
**************************************************************************************************/

Main.click_new_game = function(){
	Main.new_game_form_to_start_screen();
};

/*Enable keys for new game form*/

Main.enableKeys_new_game_form = function(){

	$(document).on("keydown", Main.new_game_formKeyHandler);
	$("div#score").on("click", Main.click_new_game);
};

Main.new_game_form_to_start_screen=function(){

};
/*Disable keys for new game form*/

Main.disableKeys_new_game_form = function(){

	$(document).off("keydown", Main.new_game_formKeyHandler);
	$("div#score").on("click", Main.click_new_game);
};


/*KeyHandler for new game form*/

Main.new_game_formKeyHandler = function(){

	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode){
		case tvKey.KEY_RETURN:
			widgetAPI.blockNavigation(event);

			Main.new_game_from_to_start_screen();

			alert("RETURN");
		break;
	}
};


/*Funkcija za game engine*/

Main.game_engine = function(){

	odbrojava = false;
	startovano = false;
	unisteni_baloni=0;

	timer = brojac_global;

	$("div#container").hide();

	$("div#timer").html(brojac_global);
	$("div#timer").show();

	Bubble.randomPozicija();

  

	$("div#bubble").show();

	$("div#bubble").on("click", Bubble.generisanjePozicije);

	$("div#container").off();

};


/**************************************************************************************************
**** New Game Screen <---- END
**************************************************************************************************/


/*Funkcija za promenu new game ekrana u start screen [ON RETURN BUTTON]*/

Main.new_game_from_to_start_screen = function(){

	Main.disableKeys_new_game_form();

	$("div#new_game_form").hide();
	$("div#start_screen").show();

	Main.enableKeys_start_screen();

	$("div#timer").hide();
	$("div#bubble").hide();
	$("div#bubble").off();

	$("div#container").hide();

	clearInterval(stoperica);

	odbrojava = false;
	startovano= false;
	brojac = brojac_global;

	$("#real_time_score").html(0);
};



/**************************************************************************************************
**** High Score Screen <---- START
**************************************************************************************************/


/*Enable keys for high_score_screen*/

Main.enableKeys_high_score_screen = function(){

	$(document).on("keydown", Main.high_scoreKeyHandler);
};


/*Disable keys for high_score_screen*/

Main.disableKeys_high_score_screen = function(){

	$(document).off("keydown", Main.high_scoreKeyHandler);
};


/*KeyHandler for high_score_screen*/

Main.high_scoreKeyHandler = function(){

	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode){
		case tvKey.KEY_RETURN:
			widgetAPI.blockNavigation(event);
			Main.high_score_to_start_screen();
			alert("RETURN");
		break;
	}
};



/**************************************************************************************************
**** High Score Screen <---- END
**************************************************************************************************/



/* Funkcija za promenu high_score u start_screen*/

Main.high_score_to_start_screen = function(){

	Main.disableKeys_high_score_screen();

	$("div.score").hide();
	$("div#start_screen").show();


	Main.enableKeys_start_screen();
};


/**************************************************************************************************/
