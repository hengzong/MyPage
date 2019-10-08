/*
 * Connect all endpoints together here.
 */

module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/login', require('./login.js'));
    app.use('/logout', require('./logout.js'));
    app.use('/user_name', require('./user_name.js'));
    app.use('/email', require('./email.js'));
    app.use('/search', require('./search.js'));
    app.use('/register', require('./register.js'));
    app.use('/edit', require('./edit.js'));
    app.use('/api/components', require('./components.js'));
    app.use('/api/components/:id',require('./component.js'));
    app.use('/api/users', require('./users.js'));
    app.use('/api/users/:user_name', require('./user.js'));
    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError) {
            res.status(400);
            return res.json({
                message: "Invalid JSON",
                data: {}
            });
        }
        console.error(err);
        res.status(500);
        res.json({
            message: "Server Error",
            data: {}
        });
    });
};
