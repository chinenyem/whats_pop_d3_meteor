if(Meteor.isClient){

	Template.SignUp.onCreated(function(){
		var self = this;
	  	self.limit = new ReactiveVar;
	    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));
	    self.autorun(function() {
	      self.subscribe('images', self.limit.get());
	    });
	});

	const userId = '';

	Template.SignUp.events({
		'click .create_account': function(){
			event.preventDefault();
			const username = $('#username').val(),
				 email = $('#email').val(),
				 password = $('#password').val(),
				 likes = $('#likes').val();
			if (username == '' || email == '' || password == '' ){
				Bert.alert({
					title: 'Please complete required input fields.',
				  	type: 'whats_pop',
				  	style: 'growl-top-right',
				  	icon: 'fa-bug'
				});
			}else{
				 Accounts.createUser({
						username: username,
						email: email, 
						password: password,
						profile : {
							social_likes : likes
						}
						
				},
				 function(error){
				    if(error){
				        Bert.alert(error.reason); // Output error if registration fails
				    } else {
				    	
				        FlowRouter.go('search'); // Redirect user if registration succeeds
				        Bert.alert({
						  title: 'You have successfully created a profile.',
						  type: 'whats_pop',
						  style: 'growl-top-right',
						  icon: 'fa-check'
						});
				    }
				});
			}
		}
	});


}