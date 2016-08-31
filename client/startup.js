if (Meteor.isClient) {
	Meteor.startup(function() {
		
		function getScripts(scripts, callback) {
		    var progress = 0;
		    scripts.forEach(function(script) { 
		        $.getScript(script, function () {
		            if (++progress == scripts.length) callback();
		        }); 
		    });
		}
			getScripts([
					"https://jschr.github.io/textillate/assets/jquery.lettering.js", 
					"https://jschr.github.io/textillate/jquery.textillate.js"
				], function () {
			    		$('.title').fadeIn(1000)
			    		$('.title').textillate({ 
			    			minDisplayTime: 2000,
			    			in: { effect: 'fadeInUp', delay: 100 },
		  					out: { effect: 'flash', sync: true },
		  					callback: function () {
		  						$('.title_second').fadeIn(1000)
		  						$('.title_second').textillate({ 
					    			minDisplayTime: 2000,
					    			in: { effect: 'fadeInUp', delay: 100 },
					    			callback: function (){
					    				$('.content_button').animate({
						  					'margin-top': '2%',
						        			'opacity': 1
						    			}, 800);
					    			}
					    		})
		  					} 
			    	});



			});
	});
}
