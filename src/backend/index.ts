import express from 'express';
import cors from 'cors';
import { authUtils } from './utils/authUtils';
import { signUpUser, singInUser } from './controllers/AuthController';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;



//Request to get details of all users
app.post('/api/users', authUtils, (req, res) => { })
//Request to get details about a specific user;
app.post('api/user/:id', authUtils, (req, res) => { })

//Request to update score of user
app.post('/api/update_score/:id', authUtils, (req, res) => {

})

//Request to SignIn user
app.post('/api/login', (req, res) => { singInUser })

//Request to Sign up user

app.post('/api/signup', (req, res) => { signUpUser })

app.listen(PORT, () => {
    console.log(`Server is ready at ${PORT}`)
})