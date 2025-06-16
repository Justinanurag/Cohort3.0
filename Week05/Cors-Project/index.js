const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Hello Duniya! This is a CORS-enabled server.');
});

app.post('/sum', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({ sum: a + b });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
