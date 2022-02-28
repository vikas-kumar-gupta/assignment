const path = require("path");
const fs = require("fs");
const { use } = require("express/lib/router");

let userJSONFile = path.resolve(__dirname, "../userData.json");
let userData_Buffer = fs.readFileSync(userJSONFile);
let userData_JSON = JSON.parse(userData_Buffer);

// get the single user data with user
let getUserData = (req, res) => {
  const userId = req.params.id;
  const user = userData_JSON.users.filter((data) => {
    if (data.id == userId) {
      return data;
    }
  });
  if (user.length !== 0) {
    res.send({ user });
  } else {
    res.send(`There is nothing data on ${userId} ID`);
  }
};

// get all user data
let getAllUserData = async (req, res) => {
  res.send(userData_JSON);
};

// post a single user data to the existing data with new user id
let postUserData = (req, res) => {
  data = req.body;
  userData_JSON.users.push(data);
  fs.writeFile(userJSONFile, JSON.stringify(userData_JSON), (err) => {
    if (err) {
      console.log("got an error while posting an data");
    } else {
      res.send("data updated successfully");
    }
  });
};

// delete an existing user through user id
let deleteUserData = (req, res) => {
  const userId = req.params.id;
  const index = userData_JSON.users.findIndex((data) => data.id == userId);
  if (index != -1) {
    userData_JSON.users.splice(index, 1);
    fs.writeFile(userJSONFile, JSON.stringify(userData_JSON), (err) => {
      if (err) {
        console.log("Something error occurred");
      } else {
        res.send("data deleted successfully");
      }
    });
  } else {
    res.send(`There is nothing data on ${userId} ID`);
  }
};

// update all tthe data of user using user id
let updateAllUserData = (req, res) => {
  const userId = req.params.id;
  const index = userData_JSON.users.findIndex((data) => data.id == userId);
  if (index !== -1) {
    const { id, name, email, contact, age, address } = req.body;
    userData_JSON.users[index].name = name;
    userData_JSON.users[index].email = email;
    userData_JSON.users[index].id = id;
    userData_JSON.users[index].contact = contact;
    userData_JSON.users[index].age = age;
    userData_JSON.users[index].address = address;
    fs.writeFile(userJSONFile, JSON.stringify(userData_JSON), (err) => {
      if (err) {
        console.log("Something error occurred");
      } else {
        res.send("data updates successfully");
      }
    });
  } else {
    res.send(`There is nothing data on ${userId} ID`);
  }
};

// update few data of the user using user id
let updateFewUserData = (req, res) => {
  const userId = req.params.id;
  const index = userData_JSON.users.findIndex((data) => data.id == userId);
  if (index !== -1) {
    userData_JSON.users[index] = req.body;
    console.log(req.body);
    fs.writeFile(userJSONFile, JSON.stringify(userData_JSON), (err) => {
      if (err) {
        console.log("Something error occurred");
      } else {
        res.send("data updates successfully");
      }
    });
  } else {
    res.send(`There is nothing data on ${userId} ID`);
  }
};

module.exports.userController = {
  getUserData,
  getAllUserData,
  postUserData,
  deleteUserData,
  updateAllUserData,
  updateFewUserData,
};
