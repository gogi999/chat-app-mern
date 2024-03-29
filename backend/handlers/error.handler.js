// Catch Errors Handler
export const catchErrors = (fn) => {
    return function (req, res, next) {
        fn (req, res, next).catch((err) => {
            if (typeof err === 'string') {
                res.status(400).json({
                    message: err 
                });
            } else {
                next(err);
            }
        });
    }
}

// MongoDB Validation Error Handler
export const mongooseErrors = (err, req, res, next) => {
    if (!err.errors) return next(err);

    const errorKeys = Object.keys(err.errors);
    let message = '';

    errorKeys.forEach((k) => (message += err.errors[k].message + ', '));

    message = message.substr(0, message.length - 2);

    res.status(400).json({
        message
    });
}

// Development Error Handler
export const developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack
    }

    res.status(err.status || 500).json(errorDetails);
}

// Production Error Handler
export const productionErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: 'Internal Server Error!'
    });
}

// 404 Page Error
export const notFound = (req, res, next) => {
    res.status(404).json({
        message: 'Route not found!'
    });
}
