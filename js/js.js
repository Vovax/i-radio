$(document).ready(function() {

	container = $('.container');
	cover = $('.cover');
	play = $('#play');
	pause = $('#pause');
	mute = $('#mute');
	muted = $('#muted');
	close = $('#close');
	song = new Audio('http://185.33.22.15:11006');
	duration = song.duration;

	if (song.canPlayType('audio/mpeg;')) {
    	song.type= 'audio/mpeg';
    	song.src= 'http://185.33.22.15:11006';
	} else {
    	song.type= 'audio/ogg';
    	song.src= 'http://185.33.21.112:11017';
	}



	play.live('click', function(e) {
		e.preventDefault();
		song.play();

		$(this).replaceWith('<a class="button gradient" id="pause" href="" title=""></a>');
		container.addClass('containerLarge');
		cover.addClass('coverLarge');
		$('#close').fadeIn(300);
		$('#seek').attr('max',song.duration);
	});

	pause.live('click', function(e) {
		e.preventDefault();
		song.pause();
		$(this).replaceWith('<a class="button gradient" id="play" href="" title=""></a>');

	});

	mute.live('click', function(e) {
		e.preventDefault();
		song.volume = 0;
		$(this).replaceWith('<a class="button gradient" id="muted" href="" title=""></a>');

	});

	muted.live('click', function(e) {
		e.preventDefault();
		song.volume = 1;
		$(this).replaceWith('<a class="button gradient" id="mute" href="" title=""></a>');

	});

	$('#close').click(function(e) {
		e.preventDefault();
		container.removeClass('containerLarge');
		cover.removeClass('coverLarge');
		song.pause();
		song.currentTime = 0;
		$('#pause').replaceWith('<a class="button gradient" id="play" href="" title=""></a>');
		$('#close').fadeOut(300);
	});



	$("#seek").bind("change", function() {
		song.currentTime = $(this).val();
		$("#seek").attr("max", song.duration);
	});

	song.addEventListener('timeupdate',function (){
		curtime = parseInt(song.currentTime, 10);
	$("#seek").attr("value", curtime);
	});









	
	
});
