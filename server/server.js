require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const petRouter = require('./Routes/PetRoute')
const AdoptFormRoute = require('./Routes/AdoptFormRoute')
const AdminRoute = require('./Routes/AdminRoute')
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(petRouter)
app.use('/form', AdoptFormRoute)
app.use('/admin', AdminRoute)

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(cors({
  origin: '*',
}));


const uri = 'mongodb+srv://laksannas631:idGpsuWHW8g9FZIu@cluster0.r9gz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
