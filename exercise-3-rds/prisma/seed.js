import prisma from "../src/prismaClient";
import { tweets } from "./tweets";

const tweets = [
    { id: 0, author: 'Michael', text: 'Greyhounds are the fastest dog breed and can run at speeds of 40–45 mph.', imgUrl: ''},
    { id: 1, author: 'Jenny', text: 'Like humans, most dogs have a dominant hand – or in their case, paw!', imgUrl: ''},
    { id: 2, author: 'Jenny', text: 'Did you know that hummingbirds are the only birds that can fly backwards?', imgUrl: ''},
    { id: 3, author: 'Michael', text: 'Only nine percent of dog owners organize a birthday party for their pet. We should really improve in this area.', imgUrl: ''},
    { id: 4, author: 'George', text: 'Dalmatians are born without spots!  They are born with plain white coats with their first spots appearing after they are 1 week old.', imgUrl: ''}
]

async function main() {
    for(const t in tweets){
        await prisma.tweet.upsert({
            where: {id: t.id},
            update: {},
            create: {
                author: t.author,
                text: t.text,
                imgUrl: t.imgUrl
            }
        })
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
