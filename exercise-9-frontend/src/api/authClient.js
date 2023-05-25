import backendClient from "./backendClient"

class AuthClient {
    async login(email, password) {
        const response = await backendClient.post(`/auth/token`, {
          email,
          password,
        })
        return { accessToken: response.data.access_token }
    }
}

const authClient = new AuthClient()
export default authClient