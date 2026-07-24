const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic API route
app.get('/api/specs', (req, res) => {
  res.json({
    name: 'iPhone 17 PRO',
    color: 'Copper/Orange',
    chip: 'A19 Pro',
    cameras: ['48MP Main', '48MP Ultrawide', '48MP Telephoto']
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
