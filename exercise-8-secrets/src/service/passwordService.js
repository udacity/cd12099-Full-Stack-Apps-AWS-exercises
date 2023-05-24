import argon2 from "argon2";
import crypto from 'crypto'

class PasswordService {
  async hashPassword(password) {
    let salt = crypto.randomBytes(16);
    const hashedPassword = await argon2.hash(password, { salt })
    return {hashedPassword, salt: salt.toString('base64')};
  }

  async verifyPassword(password, hash, salt) {
    return await argon2.verify(hash, password, { salt });
  }
}

export default new PasswordService();
