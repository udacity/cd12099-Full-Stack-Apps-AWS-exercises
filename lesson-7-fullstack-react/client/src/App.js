import React, { Component } from "react";
import "./App.css";

class App extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
    };

    const response =  fetch('http://localhost:8000/login', requestOptions)
    .then(async response => {
      if(response.status == 200){
        alert("You logged in!!!");
      }else{
        alert("Error: 401, invalid username or password");
      }
     })
    .catch(error => {
        alert(error.toString() );
      });
  };

  render() {
    return (
      <div className="App">
        <form className="form" onSubmit={this.handleSubmit}>
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
      </div>
    );
  }
}

export default App;