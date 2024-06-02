const express = require('express');
const app = express();
const cors = require('cors')
const routes = require('./routes/router');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});