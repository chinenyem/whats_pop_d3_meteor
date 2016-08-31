Meteor.publish('user', function(id){
	check(id, String);
	return User.find({_id: id})
});

Meteor.publish('images', function(limit) {
  check(limit, Number);
  return Images.find({}, {
    limit: limit,
    sort: {uploadedAt: -1}
  });
});


Meteor.publish('whatspopSearch', function(query) {  
  var self = this;
  try {
  	var tumblr_url = 'https://api.tumblr.com/v2/tagged?tag=' + query + '&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4'
    var tumblr_response = HTTP.get(tumblr_url);
    var tumblr_data = JSON.parse(tumblr_response.content),
    	num_tumblr = [];
    for (var i in tumblr_data){
    	var tumblr_info = tumblr_data[i];
    	num_tumblr.push(tumblr_info);
    }
    console.log(tumblr_info)
    console.log('tumblr' + tumblr_info.length)
    var tumblr_val = tumblr_info.length;

    var facebook_url = 'https://graph.facebook.com/search?q=' + query + '&type=page&access_token=EAAPuxfIw89QBAAZBZAgWG0ovgpoxwVdZCoWZAZBPAvsXTlMfRS2ddLCAUcJfnGehknZB0WMtC0jSHCsiVd31f9JLw25e8ZC4jN6ZBsEfHkEx6HVZB0QvHYB5ugMLpK2zlzf6FjewZAWuTerk8DLvjgZBkhO'
    var facebook_response = HTTP.get(facebook_url);
    var facebook_data = JSON.parse(facebook_response.content),
    	num_facebook = [];
    	console.log(facebook_data)
    	console.log('facebook' + facebook_data.data.length)
    var facebook_val = facebook_data.data.length
    //var val_array = [];
    //val_array.push(tumblr_val);
    //val_array.push(facebook_val)
    var doc ={
    	facebook : facebook_val,
    	tumblr : tumblr_val
    }
    self.added('tumblr', Random.id(), doc);
    self.ready();

  } catch(error) {
    console.log(error);
  }
});