const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sureshulagadde8:maroti%40123@maroti.fklw95l.mongodb.net/insurance');

const customerSchema = new mongoose.Schema({
  uid: String,
  fullName: String,
  mobile: String,
  birthday: String,
  age: Number,
  address: String,
});

const Customer = mongoose.model('Customer', customerSchema);

// Add a customer
app.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.send(customer);
});

// Get all customers
app.get('/customers', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

// Delete a customer
app.delete('/customers/:uid', async (req, res) => {
  const { uid } = req.params;
  await Customer.deleteOne({ uid });
  res.send({ success: true });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
