$(function(){
	$("figure:first").removeClass("hide");
  // baseURL = "http://radiopodcast.com:3000"; ; //"http://localhost:3000"; // "http://staging.radiopodcast.com"; // 
	baseURL = "http://bb.local:3000";
  // console.log(baseURL);
	soundManager.url = 'SoundManager2/swf/';
	soundManager.debugMode = false;
  // soundManager.useFlashBlock = false;
  // soundManager.debugFlash = true;

  soundManager.onload = function() {
    soundManager.useHTML5Audio = true;
    soundManager.autoLoad = true;

  	$.getJSON(baseURL+'/radios.json?callback=?', function(data) {
      $.each(data, function(i,item){
        // console.log(item);
        if (item.radio.stream != "") {
          var radio = $("figure:last").clone(true);
          radio.find("figcaption").text(item.radio.name);
          radio.find("#img").hide();
          radio.find(".logo").css("background-image", "url("+baseURL+item.radio.logo_url+")");
                // radio.addClass("hide"); 
          radio.addClass("show");
          soundManager.createSound(item.radio.name, item.radio.stream);
          radio.appendTo('body');
        }
      });
    });
	
    if (window.navigator.standalone == true) {  $("header").fadeOut(); } else { $("header").fadeIn();}
     
    $(".logo").click(function(e) {
          // audio = $(this).parent().children("audio");
     figcaption = $(this).parent().children("figcaption");
     console.log(figcaption);
     if (figcaption.hasClass("show")) {
       soundManager.pause(figcaption.html());
       figcaption.removeClass("show");
     } else {
       // console.log($(this).parent().html());
            console.log(figcaption.html() + ' will play');
            // console.log(audio.attr("src")+' will play');
       soundManager.play(figcaption.html());
       var speaker = $(this).parent().find(".speaker");
       speaker.fadeIn();
            // if (audio[0].paused || audio[0].currentTime == 0) {
            //  speaker.addClass("blink");
            // }
            // 
            // $(audio).bind('playing', function() {
            //  console.log($(this).attr("src")+" playing!");
            //  speaker.removeClass("blink");
            //  speaker.fadeIn();
            // });
            // 
            // $(audio).bind('pause', function() {
            //  speaker.fadeOut();
            // });
       figcaption.addClass("show");
     }
       
     $("ficaption").each(function(index, value) {
       if (figcaption[0] != value) {
         $(value).removeClass("show");
         value.pause();
       }
     });
    });
     
        // $("audio").each(function(index, value) {
        //  $(value).bind('suspend', function() {
        //    // $(this)[0].pause();
        //    // console.log($(this).attr("src")+" can play!");
        //    if ($("figure:first").find("figcaption").html() == "") {
        //      $("figure:first").remove();
        //    }
        //    $(this).parent().removeClass("hide");
        //    $(this).parent().addClass("show");
        //  });
        // });
  };
});