const notFound = (req, res, next) => {
    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status(400);
    next()
};

const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
        stack: err?.stack,
        message: err?.message
    })
};

module.exports = {
    notFound,
    errorHandler
}