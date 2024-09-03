const express = require('express');
const cors = require('cors');
const router = express.Router();
require('dotenv').config(); 

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

router.get('/', (req, res) => {
    res.json({ message: 'Hello from Express' });
});

app.use('/api', router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
