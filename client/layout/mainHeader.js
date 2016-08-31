if(Meteor.isClient){

	var isActive = false;

	Template.MainHeader.events({
		'click .js-menu': function(){
			event.preventDefault();
			if (isActive) {
				$(this).removeClass('active');
				$('body').removeClass('menu-open');
			} else {
				$(this).addClass('active');
				$('body').addClass('menu-open');
			}
			isActive = !isActive;
		},
		'click .log_out': function(event){
	        event.preventDefault();
	        Meteor.logout();
	        window.location.href = "/";

    	}
	})

}



