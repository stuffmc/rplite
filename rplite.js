$(function(){
  console.log("LOADED");
  $("figure:first").removeClass("hide");
  // baseURL = "http://radiopodcast.com:3000"; ; //"http://localhost:3000"; 
  // baseURL = "http://staging.radiopodcast.com"; 
  baseURL = "http://radiopodcast.com"; 
  // baseURL = "http://bb.local:3000";
  // baseURL = "http://dev.futuretap.com:3000";
  // console.log(baseURL);
  soundManager.url = 'SoundManager2/swf/';
  soundManager.debugMode = false;
  soundManager.useFlashBlock = true;
  soundManager.debugFlash = false;
  soundManager.consoleOnly = true;

  soundManager.onload = function() {
    // soundManager.useHTML5Audio = true;
    soundManager.autoLoad = true;
    console.log("SOUNDMANAGER LOADED");

    $.getJSON(baseURL+'/radios.json?callback=?', function(data, textStatus, jqXHR) {
      console.log("JSON LOADED");
      console.log(jqXHR);
      $.each(data, function(i,item){
        if (item.radio.stream != "") {
          var radio = $("figure:last").clone(true);
          radio.find("figcaption").text(item.radio.name);
          radio.find("#img").hide();
          radio.find(".logo").css("background-image", "url("+baseURL+item.radio.logo_url+")");
          soundManager.createSound(item.radio.name, item.radio.stream);
          $("h1").slideUp();
          radio.appendTo('#radios');
          radio.slideDown();
        }
      });
    }).error(function(  jqXHR, textStatus, errorThrown) {
      console.log("error " + textStatus);
      console.log("incoming Text " + jqXHR.responseText);
    }).complete(function() { 
      if ($("figure:first").find("figcaption").html() == "") {
          $("figure:first").remove();
      }
      $("figcaption").removeClass("hide");
      $("h2").css("display", "block");
      console.log("complete"); 
    });
    
    console.log("after");
    
    
  
    if (window.navigator.standalone == true) {  $("header").fadeOut(); } else { $("header").fadeIn();}
     
    $(".logo").click(function(e) {
          // audio = $(this).parent().children("audio");
      figcaption = $(this).parent().children("figcaption");
      var radio = figcaption.html();
      console.log(radio + ' clicked');
      var stream = soundManager.getSoundById(radio)
      if (stream && stream != undefined) {
        if (figcaption.hasClass("show")) {
          soundManager.pause(radio);
          figcaption.removeClass("show");
        } else {
          var speaker = $(this).parent().find(".speaker");
         // console.log($(this).parent().html());
          console.log(stream + ' will play');
              // console.log(audio.attr("src")+' will play');

          speaker.fadeIn();
          soundManager.stopAll();
          // soundManager.load(radio);
          soundManager.play(radio, {
            ondataerror: function() {
              console.log(this.sID+' data error.');
            },
            onfinish: function() {
              console.log(this.sID+' finished playing.');
            },
            onplay: function() {
              $(".speaker").fadeOut();
              console.log(this.sID+' playing ready: ' + stream.readyState + ' play: ' + stream.playState);
              speaker.removeClass("blink");
              speaker.fadeIn();
            },
            onpause: function() {
              speaker.fadeOut();
              console.log('PAUSED');
            },
            onstop: function() {
              speaker.fadeOut();
              console.log('STOPPED');
            },
            onload: function() {
              speaker.addClass("blink");
            }
          });
          figcaption.addClass("show");
        }
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