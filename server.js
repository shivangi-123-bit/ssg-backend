require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Simple GET route to confirm server is running
app.get("/", (req, res) => {
  res.send("🎉 SSG Backend is live and working!");
});

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  propertyId: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// POST route for contact form
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    console.log('✅ Form data saved to MongoDB:', contact);
    res.status(201).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('❌ Error saving contact form data:', error);
    res.status(500).json({ message: 'Failed to save form data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
