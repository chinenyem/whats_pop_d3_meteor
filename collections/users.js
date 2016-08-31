
Schemas = {}


Schemas.UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		regEx: /^[a-zA-Z-]{2,25}$/,
		optional: true
	},
	lastName: {
		type: String,
		regEx: /^[a-zA-Z]{2,25}$/,
		optional: true
	},
	social_likes: {
		type: String
		//optional: true
	}
});

Schemas.User = new SimpleSchema({
	username: {
		type: String,
		regEx: /^[a-z0-9A-Z_]{3,15}$/
	},
	emails: {
		type: [Object],
		optional: true
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	"profile.$.social_likes": {
		type: String
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: Schemas.UserProfile,
		optional: true
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	}
});
Meteor.users.attachSchema(Schemas.User);


Meteor.users.allow({
	  insert: function () { return true; },
	  update: function () { return true; },
	  remove: function () { return true; }
});