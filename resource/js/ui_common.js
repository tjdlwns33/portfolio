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
})



/*
	Scroll
*/
$(window).on('scroll', function(){
	scrT = $(this).scrollTop();//윈도우 스크롤탑
	
	mainVisual();//메인비주얼
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

	$('html, body').stop().animate({ scrollTop : $target.offset().top }, 300);
	setTimeout(function(){
		$target.attr('tabindex','-1').focus();
	},300)
})
