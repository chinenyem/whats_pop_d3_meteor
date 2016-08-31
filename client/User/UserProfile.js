 Template.UserProfile.onCreated(function(){
 	var self = this;
 	self.autorun(function(){
 		self.subscribe('user');
	});

 	self.limit = new ReactiveVar;
    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));

	self.autorun(function() {
    	self.subscribe('images', self.limit.get());
  	});

 

});

Template.UserProfile.helpers({
	user: ()=> {
		return function(){ return Meteor.user() };
	},
	images: ()=>{
	    //var id = FlowRouter.getParam('id')
	    var image = Images.find();
	    console.log(image)
      var new_obj = image.collection_docs
      console.log(new_obj)
	     return image;
  	},
  	images_exist: ()=>{
      var user = Meteor.user();
        id = user._id
  		var one = Images.find({userId: id}, {sort:{uploadedAt:-1}});
	    
	    return true;
  	}
});

Template.registerHelper('equals', function(a,b) {
    return a === b;
});



Template.UserProfile.events({
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
              title: 'Upload failed... please try again.' + error,
              type: 'whats_pop',
              style: 'growl-top-right',
              icon: 'fa-bug'
            });
          } else {
          	window.location.href = "/profile";
            Bert.alert({
              title: 'Upload Succeed',
              type: 'whats_pop',
              style: 'growl-top-right',
              icon: 'fa-check'
            });
          }
        });
      });
  
},
'click .delete-image': function(e) {
    event.preventDefault();
    var sure = confirm('Are you sure you want to delete this image?');
    if (sure === true) {
      Images.remove({ _id:this._id }, function(error,result) {
        if (error) {
          Bert.alert({
              title: 'Delete failed...' + error,
              type: 'whats_pop',
              style: 'growl-top-right',
              icon: 'fa-bug'
            });
        } else {
          window.location.href = "/profile";
          Bert.alert({
              title: 'Image deleted!',
              type: 'whats_pop',
              style: 'growl-top-right',
              icon: 'fa-check'
            });
        }
      })
    }
  }

})

 

