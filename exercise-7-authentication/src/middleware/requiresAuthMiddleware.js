import tokenService from "../service/tokenService.js";

export const requiresAuth = () => {
  return (req, res, next) => {
    try{
        tokenService.verifyToken(req)
        return next()
    } catch(err) {
        console.log('Auth error', err)
        return res.status(401).json({message: "Unauthorized"})
    }
  };
};

export default { requiresAuth };
