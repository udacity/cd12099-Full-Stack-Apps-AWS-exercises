import jwt from "jsonwebtoken";
import { PRIVATE_KEY, PUBLIC_KEY } from "../../keys";


class TokenService {
  generateTokens(user) {
    const accessToken = jwt.sign(
      {
        email: user.email,
        tokenType: 'ACCESS_TOKEN',
      },
      PRIVATE_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY, algorithm: "RS256" }
    );
    const refreshToken = jwt.sign(
      {
        email: user.email,
        tokenType: 'REFRESH_TOKEN',
      },
      PRIVATE_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY, algorithm: "RS256" }
    );
    return { accessToken, refreshToken };
  }

  extractJwt(req) {
    if (!req.headers.authorization) {
      throw new Error("Missing Authorization header");
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      throw new Error("Failed to decode JWT token");
    }
    return decodedToken;
  }

  verifyToken(req) {
    if (!req.headers.authorization) {
        throw new Error("Missing Authorization header");
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, PUBLIC_KEY)
    return decodedToken;
  }
}

export default new TokenService();