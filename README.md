# 🧐 Face Recognition App

### Note:
- This is the back-end repository of the Face Recognition App, to access the front-end code [click here](https://github.com/pedro742k2/face-recognition-frontend)

## ⚠️ Warning

Although the password you introduce when registering is fully secured with a hash and a salt, this app isn't meant to be focused on login safety.
Face Recognition App user login data will only be stored to simulate an authentication for the next time you open the Web App and store your profile credits, but anyone can increment them (the credits) with your login ID and an API platform like "Insomnia" or "Postman".

Nothing of these puts the data you introduce in danger, nor your personal info, but keep in mind that, if you analyze the front(back)end code, you'll likely see that anyone can increment credits on your account, which obviously, isn't a bad thing at all right? 😁 Remember, this is just a demo app to analyze the number of faces on a photo and mark them inside boxes.

## Screenshots

  - Login
<img width="1080" alt="login" src="https://user-images.githubusercontent.com/54741310/141699215-897649d2-a8a5-4a05-b340-4c2d8f42274b.png">

  - Register
<img width="1079" alt="register" src="https://user-images.githubusercontent.com/54741310/141699221-f9e82592-0797-4fb5-9f56-79c10bd10510.png">

  - Home
<img width="1080" alt="main" src="https://user-images.githubusercontent.com/54741310/141699233-6cc9eb74-eb30-4472-b914-cfae164e163e.png">

  - Face Detection (Example 1)
<img width="1080" alt="face_detection" src="https://user-images.githubusercontent.com/54741310/141699255-cf848a01-7a79-4af8-80b4-41f760e335ff.png">

  - Face Detection (Example 2)
<img width="1067" alt="face_detection_2" src="https://user-images.githubusercontent.com/54741310/141699257-c47cf5a8-9987-433f-bea2-0ea40cba0583.png">



## 🤖 What is the Face Detection App meaning?

Face Detection App is meant to detect and quantify the number of people faces in a photo.
Althought it's still in development, Face Detection App is here to expose my skills with API data manipulation and React, JS and CSS skills by outlining the image detected faces with a rectangle. 
The Face Detection App also has a pretty simple login/register system with profile credits, which are incremented in every successful API call.

## How to test it out

### 🌎 Face Recognition App is available online as a demo
  - 📡 Live web app: https://pedro742k2.github.io/face-recognition-frontend/
### 🏠 But if you want to test it locally and make changes to the code
  - Clone this repository to the desired directory
  - Inside the desired directory, run:
    - `npm install` to install all the project dependencies
    - `npm run local` to execute the development build on your local network
  - **Or**, to create a production build, run:
    - `npm install` 
    - `npm run build` to create a production build
    - `npm start` to serve the created build folder on your local network

### 🤝 Contributions and feedback

  - 🛠️ If you have any suggestions, want to report an issue or give general feedback, feel free to make a pull request or email me at pedro.manuel.peres.batista@gmail.com with the suggestion or detailed description of the problem 😀.
  - 🙌 I'll thank you for that!

## 💻 Technologies

### Frontend ([Repository](https://github.com/pedro742k2/face-recognition-frontend))
  - React
  - CSS
  - Tachyons
  - Animate.css

### Backend
  - Node.js
  - Express
  - Bcrypt
  - **Knex** and **PG** for the database connection
  - Database: **PostgreSQL**

### Services
  - Clarifai face detection API
