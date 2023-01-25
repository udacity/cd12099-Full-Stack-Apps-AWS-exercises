
### Setup Node Environment

In this exercise you will be adding the code necessary for a user to login.

In the api directory run the following commands to setup your project.

### Create database
Let's create a new database

1. Update the config file. In the directory api/config you will see a config.json file. Since we are just working with the development configuration, update the config file with the following changes.

```
    "development": {
        "username": "Your username",
        "password": "Your password",
        "database": "login",
        "host": "Your URL",
        "port": "5432",
        "dialect": "postgres",
        "aws_region": "Your region",
        "aws_profile": "default"
    }

```
2. In the api directory run the create database command `npx sequelize-cli db:create`
3. In the same directory run the migration command `npx sequelize-cli db:migrate`

Now the database should be created in your aws environment along with a table named users.

### Hash and compare functions
Let's create our new functions in the following file routes/auth.router.js. The hash function takes in a user's plain text password and hashes it for security. This practice allows users passwords to be stored in a hash text in the database instead of plain text.

1. Write the hash function. This function creates a new salt. The salt is used to hash the plain text password. In this example we have chosen to generate a salt 10 times. Next we pass in the salt and plaintext password to create a hash password.

```
async function generatePassword(plainTextPassword) {
const rounds = 10;
const salt = await bcrypt.genSalt(rounds);
const hash = await bcrypt.hash(plainTextPassword, salt);

    return hash;
}
```
2. Write the compare function. This function uses `bcrypt.compare` to compare our hashed password with a plan text password
```
async function comparePasswords(plainTextPassword, hash) {
return await bcrypt.compare(plainTextPassword, hash);
}
```
### Register new user endpoint.
This endpoint is the root endpoint and will take in a new user. Compare it with the database to make sure the email is unique. If it is, then it will create a new user account.

```
//register a new user
router.post('/', async (req, res) => {
    //get email and password
    const email = req.body.email;
    const plainTextPassword = req.body.password;


    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!plainTextPassword) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    // find the user by using sequelize model searching for the primary key which is the email
    const user = await model.user.findByPk(email);

    // if the account already exists. Send message back
    if(user) {
        return res.status(422).send({ auth: false, message: 'User may already exist' });
    }
    
    //if the account does not exist call our hashing function
    const password_hash = await generatePassword(plainTextPassword);

    //create new user
    const newUser = await new model.user({
        id: email,
        password: password_hash
    });

    // save new user to the database
    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (e) {
        throw e;
    }

    res.status(201).send({savedUser});
});

```
#### Test cURL command
`curl -X POST http://localhost:8000 -d "{\"email\":\"bob@gmail.com\", \"password\":\"1111\"}" -H "Content-Type: application/json"`

### Create login endpoint
This endpoint `/login` will return a success message if the registered user successfully logins into the system

```
router.post('/login', async (req, res) => {
    // get the email and password
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
    // return success message
    res.status(200).send({ auth: true,  message: 'You have succesfully logged in'});
});

```

### Run the application
To run the application. Open a terminal in the projects root directory
1. `npm install`
2. `node server`

#### Test cURL command
`curl -X POST http://localhost:8000/login -d "{\"email\":\"bob@gmail.com\", \"password\":\"1111\"}" -H "Content-Type: application/json"`