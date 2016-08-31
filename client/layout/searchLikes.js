if(Meteor.isClient){
	var total = '';

	Session.setDefault('searching', false);

	Tracker.autorun(function() {  
	  if (Session.get('query')) {
	    var searchHandle = Meteor.subscribe('whatspopSearch', Session.get('query'));
	    Session.set('searching', ! searchHandle.ready());
	  }
	});

	Template.SearchLikes.events({  
	  'click #searchsubmit': function() {
	    event.preventDefault();
	    var query = $('#searchwhatspop').val();

	    console.log(query)
	    if (query)
	      Session.set('query', query);
	  	Meteor.setTimeout(function(){
	  		$('#search_val').empty().append(query);
   			//console.log("Timeout called after three seconds...");
   			const facebook_val = Tumblr.findOne().facebook,
      			  tumblr_val = Tumblr.findOne().tumblr,
      			 total = tumblr_val + facebook_val;
      		console.log(facebook_val) 
      		circlesd3(total);
      		//$('#search_val').append(query);
   		}, 4000);

	  	},
	  	'click #btnSave': function() {
    		console.log('hello') 
    		var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

		//console.log(html);
		var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
		var img = '<img src="'+imgsrc+'">'; 
		d3.select("#svgdataurl").html(img);
		var canvas = document.querySelector("canvas"),
		    context = canvas.getContext("2d");
		var image = new Image;
		image.src = imgsrc;
		image.onload = function() {
			context.drawImage(image, 0, 0);
			 //save and serve it as an actual filename
			binaryblob();
			var a = document.createElement("a");
			a.download = "whats_pop_visual.png";
			a.href = canvas.toDataURL("image/png");
			var pngimg = '<img src="'+a.href+'">'; 
			d3.select("#pngdataurl").html(pngimg);
			a.click();
		};
		}



	});

	Template.SearchLikes.helpers({ 
	searching: ()=> {
	    return Session.get('searching');
	},
	facebook_num: ()=> {
		var val = Tumblr.findOne().facebook;
		//console.log(Images.find({listing_id: id}, {sort:{uploadedAt:-1}}))
		console.log(val)
		return val
	},
	tumblr_num: ()=> {
		var val = Tumblr.findOne().tumblr;
		//console.log(Images.find({listing_id: id}, {sort:{uploadedAt:-1}}))
		console.log(val)
		return val
	},

	  
	});

	Template.SearchLikes.onCreated(function(){
		var self = this;
		self.autorun(function() {
			self.subscribe('tumblr');
		});
		Meteor.setTimeout(function(){
   			//console.log("Timeout called after three seconds...");
   			const facebook_val = Tumblr.findOne().facebook,
      			  tumblr_val = Tumblr.findOne().tumblr,
      			 total = tumblr_val + facebook_val;
      		console.log(facebook_val) 
      		circlesd3(total);
      		$('#search_val').append(query);
   		}, 4000);

	})

	function binaryblob(){
		var byteString = atob(document.querySelector("canvas").toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")); //wtf is atob?? https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }
	    var dataView = new DataView(ab);
		var blob = new Blob([dataView], {type: "image/png"});
		var DOMURL = self.URL || self.webkitURL || self;
		var newurl = DOMURL.createObjectURL(blob);

		var img = '<img src="'+newurl+'">'; 
	  	d3.select("#img").html(img);
	}


	function circlesd3(total){
      		var width = 960,
			    height = 500,
			    padding = 1.5, // separation between same-color circles
			    clusterPadding = 6, // separation between different-color circles
			    maxRadius = 12;

			var n = 200, // total number of circles
			    m = total; // number of distinct clusters

			var color = d3.scale.ordinal()
			      .range(["#1e2845", "#d3d3d3"]);

			// The largest node for each cluster.
			var clusters = new Array(m);

			var nodes = d3.range(n).map(function() {
			  var i = Math.floor(Math.random() * m),
			      r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
			      d = {cluster: i, radius: r};
			  if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
			  return d;
			});

			var force = d3.layout.force()
			    .nodes(nodes)
			    .size([width, height])
			    .gravity(0)
			    .charge(0)
			    .on("tick", tick)
			    .start();



			var svg = d3.select("#d3_circles").append("svg")
			    .attr("width", width)
			    .attr("height", height);

			svg.append("rect")
			    .attr("width", "100%")
			    .attr("height", "100%")
			    .attr("fill", "#f9bebd");

			var circle = svg.selectAll("circle")
			    .data(nodes)
			  .enter().append("circle")
			    .attr("r", function(d) { return d.radius; })
			    .style("fill", function(d) { return color(d.cluster); })
			    .call(force.drag);

			function tick(e) {
			  circle
			      .each(cluster(10 * e.alpha * e.alpha))
			      .each(collide(.5))
			      .attr("cx", function(d) { return d.x; })
			      .attr("cy", function(d) { return d.y; });
			}

			// Move d to be adjacent to the cluster node.
			function cluster(alpha) {
			  return function(d) {
			    var cluster = clusters[d.cluster],
			        k = 1;

			    // For cluster nodes, apply custom gravity.
			    if (cluster === d) {
			      cluster = {x: width / 2, y: height / 2, radius: -d.radius};
			      k = .1 * Math.sqrt(d.radius);
			    }

			    var x = d.x - cluster.x,
			        y = d.y - cluster.y,
			        l = Math.sqrt(x * x + y * y),
			        r = d.radius + cluster.radius;
			    if (l != r) {
			      l = (l - r) / l * alpha * k;
			      d.x -= x *= l;
			      d.y -= y *= l;
			      cluster.x += x;
			      cluster.y += y;
			    }
			  };
			}

			// Resolves collisions between d and all other circles.
			function collide(alpha) {
			  var quadtree = d3.geom.quadtree(nodes);
			  return function(d) {
			    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
			        nx1 = d.x - r,
			        nx2 = d.x + r,
			        ny1 = d.y - r,
			        ny2 = d.y + r;
			    quadtree.visit(function(quad, x1, y1, x2, y2) {
			      if (quad.point && (quad.point !== d)) {
			        var x = d.x - quad.point.x,
			            y = d.y - quad.point.y,
			            l = Math.sqrt(x * x + y * y),
			            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
			        if (l < r) {
			          l = (l - r) / l * alpha;
			          d.x -= x *= l;
			          d.y -= y *= l;
			          quad.point.x += x;
			          quad.point.y += y;
			        }
			      }
			      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
			    });
			  };
			}
		}


}