
### Provision an RDS database
In this lesson you will be creating and populating AWS RDS Postgres database using sequelize. Afterwards you will be writing a little code and a new endpoint to populate that data.

#### Create AWS RDS database
1. Login AWS account
2. Select RDS from the server list
3. Select create database
4. Select Postgres
5. Configure database
   Provide a name for the database
   Provide a user for the database
   Provide a password for the database
   Change the option so the database is public
   Note: Make sure you save this information. You will need it to connect to your database
6. Select create
   Note: After the database is created. Make sure you copy down the URL and port to connect to this database. You will need in the following section

#### Setup Sequelize
In the root directory of the project run the following commands.

1. Install Sequelize - run in command line `npm install --save sequelize`
2. Install Postgress for Sequelize - run in command line `npm install --save-dev sequelize-cli pg pg-hstore`
3. Init Sequelize - run in command line `npx sequelize-cli init`
   Note: This command will create a config folder in the root directory with a config.json file. You will need to update this file with the configuration information from your database.

4. Update config.json
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

5. Create database instance - run in command line `npx sequelize-cli db:create`
6. Create data model Feed- run in command line `npx sequelize-cli model:generate --name feed --attributes id:uuid,url:string,createdAt:date,updatedAt:date`
7. Migrate data model and create tables - run in command line `npx sequelize-cli db:migrate`

#### Create new endpoint
Create a new endpoint `api/uploads` that will allow you to save data into your AWS RDS instance.
1. Create a new endpoint in the file `uploads.js` in the routes directory
2. Create a random ID. I used Math function for this.
3. Store the image URL to a variable
4. If the image_URL is not there, throw a new error
5. Use the create function to store the data in the AWS database

```
router.post("/api/uploads",

 async (req, res) => {
  id = Math.floor(Math.random() * 100000000);
  var JSON_Obj = req.body;

  for(var key in JSON_Obj){
    var image_url = key;
  }

  if (!image_url || image_url == null) {
    return res.status(400).send("invalid request!");
  }
  
  await Promise.all([
    models.feed.create({
      id,
      url:image_url,
      Date,
      Date
    }),
  ]);

  res.sendStatus(201);
});

```
### Run the server
In the API directory run the following commands
1. `NPM install`
2. `node server`


#### Test cURL command
To test the server is working correctly wer can open up a new terminal and type in the following command

curl -d https://cdn.discordapp.com/avatars/472158887966015508/a64800726ff83aedd350092730484a1e.jpg -X POST http://localhost:8000/api/uploads
