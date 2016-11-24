$(function(){

	wangFrames.getSecond($('.second'),'1987,12,18');

	// 侧边栏
	
	wangFrames.slideBar($('.menu'), $('.side-bar'), -200);

	//var timer2;
	var n = 0.1,b = 3.6;

	$(document).on('touchmove mousemove scrollstart', function(obj){
		
		
		if($('.full-size:eq(1)').offset().top <= $(window).scrollTop()-1){
			console.log('true')
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){

				n+= (b - n)/158;
				n = new Number(n.toFixed(3));

				if(n > 3.5){
					n=3.6;
					clearInterval(obj.timer);
				}

				
				if(n < 3.6){
					wangFrames.runChart('#d55959','#d5e1b0', {'html':80,'css':75,'js':65, 'jq':75, 'angular':50, "react":45,'node':30,'photoshop':75}, n);
				}else{
					clearInterval(obj.timer);


				}

			},30);


		}else{
			n=0;
			console.log('false')
			wangFrames.runChart('#d5e1b0','#d5e1b0', {'html':80,'css':75,'js':65, 'jq':75, 'angular':50, "react":45,'node':30,'photoshop':75}, n);

		}
	});
	

	wangFrames.quireDate('../data/works.json', $('#loadBtn'),'click');

	var windowH = $(window).height();
	$('.pagination').css({'top':windowH / 2 - 30});
	

})