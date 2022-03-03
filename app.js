const path = require("path");
const express = require("express");
const mysql = require("mysql2");

const calcRoute = require("./routes/calc");
const problemRoute = require("./routes/problems");
const userRoute = require("./routes/users");
const DBRoute = require("./routes/db");
const { get } = require("express/lib/response");
const { resourceUsage } = require("process");

const app = express();
const port = process.argv[2];
// const port = 3000;

let newid;

let connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "Avikal",
  database: "sample",
  insecureAuth: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// mountpath
app.use("/calc", calcRoute);
app.use("/problem", problemRoute);
app.use("/user", userRoute);
app.use("/db", DBRoute);

app.get("/db-get", async (req, res) => {
  connection.query("SELECT * FROM user", (err, data, fields) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get('/user-listing', async (req, res) => {
  connection.query(`select * from user join user_detail where user.id = user_detail.user_id`, (err, data, fields) => {
    if(err) throw err;
    res.send(data);
  })
})

app.get('/:id/all-details', async (req, res) => {
  let id = req.params.id;
  let userData, userDetailsData;
  connection.query(`SELECT * FROM user WHERE id = ${id}`, (err, data, fields) => {
    if(err) throw err;
    userData = data[0];
    // console.log(userData);
    connection.query(`SELECT * FROM user_detail WHERE user_id = ${id}`, (err, data, fields) => {
      if(err) throw err;
      userDetailsData = data[0];
      // console.log(userDetailsData);
      res.send(`username: ${userData.username}\n password: ${userData.password}\n firstName: ${userDetailsData.firstName} \n lastName: ${userDetailsData.lastName} \n phonenum: ${userDetailsData.phoneNum} `)
    })
  })
})

app.post("/sign-up", async (req, res) => {
  let { username, password, firstName, lastName, phoneNum } = req.body;
  connection.query(
    `INSERT INTO user (username, password) VALUES('${username}', '${password}')`,
    (err, data, fields) => {
      if (err) throw err;
      connection.query(
        `select id from user order by id desc limit 0,1`,
        (err, data, fields) => {
          if (err) throw err;
          newid = data[0].id;
          connection.query(
            `INSERT INTO user_detail (firstName, lastName, phoneNum, user_id) VALUES('${firstName}', '${lastName}', ${phoneNum}, ${newid})`,
            (err, data, fields) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      );
      res.send("sign-up sucessful....");
    }
  );
});

app.post('/log-in', async (req, res) => {
  let {username, password} = req.body;
  connection.query(`SELECT id, username, password
  FROM user WHERE username = '${username}' && password = '${password}'`, (err, data, field) => {
    if(err) throw err;
    let id = data[0].id;
    connection.query(`SELECT firstName, lastName, phoneNum
    FROM user_detail WHERE user_id = ${id}`, (err, data, field) => {
      if(id) {
        res.send(data)
      } else {
        res.send('di')
      }
    })
  });
})

app.delete('/:id/delete-user', async (req, res) => {
  let id = req.params.id;
  connection.query(`DELETE FROM user_detail
    WHERE user_id= ${id}`, (err, data, field) => {
      if(err) throw err;
      connection.query(`DELETE FROM user WHERE id= ${id}`, (err, data, fields) => {
        if(err) throw err;
        res.send(`data deleted for id: ${id}`);
      })
    })
})

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

app.get("/*", (req, res) => {
  res.send("404");
});

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});

/* 
  TODO:

                                            STATUS
  1. four basic calc operations             Done
  2. four advance calc operations           Done
  3. fibonacci                              Done
  4. water-level                            Done
  5. missing number                         Done
  6. sort string                            Done
  7. Power                                  ---Pending
  8. Sessions                               Done
  9. Cookies                                ---Pending
  11. Implement fs                          Done
  10. Strore user data in a file            Done
  11. CRUD operations using mysql           ---Pending
  12. install mariadb                       ---Pending
  13. install sequelize dependency          ---Pending
  14. User and user dec tables              ---Pending
  15. Triggers
  16. Hooks
  17. post||signup                         Done
  18. post||log-in                         Done
  19. get||user-listing                    Done
  20. get||all-details                     Done
  21. delete||delete-user
  22. put||update-user
*/
