function authMiddleware(request, response, next) {
    console.log(request.headers.authorization);
    const authToken = request.headers.authorization;

    if (authToken) {
        return response.status(401).json({error:'Token not provided'})
    }

    return next();
}


export default authMiddleware;
