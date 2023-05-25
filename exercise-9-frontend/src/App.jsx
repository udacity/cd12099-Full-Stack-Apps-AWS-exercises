import { useEffect, useState } from 'react';
import './App.css';
import authClient from './api/authClient';
import tweetsClient from './api/tweetsClient';
import LoginForm from './components/LoginForm';
import TweetsList from './components/TweetsList';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const [token, setToken] = useState('')
  const [tweets, setTweets] = useState([])

  useEffect(()=>{
    const accessToken = window.sessionStorage.getItem('token')
    if (accessToken){
      setToken(accessToken)
      setIsLoggedIn(true)
    }
  },[])

  useEffect(()=>{
    const getTweets = async () => setTweets(await tweetsClient.getTweets(token))
    if(isLoggedIn && token){
      getTweets()
    }
  }, [token, isLoggedIn])

  const handleLogin = async (e) => {
    try{
      e.preventDefault()
      const { accessToken } = await authClient.login(e.target.email.value, e.target.password.value)
      setIsLoginFailed(false)
      setIsLoggedIn(true)
      setToken(accessToken)
      window.sessionStorage.setItem('token', accessToken)
    } catch(e){
      console.error('Login failed', e);
      setIsLoginFailed(true)
    }
  };

  const handleLogout = (e) => {
    e.preventDefault()
    window.sessionStorage.removeItem('token')
    setIsLoggedIn(false)
    setToken(null)
    setTweets([])
  }

  return (
    <div className="App">
      {!isLoggedIn ? <LoginForm isLoginFailed={isLoginFailed} handleLogin={handleLogin}/> 
      : <TweetsList tweets={tweets} handleLogout={handleLogout}/>}
    </div>
  );
}

export default App;
