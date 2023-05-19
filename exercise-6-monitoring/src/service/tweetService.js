import prisma from "../prismaClient.js";

export class TweetService {
    async findTweetById(id){
      const result = await prisma.tweet.findUnique({
          where: {
            id: id,
          },
      });
      return result;
    }
    
    async findAll(){
      const result = await prisma.tweet.findMany();
      return result;
    }

    async findTweetsByAuthor(author){
        return await prisma.tweet.findMany({
           where: {
             author: author,
           },
       });
   }

   async createTweet(author, text, imgUrl){
    return await prisma.tweet.create({
       data: {
         author,
         text, 
         imgUrl
       },
   });
}
}

export default new TweetService()