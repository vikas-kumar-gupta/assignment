module.exports.getMiddleware = (req, res, next) => {
    console.log('this is a middleware message');
    next();
}