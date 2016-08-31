Meteor.methods({
   sendVerificationLink: function (userId) {
    check(userId, String);
    this.unblock();
    Accounts.sendVerificationEmail(this.userId);
}
});






