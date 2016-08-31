import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
	Accounts.config({
  		sendVerificationEmail: true
	});

  //console.log(Meteor.settings.hello);
  process.env.MAIL_URL = "smtp://postmaster%40sandboxf38a265c406b445b8a6d6c148556f630.mailgun.org:4c62a1de5e8e82dc2f008b90e6cfdcb7@smtp.mailgun.org:587";
		Accounts.emailTemplates.from='no-reply@yourdomain.com';
		Accounts.emailTemplates.sitename='What\'s Popular' ;

		Accounts.emailTemplates.verifyEmail.subject = function(user){
			return 'What\'s Popular user Confirm Your Email Address'
		};

		Accounts.emailTemplates.verifyEmail.text = function(user, url){
			url: Meteor.settings.public.domain

			return 'click on the following link to verify your email address:' + url;
		};

		Accounts.emailTemplates.resetPassword.from = function (user, url) {
   			// Overrides value set in Accounts.emailTemplates.from when resetting passwords
   			return "What\'s Popular Password Reset <no-reply@example.com>";
		};

		Accounts.emailTemplates.resetPassword.subject = function (user, url) {
   			// Overrides value set in Accounts.emailTemplates.from when resetting passwords
   			return 'click on the following link to reset your password your email address: /reset-password/' + url;

		};
});







