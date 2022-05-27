const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const blogRouter = require('./routes/product');
const Blog = require('./models/Product');
const app = express();


const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');


mongoose.connect('mongodb+srv://admin:admin@cluster0.84xx8.mongodb.net/products?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('index', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.listen(5000);
