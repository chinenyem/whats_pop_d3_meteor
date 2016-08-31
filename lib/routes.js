FlowRouter.route('/', {
	name: 'home',
	action(){
		// if( Meteor.userId() ){
		// 	FlowRouter.go('dashboard');
		// }
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout');
	}
});


FlowRouter.route('/signUp', {
  name: 'signUp',
  action(){
    BlazeLayout.render('SignUp');
  }
});

FlowRouter.route('/search', {
  name: 'search',
  action(){
    BlazeLayout.render('SearchLikes');
  }
});

FlowRouter.route('/profile', {
  name: 'profile',
  action(){
    BlazeLayout.render('UserProfile');
  }
});

FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go('/')
        Bert.alert({
          title: 'Email verified! Thanks!',
          type: 'whats_pop',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
      }
    });
  }
});

FlowRouter.route( '/reset-password/:token', {
  name: 'reset-password',
  action() {
  GAnalytics.pageview();
	BlazeLayout.render('MainLayout', {main: 'reset-password'});
    
  }
});


