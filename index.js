const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(express.json());
app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

//Port Setting
const PORT = process.env.PORT;

//DataBase
const db = require('./models');

//API Test
app.get('/', (req, res) => {
	res.send(`
        <a href="/auth/kakao">LogIn</a>
        <a href="/auth/kakao/logout">LogOut</a>
    `);
});

//API Router Call
const ApiRouter = require('./routes/');
app.use('/', ApiRouter);

//Port
db.sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
