#Birdie - Imoji server exercise

#Client Rest Endpoints
* GET /birdie/rest/topics............Gets all trending topics
* POST /birdie/rest/topic............Adds a trending topic to the server
* DELETE /birdie/rest/topic........Removes a trending topic from the server
* GET /birdie/rest/topics.............Searches topics by a supplied query string
* POST /birdie/rest/topics/load...Loads trending topics from Twitter and updates the data store
  
#Installation
<p>MongoDB is required. Please install the mongo database locally.</p>
<p>After installing MongoDB locally, do an 'npm install' to install the module dependencies included in package.json.</p>
