module.exports=(err, req, res, next)=>{
    process.on("uncaughtException", (err)=>{
        res.status(500).send(
            {
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null,
              }
        )
    });
    process.on("unhandledRejection", (err)=>{
        res.status(500).send(
            {
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null,
              }
        )
    });
    process.on("exit", (err)=>{
        res.status(500).send(
            {
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null,
              }
        )
    })
} 