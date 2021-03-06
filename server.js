require('dotenv').config()

var express = require('express')
var expressRest = require('express-rest')
var randomstring = require("randomstring")
var EventHubClient = require('azure-event-hubs').Client
var app = express()
var rest = expressRest(app)

var port = process.env.PORT || 1337;
var baseHost = process.env.WEBSITE_HOSTNAME || 'localhost';
var client = EventHubClient.fromConnectionString(process.env.EVENT_HUB, process.env.EVENT_HUB_NAME)

var sender = null

rest.post('/analytics', function(req, rest) {
  console.log(req.body)
  sender.send(req.body, randomstring.generate(5))
  rest.ok()

})

rest.get('/test', function(req, rest) {
  rest.ok({"hello":"world!"})
})


client.createSender()
  .then(function (tx) {
    sender = tx
    sender.on('errorReceived', function (err) { console.error(err) })

    app.listen(port, baseHost, function (err) {
      if(err){
        console.error(err)
      }
      
      console.log('Listening on port ' + port + '!')
    })

  })
