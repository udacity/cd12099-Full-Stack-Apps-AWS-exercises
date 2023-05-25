import backendClient from "./backendClient"

class TweetsClient {
    async getTweets(token) {
        try {
            console.log('token', token)
            const response = await backendClient.get(`/tweets`, {headers: {Authorization: `Bearer ${token}`}})
            return response.data
        } catch(e){
            console.error('Get tweets error', e)
            return []
        }
    }
}

const tweetsClient = new TweetsClient()
export default tweetsClient