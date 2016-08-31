if(Meteor.isClient){
	

	Template.MainLayout.events({
		'click .sign_in': function() {
			event.preventDefault();
			console.log("hello2")
		    Modal.show('SignIn')
		}
	})

	Template.MainLayout.onCreated(function(){
		console.log("what")
		function getScripts(scripts, callback) {
		    var progress = 0;
		    scripts.forEach(function(script) { 
		        $.getScript(script, function () {
		            if (++progress == scripts.length) callback();
		        }); 
		    });
		}
		getScripts([
				"http://jschr.github.io/textillate/assets/jquery.lettering.js", 
				"http://jschr.github.io/textillate/jquery.textillate.js"
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
	})
}

