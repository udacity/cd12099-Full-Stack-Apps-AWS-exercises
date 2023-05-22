import { capturePrisma } from '@cosva-lab/aws-xray-sdk-prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const client = capturePrisma(prisma, { namespace: 'remote'})
  
export default client