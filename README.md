# 🧐 Face Recognition App

### Note:

- This is the Backend repository of the Face Recognition App, to access the Frotnend code [click here](https://github.com/pedro742k2/face-recognition-frontend)

## Screenshots

  - Signin
<img width="1080" alt="signin" src="https://user-images.githubusercontent.com/54741310/160286963-cf8327ee-13e2-4f50-9985-4c6155c1c222.png">

  - Register
<img width="1080" alt="register" src="https://user-images.githubusercontent.com/54741310/160287019-9254628f-5a10-4896-9400-135f0edbd436.png">

  - Home
<img width="1080" alt="home" src="https://user-images.githubusercontent.com/54741310/160287031-ef1f39f6-ff53-4b70-bcb3-6b663de8cc7c.png">

  - Face Recognition
<img width="1080" alt="face_detection" src="https://user-images.githubusercontent.com/54741310/160287062-7faa4727-b49c-4d5d-b3a7-7b6d687fd9aa.png">

  - Profile Modal (Edit user info)
<img width="1080" alt="profile-modal" src="https://user-images.githubusercontent.com/54741310/160287083-006a0038-a689-446a-bb67-99b160951de7.png">

## 🤖 What is the Face Detection App meaning?

Face Detection App is meant to detect and quantify the number of people's faces in a photo.
Although it's still in development, the Face Detection App is here to show off my skills with API data manipulation and React.js, JS and CSS skills by outlining the image detected faces inside boxes.

The Face Detection App also has a login/register system with profile credits, which are incremented in every successful API call.

## How to visit the project

### 🌎 Face Recognition API is available online as a demo

- 📡 Live web app: https://pedro742k2.github.io/face-recognition-frontend
- 📡 Live API server: https://face-recognition-server-pedro.herokuapp.com/api

### 🏠 But if you want to test it locally and make changes to the code (with **Docker**)

- Clone this repository to the desired directory
- Inside the project root directory:
  - Create an *environment variables* file called `.env` and, inside of it, add `CLARIFAI_API_KEY` with your Clarifai API key, `JWT_SECRET` with something random that comes to your mind and `POSTGRES_PASSWORD` with the PostgreSQL database password that you desire. In the end, it should look like this:
  - Folder and `.env` file structure:

    <img width="125" alt="file  env folder" src="https://user-images.githubusercontent.com/54741310/160290632-84e2bef1-ca3f-4e10-81c0-6f69e902083f.png">
  
    ![file  env](https://user-images.githubusercontent.com/54741310/160290637-e06fa828-4716-4e51-b2b8-9104472ff5d9.png)
    
  - On the `routes.js` file (located at: `src/routes.js`) comment the ssl object as indicated (line `36`) to run the local psql database successfully. 

    <img width="524" alt="psql" src="https://user-images.githubusercontent.com/54741310/160292702-bb59d459-b7df-4bb2-b10a-f3353eaa8767.png">
    
  - After setting up the environment, just run `docker-compose up --build` and the server + databases will be running automatically, with already two mock users created (`./database/mocks/seed.sql`).

### 🤝 Contributions and feedback

- 🛠️ If you have any suggestions, want to report an issue or give general feedback, feel free to make a pull request or send me an email with the suggestion or detailed description of the problem 😀.

## 💻 Technologies

### Frontend ([Repository](https://github.com/pedro742k2/face-recognition-frontend))
  - React.js;
  - Tachyons;
  - Animate.css;
  - Lottie web animations.

### Backend
  - Node.js;
  - Express;
  - Bcrypt;
  - Databases: **PostgreSQL**, **Redis**;
  - **Knex** and **PG** for the database connection;
  - Docker;
  - JWT.

### Services
  - Clarifai face detection API
