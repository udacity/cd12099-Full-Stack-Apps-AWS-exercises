import { useEffect, useState } from 'react';
import './App.css';
import authClient from './api/authClient';
import tweetsClient from './api/tweetsClient';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [tweets, setTweets] = useState([])
  const [isLoginFailed, setIsLoginFailed] = useState(false)

  useEffect(()=>{
    const accessToken = window.sessionStorage.getItem('token')
    console.log('process', process.env['REACT_APP_BACKEND_URL'])
    console.log('process2', process.env['BACKEND_URL'])
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

  const login = async (e) => {
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

  const logout = (e) => {
    e.preventDefault()
    window.sessionStorage.removeItem('token')
    setIsLoggedIn(false)
    setToken(null)
  }

  return (
    !isLoggedIn ?
    <div className="App">
      <form className="form" onSubmit={login}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email"/>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <button className="primary">Enter</button>
      </form>
      {isLoginFailed ? <div style={{color: 'red'}}>Invalid username or password</div> : ''}
    </div>
    :
    <div className="App">
    <div>{tweets.map(t => {
      return (
        <div key={t.id}>
          <div>Author: {t.author}</div>
          <div>{t.text}</div>
          <br/>
        </div>
      )}
      )}</div>
    <br/>
    <button className="primary" onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
