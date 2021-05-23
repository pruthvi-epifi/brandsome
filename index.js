const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const brandRoutes = require('./routes/brand');
const brandCategoryRoutes = require('./routes/brand_category');
const brandTagRoutes = require('./routes/brand_tag');
const searchRoutes = require('./routes/search');
const logRoutes = require('./routes/log');

app.use('/brands', brandRoutes);
app.use('/brand_categories', brandCategoryRoutes);
app.use('/brand_tags', brandTagRoutes);
app.use('/search', searchRoutes);
app.use('/logs', logRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Thanks for using our APIs. Cheers!')
})

// Connection to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, 
  () => { console.log('connected to db'); }
);

// Listening to port
app.listen(3000, function() {
  console.log('listening on 3000')
})