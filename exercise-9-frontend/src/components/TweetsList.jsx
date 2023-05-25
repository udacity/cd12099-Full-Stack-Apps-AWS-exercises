
function TweetsList(props) {
  return (
    <div>
      {props.tweets.map(t => {
      return (
        <div key={t.id}>
          <div>Author: {t.author}</div>
          <div>{t.text}</div>
          <br/>
        </div>
      )}
      )}
    <br/>
    <button className="primary" onClick={props.handleLogout}>Logout</button>  
    </div>
  );
}

export default TweetsList