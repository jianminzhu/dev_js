import  express  from 'express'
import schema from './schema'

import { graphql } from 'graphql'
import bodyParser from 'body-parser'

var app = express();
var PORT = 3000;

//Parse post content as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  //GraphQL executor
  graphql(schema, req.body)
      .then((result) => {
        res.send(JSON.stringify(result, null, 2));
      })
});

var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});