import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
  credentials: {
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
  },
  region: process.env["AWS_REGION"],
});

class SecretsService {
  async getJwtPrivateKey() {
    try{
      const secret =  await client.send(new GetSecretValueCommand({
        SecretId: "tweets-app-jwt-private-key"
      }))
      return secret.SecretString
    } catch(e){
      console.error('Get jwt private key error', e)
    }
  }
  async getJwtPublicKey() {
    try{
      const secret =  await client.send(new GetSecretValueCommand({
        SecretId: "tweets-app-jwt-public-key"
      }))
      return secret.SecretString
    } catch(e){
      console.error('Get jwt public key error', e)
    }
  }
}

export default new SecretsService();
