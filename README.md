#Birdie

#Client Rest Endpoints
* GET /birdie/rest/topics............Gets all trending topics
* POST /birdie/rest/topic............Adds a trending topic to the server
* DELETE /birdie/rest/topic........Removes a trending topic from the server
* GET /birdie/rest/topics.............Searches topics by a supplied query string
* POST /birdie/rest/topics/load...Loads trending topics from Twitter and updates the data store
  
#Installation
<p>MongoDB is required. Please install the mongo database locally. Make sure MongoDB is running after installing.</p>
<p>After installing MongoDB locally, do an 'npm install' to install the module dependencies included in package.json.</p>
<p><b>To run: node server</b></p>
<p><b>NOTE: Please add a Twitter Consumer Key and Consumer Secret into the /config/config.js file</b></p>

#Example requests to server
<p>curl -X POST localhost:3000/birdie/rest/topics/load</p>
<p>curl -X GET localhost:3000/birdie/rest/topics</p>
<p>curl -X GET localhost:3000/birdie/rest/topics?query=hi</p>
<p>curl -X POST -H "Content-Type: application/json" -d '{"name":"topicName"}' localhost:3000/birdie/rest/topic</p>
<p>curl -X DELETE -H "Content-Type: application/json" -d '{"name":"topicName"}' localhost:3000/birdie/rest/topic</p>
<p>curl -X DELETE localhost:3000/birdie/rest/topic/topicName</p>


#Tested on
<p>OSX 10.7, Ubuntu/Precise64, LUbuntu using curl to issue requests</p>
