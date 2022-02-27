const path = require('path');
const express = require('express');
const session = require('express-session')

const calcRoute = require('./routes/calc');
const problemRoute = require('./routes/problems');
const userRoute = require('./routes/users');
const { join } = require('path');

const app = express();

const port = process.argv[2];
// const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(session({
  secret: 'Your_Secret_Key',
  resave: true,
  saveUninitialized: true
}))

// mountpath
app.use('/calc', calcRoute);
app.use('/problem', problemRoute);
app.use('/user', userRoute);




app.get('/', (req, res) => {
  res.send('welcome to home page');
})

app.get('/set-session', (req, res) => {
  req.session.name = "Vikas Kumar Gupta";
  req.session.email = "vikas.gupta@appinventiv.com";
  req.session.mobileNumber = 9264928257;

  res.send('Session Setted');
})

app.get('/get-session', (req, res) => {
  let sessionData = req.session;
  res.send({sessionData})
})

app.get('/*', (req, res) => {
  res.send('404')
})

app.listen(port, (req, res)=> {
  console.log(`listening on port ${port}`);
})


/* 
  TODO:

                                            STATUS
  1. four basic calc operations             Done
  2. four advance calc operations           Done
  3. fibonacci                              Done
  4. water-level                            Done
  5. missing number                         Done
  6. sort string                            Done
  7. Power                                  Pending
  8. Sessions                               Done
  9. Cookies
  11. Implement fs
  10. Strore user data in a file

*/