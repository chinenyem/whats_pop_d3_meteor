# whats_pop_d3_meteor
sign in, log out, api, d3 visualization, download d3svg, upload profile pic

view App here 
https://whatspopapp.meteorapp.com

P.S 
If I did not personally send you an notification via that I added you to mailgun you will not recieve an verification email when you sign up. 

Project Deliverables:
- Make an asynchronous call (or calls) to a 3rd party API
  First I researched to see what social media applications api I can use that were not limited on number of responses, and did not require me to be the user to search for a tag or liked image. The two social media app api that won was Tumblr and Facebook. The main work is on the server/publish.js file. HTTP.get call and looping through the responses to get an total length objects receieved. I needed the total number of both calls so I can pass it to my D3js function on the client side. 
- File Uploading
  The user can upload profile pic. I used FS.Utility for file uploading. I am storing my images on AWS. The main code is in the client/user/uploadimage.js. Basically passing an object to my Images collection on the server to be stored on AWS. The code for image collection is in collections/images.js
- File downloading to browser
  This feature was interesting. I use canvas to redraw my svg. Then I attach my blob data to an image tag. Shout out to http://techslides.com/save-svg-as-an-image. Finally figure out how to get it work in meteor. 
- Graph based dashboard 
I used d3 collision detection feature here. I wanted to create a creative visualization of random distinct data. There are two groups. One representing Facebook and another Tumblr. When you press submit, the values are pass to HTTP.get call. The call sends back response. I count the response and pass it to my d3 function, which produces a a data visualization. When you hover over it, the nodes move. When the visualization is done loading and moving the user can download the image by clicking download button. 
- Deployed 
I decided to deploy to galaxy. For meteor it is easy to deploy to, scalable, and provides tons of metrics. 

Future work:
make site more user friendly better responsiveness
build out profile page
