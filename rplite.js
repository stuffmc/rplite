$(function(){
	baseURL = "http://localhost:3000"; //"http://radiopodcast.com";
	console.log(baseURL);
	$.getJSON(baseURL+'/radios.json?callback=?', function(data) {
    $.each(data, function(i,item){
			var radio = $("figure:first").clone(true);
			radio.find("figcaption").text(item.radio.name);
			radio.find("#img").hide();
			radio.find(".logo").css("background-image", "url("+baseURL+item.radio.logo_url+")");
			radio.addClass("hide");
			radio.find("audio").attr("src", item.radio.stream);
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
			audio[0].play();

			$(audio).bind('playing', function() {
				$(this).parent().find(".speaker").fadeIn();
			});

			$(audio).bind('pause', function() {
				$(this).parent().find(".speaker").fadeOut();
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
		$(value).bind('canplay', function() {
		  if ($("figure:first").find("figcaption").html() == "") {
				$("figure:first").remove();
			}
			$(this).parent().removeClass("hide");
			$(this).parent().addClass("show");
		});
	});
});