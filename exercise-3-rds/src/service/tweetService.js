import prisma from "../prismaClient.js";

export class TweetService {
    async findTweetById(id){
         return await prisma.tweet.findUnique({
            where: {
              id: id,
            },
        });
    }
    
    async findAll(){
      return await prisma.tweet.findMany();
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