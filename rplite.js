$(function(){
	$("figure:first").removeClass("hide");
	baseURL = "http://radiopodcast.com:3000"; ; //"http://localhost:3000"; // "http://staging.radiopodcast.com"; // 
	console.log(baseURL);
	$.getJSON(baseURL+'/radios.json?callback=?', function(data) {
    $.each(data, function(i,item){
			var radio = $("figure:last").clone(true);
			radio.find("figcaption").text(item.radio.name);
			radio.find("#img").hide();
			radio.find(".logo").css("background-image", "url("+baseURL+item.radio.logo_url+")");
			radio.addClass("hide"); 
			// radio.addClass("show");
 			radio.find("audio").attr("src", item.radio.stream);
 			// radio.find("audio")[0].play();
			radio.appendTo('body');
    });
  });
	
	if (window.navigator.standalone == true) {  $("header").fadeOut(); } else { $("header").fadeIn();}
	
	$(".logo").click(function(e) {
		audio = $(this).parent().children("audio");
		if (audio.hasClass("show")) {
			audio[0].pause();
			audio.removeClass("show");
		} else {
			// console.log($(this).parent().html());
			console.log(audio.attr("src")+' will play');
			// audio[0].load();
			audio[0].play();
			var speaker = $(this).parent().find(".speaker");
			speaker.fadeIn();
			if (audio[0].paused || audio[0].currentTime == 0) {
				speaker.addClass("blink");
			}

			$(audio).bind('playing', function() {
				console.log($(this).attr("src")+" playing!");
				speaker.removeClass("blink");
				speaker.fadeIn();
			});

			$(audio).bind('pause', function() {
				speaker.fadeOut();
			});
			audio.addClass("show");
		}
		
		$("audio").each(function(index, value) {
			if (audio[0] != value) {
				$(value).removeClass("show");
				value.pause();
			}
		});
	});
	
	$("audio").each(function(index, value) {
		$(value).bind('suspend', function() {
			// $(this)[0].pause();
			// console.log($(this).attr("src")+" can play!");
		  if ($("figure:first").find("figcaption").html() == "") {
				$("figure:first").remove();
			}
			$(this).parent().removeClass("hide");
			$(this).parent().addClass("show");
		});
	});
});