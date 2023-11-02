/*
	전역변수
*/
var maincontH;//메인 컨텐츠 높이
var scrT;//윈도우 스크롤탑



/*
	Load
*/
$(window).on('load', function(){
	scrT = $(this).scrollTop();//윈도우 스크롤탑
	maincontH = $('.main').find('.cont').outerHeight();//메인 컨텐츠 높이

	if ( scrT == 0 ){
		mainVisualLoad();//메인비주얼 초기실행
	}

	rolling();//롤링컨텐츠
})



/*
	Scroll
*/
$(window).on('scroll', function(){
	scrT = $(this).scrollTop();//윈도우 스크롤탑
	
	mainVisual();//메인비주얼
	contentShow();//컨텐츠노출
})



/*
	스킵네비
*/
$(document).on('focus', '.skip-navi a', function() {
	$(this).addClass('active');
})
$(document).on('blur', '.skip-navi a', function() {
	$(this).removeClass('active');
})
//링크이동 시 영역 포커스
$(document).on('click', '.skip-navi a', function() {
	var skipId = $(this).attr('data-skipnaviId');
	var $skipEl;
	if( skipId == 'navi'){
		$skipEl = $('.navi-area');
	}
	if ( skipId == 'container' ){
		$skipEl = $('.container');
	}
	$skipEl.attr('tabindex','-1').focus();
})



/*
	메인비주얼
*/
//메인비주얼 초기실행
function mainVisualLoad(){
	$('.main').find('.cont').eq(0).addClass('active');
}

//메인비주얼
function mainVisual(){
	// 메인컨텐츠
	if ( scrT > maincontH/2 ){
		$('.main').find('.cont').eq(0).removeClass('active');
		$('.main').find('.cont').eq(1).addClass('active');

		if(scrT >= maincontH) { 
			$('.main').find('.cont').eq(1).addClass('nofix');
		} else {
			$('.main').find('.cont').eq(1).removeClass('nofix');
		}
	} else if ( scrT < maincontH/2 && scrT > 0 ) {
		$('.main').find('.cont').eq(0).addClass('active');
		$('.main').find('.cont').eq(1).removeClass('active');
	}
}



/*
	컨텐츠노출
*/
function contentShow(){
	$('.content').each(function(){
		var targetscrT = $(this).offset().top,
			showpoint = targetscrT - $(window).outerHeight();

		if (scrT >= showpoint) {
			$(this).addClass('show');
		}
	})
}



/*
	스크롤 탑버튼
*/
$(document).on('click', '.btn-top', function() {
	$(window).scrollTop(0);
	mainVisualLoad();//메인비주얼 초기실행
})



/*
	네비게이션
*/
$(document).on('click', '.btn-navi', function() {
	var thisIndex = $(this).index();
	var $target = $('.content').eq(thisIndex);

	$('html, body').stop().animate({ scrollTop : $target.offset().top - $('.header').outerHeight() }, 300);
	setTimeout(function(){
		$target.attr('tabindex','-1').focus();
	},300)
})



/*
	롤링컨텐츠
*/
function rolling() {
	var $rolling = $('.rolling-wrap'),
		$list = $rolling.children('.cont');
	var	listhtml = $list.html();

	if($list.children('.fake').length == 0){
		$list.append(listhtml);
		$list.find('ul').last().addClass('fake');
	}
}



/*
	롤링컨텐츠 컨트롤
*/
$(document).on('click','.rolling-wrap .ctrl-box .btn-stop', function(){
	$('.rolling-wrap ul').css('animation-play-state','paused');

	$(this).css('display','none');
	$(this).siblings('.btn-play').css('display','block');
	$(this).siblings('.btn-play').focus();
})

$(document).on('click','.rolling-wrap .ctrl-box .btn-play', function(){
	$('.rolling-wrap ul').css('animation-play-state','running');

	$(this).css('display','none');
	$(this).siblings('.btn-stop').css('display','block');
	$(this).siblings('.btn-stop').focus();
})