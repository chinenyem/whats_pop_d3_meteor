Template.dropzone.events({
  'dropped #dropzone': function(e) {
   var count =   Images.find().count()
   console.log(count)

   
        const user = Meteor.user();
        FS.Utility.eachFile(e, function(file) {
        const newFile = new FS.File(file);
        newFile.username = user.username;
        newFile.userId = user._id;
        
        Images.insert(newFile, function (error, fileObj) {
          if (error) {
            Bert.alert({
              title: 'Upload failed... please try again.',
              type: 'whats_pop',
              style: 'growl-top-right',
              icon: 'fa-bug'
            });
          } else {
            Bert.alert({
              title: 'Upload Succeed',
              type: 'whats_pop',
              style: 'growl-top-right',
              icon: 'fa-check'
            });
          }
        });
      });
  
}
})



Template.dropzone.onCreated(function(){
  var self = this;
  self.limit = new ReactiveVar;
  self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));
  self.autorun(function() {
    self.subscribe('images', self.limit.get());
  });
});

