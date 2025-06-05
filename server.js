const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

require('dotenv').config(); // to load environment variables

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  propertyId: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    console.log('Form data saved to MongoDB:', contact);
    res.status(201).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving contact form data:', error);
    res.status(500).json({ message: 'Failed to save form data' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// node server.js -- to start the server
// Ensure MongoDB is running before starting the server and you are in same directory as server.js file is