module.exports = app =>{
    usersControllers =  require("../controllers/users.controllers")

    app.get('/', usersControllers.home);

    app.post('/validate-rule', usersControllers.validateRule);
}