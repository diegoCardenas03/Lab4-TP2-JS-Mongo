const express = require('express');
const connectDB = require('./database/config');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(express.json());

// Routes
// app.use('/api/paises', require('./routes/routerPais')); Para hacer la migracion
app.use('/api/consultas', require('./routes/routerConsultas'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});