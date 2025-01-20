const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');

const app = express();
env.config();
// app.use(bodyParser());



app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
const mongo = require('./connection.js');

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
mongo.connectToServer( function( err) {
    if (err) console.log(err);
      app.use(cors());
      app.use('/categories', express.static(path.join(__dirname, '../uploads', 'categories')));
  // auth routes
      app.use('/api',require('./routes/admin/auth'));
      app.use('/api',require('./routes/admin/admin'));
      app.use('/api',require('./routes/admin/categories'));
      // app.use('/api',require('./routes/admin/clients'));
      // app.use('/api',require('./routes/admin/employees'));
      // app.use('/api',require('./routes/admin/leads'));
      // app.use('/api',require('./routes/admin/routes'));
    
})

app.listen(process.env.PORT,() =>{
  console.log(`server is running on ${process.env.PORT}`);
});
app.use(express.json());
