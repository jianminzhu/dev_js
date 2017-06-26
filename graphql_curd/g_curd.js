//npm init
//npm install --save graphql graphql-relay graphql-sequelize sequelize express express-graphql  graphql-sequelize-crud 
//npm install --save mysql
 

 

// Project Dependencies.
const Sequelize = require('sequelize');
const { getSchema } = require('graphql-sequelize-crud');

// Optional: Use express-graphql.
const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();

// Create Sequelize instance.
const sequelize = new Sequelize(/* configure Sequelize */);

// Define Sequelize models.
// See demo source code.
// ...

// Generate GraphQL Schema from Sequelize instance and models.
const schema = getSchema(sequelize);

// Optional: Create express-graphql server.
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});