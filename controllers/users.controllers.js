let validation = require("./validations")
exports.home=(req, res)=>{
    res.status(200).contentType("application/json").end(JSON.stringify(validation.userObject()));
}

exports.validateRule=(req, res)=>{
    let {rule, data} =  req.body;
    console.log(req.body)
    console.log(typeof(rule))
    let validateRule =  validation.validateRule(rule, data)
    validateRule.status === "error" ? res.status(400).contentType("application/json").end(JSON.stringify(validateRule)) : 
                                      res.status(200).contentType("application/json").end(JSON.stringify(validateRule))


}