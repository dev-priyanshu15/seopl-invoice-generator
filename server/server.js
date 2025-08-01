const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.NODE_ENV === 'production' ? true : ['http://localhost:3000'] }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/invoices', require('./routes/invoices'));
app.get('/api/health', (req, res) => { res.json({ status: 'Server running!' }); });

if (process.env.NODE_ENV === 'production') {
 app.use(express.static(path.join(__dirname, '../client/build')));
 app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build', 'index.html')));
}

app.listen(PORT, () => console.log(`íº€ Server running on port ${PORT}`));
