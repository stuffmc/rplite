$(function(){
	baseURL = "http://radiopodcast.com";
	console.log(baseURL);
	$.getJSON(baseURL+'/radios.json', function(data) {
    $.each(data, function(i,item){
    	if (!item.radio.hide) {
				var radio = $(".radio:first").clone(true);
				radio.find("figcaption").text(item.radio.name);
				radio.find("#img").hide();
				radio.find(".logo").css("background-image", "url("+baseURL+item.radio.logo_url+")");
				radio.css("display", "none");
				$.get(baseURL+item.radio.stream_permalink+".xml", function(data) {
					source = $(data).find("location").html();
					if (source == undefined || source == "") {
						radio.remove();
					} else {
						radio.find("audio").attr("src", source);
					}
				}, "text");
				radio.appendTo('#radios');
			}
    });
  });
	
	if (window.navigator.standalone == true) {  $("header").fadeOut(); } else { $("header").fadeIn();}
	
	$(".logo").click(function(e) {
		audio = $(this).parent().parent().children("audio");
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
		  if ($(".radio:first").find("figcaption").html() == "") {
				$(".radio:first").remove();
			}
			$(this).parent().first().css("display", "inline");
		});
	});
});