const path = require('path');
const express = require('express');
const Joi = require('joi');

const calcRoute = require('./routes/calc');
const problemRoute = require('./routes/problems');
const testRoute = require('./routes/test');

const app = express();

const port = 3000;



const validateInput = function(data) {
  const schema = Joi.object({
    a : Joi.number().required(),
    b : Joi.number().required(),
    arr : Joi.array().required(),
    term : Joi.number().required(),
    str : Joi.string().trim().required(),
    strArr : Joi.array().required()
  }).options({abortEarly : false});

  return schema.validate(data)
}

app.use(express.json());

// mountpath
app.use('/calc', calcRoute);
app.use('/problem', problemRoute);
app.use('/test', testRoute);

app.get('/', (req, res) => {
  res.send('welcome to home page');
})

app.post('/test-me', (req, res) => {
  if(validateInput(req.body).error) {
    console.log('Error');
  }
  else {
    console.log('validated data');
  }
  res.send('testing validation');
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
  6. sort string                            Partially done (understand the algo)
  7. Power                                  Pending
  8. Joi validation                         Partially done
*/