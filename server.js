const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const reminderRouter = require('./src/routes/reminderRouter');
const userRouter = require('./src/routes/userRouter');

app.get('/', (req, res) => {
    res.send('bem vindo ao sistema de lembretes');
});

app.use('/lembretes', reminderRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://10.0.0.11:${PORT}`);
});

module.exports = app;
