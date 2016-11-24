var wangFrames = {
	getSecond:function (obj,startTime){
		var pattern=/\d+\.\d+\.\d+/;
		startTime = startTime.match(pattern);
		//console.log(startTime)
		var birthday = new Date(1987,12,18);
		
		var oDate;

		setInterval(function(){
		oDate = new Date();
		
		
		oDate = (oDate - birthday) / 1000;
		obj.html(parseInt(oDate) + '<small>s</small>');	
		obj.prev().html(Math.ceil(oDate / (60*60*24*365)));
	},1000);
	
	},

	//slidebar
	slideBar:function(btn,bar,distance){
		var timer
		btn.on('mouseover',function(){
			bar.css('display','block').stop().animate({'right':0}, 100, 'swing');
		})	

		btn.on('mouseout',function(){
			
			timer = setTimeout(function(){
				bar.stop().animate({'right':-200},'swing',function(){
					bar.css('display','none')
				});
			},100)
			
		})

		bar.on('mouseenter', function(){
			clearInterval(timer);
		})

		bar.on('mouseleave',function(){
			bar.stop().animate({'right':-200}, function(){
				bar.css('display','none')
			})

		})
	},

	//加载图表
	runChart:function(fCol, bCol, json, n){

		
		$('canvas').attr({'width':$('#skills .chart').width(),'height':$('#skills .chart').width()}); 
		var x_axle = $('canvas').width() / 2;
		var y_axle = $('canvas').height() / 2;

		var diameter = $('canvas').width() / 2 - 20;

		//n+=0.1;

		for(skill in json){
			var cav = skill+'Cav' ;
				cav = $('#'+skill)[0];
				
			var ctx = skill+'Ctx';
				ctx =  cav.getContext('2d');
				
			ctx.beginPath();
			ctx.strokeStyle=bCol;
			ctx.lineWidth=10;
			ctx.arc(x_axle, y_axle, diameter, 0, 2 * Math.PI);
			ctx.stroke();

			ctx.beginPath();
			ctx.strokeStyle=fCol;
			ctx.lineWidth=10;
			ctx.arc(x_axle, y_axle, diameter, 0, 0.0174 * n * json[skill]);
			ctx.stroke();
		}
	},


	//请求数据
	quireDate:function(url,btn,evl,response,totalWorks){
		response = '';
		totalWorks= 0;
		

		btn.on(evl, load)
		function load(){
			var worksGroup = $('#works .wrap').find('img');
			//alert(totalWorks);
			$.get(url,function(data){
				//alert(Math.ceil(data.length/6))
				var pages = Math.ceil(data.length/6) - 1;
				if(pages < totalWorks){
					totalWorks = 0;
					$(btn).text('换一批');

				}else if(pages == totalWorks){
					$(btn).text('返回');
					
				}else if(pages > totalWorks){
					
				}
				console.log(totalWorks+','+pages)
				response = data.splice((totalWorks)*6, 6);
				totalWorks++;
				$(worksGroup).each(function(index){
					$(this).attr('src',response[index].src);
					$(this).parent().attr('href',response[index].url)
				});
		
			});
			

		};
		load();
		
	}
};



