import argon2 from "argon2";

class PasswordService {
  async hashPassword(password) {
    return argon2.hash(password);
  }

  async verifyPassword(password, hash) {
    return await argon2.verify(hash, password);
  }
}

export default new PasswordService();
