import tokenService from "../service/tokenService";

export const requiresAuth = () => {
  return (req, res, next) => {
    try{
        tokenService.verifyToken(req)
        return next()
    } catch(err) {
        return res.status(401).json({message: "Unauthorized"})
    }
  };
};

export default { requiresAuth };
