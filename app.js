const express = require('express');
const AppError = require('./utils/appError');
const session = require('express-session');
const passport = require('passport');
require('./oauth')

const app = express();
// app.use(session({ secret: 'cats' }));
// app.use(passport.initialize());
// app.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['email', 'profile'] })
// );

app.use(require('body-parser').json());
app.use('/admin', require('./routes/admin/adminRouter'));
app.use('/public', require('./routes/public/publicRouter'));
app.use('/users', require('./routes/users/usersRouter'));

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(require('./controllers/errController'))

setInterval(() => {
    require('./utils/timesetScripts').timeset()
}, 5000)

module.exports = app;