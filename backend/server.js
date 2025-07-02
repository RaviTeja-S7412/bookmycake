const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const router = express.Router();
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const app = express();
env.config();
// app.use(bodyParser());



app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
const mongo = require('./src/connection.js');

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

router.get("/", function test(){
  return "hello";
});

mongo.connectToServer( function( err) {
    if (err) console.log(err);
      app.use(cors());
      app.use('/categories', express.static(path.join(__dirname, './uploads', 'categories')));
      app.use('/products', express.static(path.join(__dirname, './uploads', 'products')));
      app.use('/props', express.static(path.join(__dirname, './uploads', 'props')));
      app.use('/banners', express.static(path.join(__dirname, './uploads', 'banners')));
  // auth routes
      app.use('/api',require('./src/routes/admin/auth.js'));
      app.use('/api',require('./src/routes/admin/admin.js'));
      app.use('/api',require('./src/routes/admin/categories.js'));
      app.use('/api',require('./src/routes/admin/products.js'));
      app.use('/api',require('./src/routes/admin/cart.js'));
      app.use('/api',require('./src/routes/admin/cities.js'));
      app.use('/api',require('./src/routes/admin/areas.js'));
      app.use('/api',require('./src/routes/admin/props.js'));
      app.use('/api',require('./src/routes/admin/propcategories.js'));
      app.use('/api',require('./src/routes/admin/user_login.js'));    
      app.use('/api',require('./src/routes/admin/orders.js'));    
      app.use('/api',require('./src/routes/admin/cron.js'));    
      app.use('/api',require('./src/routes/admin/banners.js'));    
})

app.listen(3000,() =>{
  console.log(`server is running on 3000`);
});
app.use(express.json());
