$(document).ready(function() {
	$(window).scroll(function(){
		if($(document).scrollTop() > 457){
			$('.b2b_slogan').css({'visibility': 'hidden'});
		}
		if($(document).scrollTop() < 457){
			$('.b2b_slogan').css({'visibility': 'visible'});
		}
		if($(document).scrollTop() > 10){
			$('.more_info').css({'visibility': 'hidden'});
		}
		if($(document).scrollTop() < 10){
			$('.more_info').css({'visibility': 'visible'});
		}
	})
})