require('dotenv').config()

var express = require('express')
var expressRest = require('express-rest')
var randomstring = require("randomstring")
var EventHubClient = require('azure-event-hubs').Client
var app = express()
var rest = expressRest(app)

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

    var port = process.env.PORT || 8080

    app.listen(8080, function (err) {
      if(err){
        console.error(err)
      }
      console.log('Listening on port 8080!');
    })

  })
