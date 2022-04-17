require('dotenv').config({ path: './config.env' });
const app = require('./app');
const { sequelize } = require('./models')

const server = app.listen(process.env.PORT, async () => {
    await sequelize.authenticate()
    console.log(`Connected to DB and Server is running on port: ${process.env.PORT}..`)
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
