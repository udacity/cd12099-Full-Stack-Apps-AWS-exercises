
### Setup Node Environment
In this exercise you will be implementing a JSON web token (jwt) into our login exercise that we previously used. You can either use this code base or make the changes to your already running login exercise. 

### Reuse the existing database
For this exercise we will reuse our existing user table from the login exercise.

1. If you are going to use this codebase you will need to update the config file. In the directory api/config you will see a config.json file. Since we are just working with the development configuration, update the config file with the following changes.
```
    "development": {
        "username": "Your username",
        "password": "Your password",
        "database": "Your database name",
        "host": "Your URL",
        "port": "5432",
        "dialect": "postgres",
        "aws_region": "Your region",
        "aws_profile": "default"
    }

```
### Run the server
To run the server run the following commands lines from a terminal in the root directory

1. `npm install`
2. `node server`

### jwt function
Jwt is a token signed by the server. After the user logins in they are provided a signed jwt. Each corresponding request to the server will contain a jwt. The server uses this to ensure communication is coming from a specific authenticated user. 

1. Write the new jwt function in `routes/auth.router.js` file
```
function generateJWT(user) {
    //Use jwt to create a new JWT Payload containing
    return jwt.sign(user.toJSON(), config.jwt);
}
```
### Modify the existing `/login` endpoint to create a jwt and return it to the client
```
router.post('/login', async (req, res) => {
const email = req.body.email;
const password = req.body.password;

    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!password) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    const user = await model.user.findByPk(email);
    // check that user exists
    if(!user) {
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }

    // check that the password matches
    const authValid = await comparePasswords(password, user.password)

    if(!authValid) {
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }
```
Here is where we modified the exiting endpoint to create and return a jwt.

```
    // Generate JWT
    const jwt = generateJWT(user);

    res.status(200).send({ auth: true, token: jwt});
});
```
### Get the jwt
The best way to get a jwt is to login as a user. Run the server now and then register and login to collect the jwt. We will need to save it and use it for the last part of this exercise

1. `npm install`
2. `node server`
3. From another terminal run register a new user `curl -X POST http://localhost:8000 -d "{\"email\":\"bob@gmail.com\", \"password\":\"1111\"}" -H "Content-Type: application/json"`
4. Login and save the jwt `curl -X POST http://localhost:8000/login -d "{\"email\":\"bob@gmail.com\", \"password\":\"1111\"}" -H "Content-Type: application/json"`

Note: The jwt will be a very long string. Make sure you copy and save it to a text file so you don't lose it. 



### Verify endpoint
1. Write the `/verify` endpoint
```
router.get('/verify', async (req, res) => {
 
//Check to make sure the request has a header
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({ message: 'No authorization headers.' });
    }
    
//split the token from the text bearer token
    const token_bearer = req.headers.authorization.split(' ');

    if(token_bearer.length != 2){
        return res.status(401).send({ message: 'Malformed token.' });
    }
   
//Isolate just the token to use it to veirfy the request
    var token = token_bearer[1];

	var payload
	try {
	    //The payload is the user object
		payload = jwt.verify(token, config.jwt);

	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).send({ message: 'Error 401'}).end();
		}
		return res.status(400).send({ message: 'Error 400'}).end();
	}
	//If there are no errors the user has authenticated in
    res.status(200).send({ message: 'You are authenticated in !!!'});
});
```

#### Test cURL command
Here are the provided curl commands along with an example.
Command 
`curl http://localhost:8000/verify -H "Authorization: Bearer ENTER_YOUT_JWT_HERE"`

Example
`curl http://localhost:8000/verify -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJvYkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRnbW1nMC9uR2JsYS5vdFFuWTlnWnEucEJWY0ZVNTR4Mm9zNFpnTEJieDBTNUtmZzVLMmlqSyIsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMjBUMTg6MTc6MjkuODUyWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMjBUMTg6MTc6MjkuODUyWiIsImlhdCI6MTY3NDI0NzY2NX0.T2TCydjLgt2DjkWpwF-WlznWtd-N-FqRbqBlN-KSiy8"`
