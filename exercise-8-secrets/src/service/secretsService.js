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
  async getSecret(secretName) {
    try{
      const secret =  await client.send(new GetSecretValueCommand({
        SecretId: secretName
      }))
      return secret.SecretString
    } catch(e){
      console.error('Get secret error', e)
    }
  }

}

export default new SecretsService();
