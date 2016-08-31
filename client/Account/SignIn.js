if(Meteor.isClient){

	Template.ForgotPassword.events({
		'click .reset-password': function(){
			event.preventDefault();
			const email = $('#email').val();
			var options = {};
				options.email = email;
			Accounts.forgotPassword( options , function(error){
			    if(error){
			        Bert.alert(error.reason); // Output error if registration fails
			    } else {
					FlowRouter.go('/');
					Bert.alert({
					  title: 'You have received a link to your email address to reset your password.',
					  type: 'whats_pop',
					  style: 'growl-top-right',
					  icon: 'fa-check'
					});
			    }
			});
		}
	})

	Template.SignIn.events({
		'click .forgot-password': function(){
			event.preventDefault();
			Modal.hide('SignIn')
			Modal.show('ForgotPassword')
		},
		'click .log-in': function(){
			event.preventDefault();
			const email = $('#email').val(),
				 password = $('#password').val();
			Meteor.loginWithPassword(email, password, function(error){
			    if(error){
			        Bert.alert(error.reason); // Output error if registration fails
			    } else {
			    	Modal.hide('SignIn')
			        //FlowRouter.go('/');
			        // Redirect user if registration succeeds
			        window.location.href = "/";
			  //       Bert.alert({
					//   title: 'You have successfully signed in.',
					//   type: 'whats_pop',
					//   style: 'growl-top-right',
					//   icon: 'fa-check'
					// });
			    }
			});
		}
	})
}