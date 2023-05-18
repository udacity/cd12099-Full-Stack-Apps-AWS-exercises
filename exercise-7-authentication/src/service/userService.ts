import prisma from "../prismaClient";


class UserService {
  
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email: { email },
      },
    });
  }
}

export default new UserService();
