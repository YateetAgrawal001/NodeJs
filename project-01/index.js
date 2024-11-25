const express = require("express")
const fs = require('fs')
const users = require('./MOCK_DATA.json')
const app = express()

const PORT = 4000
//Middleware --> plugin
app.use(express.urlencoded({extended:false}));

app.use((req,res,next) => {
    //Do your any work here
    console.log("this is middleware 1");
    fs.appendFile('log.txt',`${Date.now}: ${req.method}: ${req.route}: ${req.ip}`, (err,data) => {
        next();
    })
})
//Rest API
app.get('/api/users',(req,res) => {
    //res.setHeader("x-myname","Yateet Agrawal"); //custom header
    //always add X to custom header
    return res.json(users)
})
app.get('/users',(req,res) => {
    const html = ` 
    <ul>
       ${users.map((user) =>  `<li>${user.first_name}</li>`).join("")} 
    </ul>`;
    return res.send(html)

})


app.post('/api/users', (req,res) => {
    //TOOD : create a new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title){
        return res.status(400).json({msg: "User not found"})
    }
    //console.log(body)
    users.push({id: users.length+1,...body });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status: "pending"})
    })
    
})
// method 1 to do this
app.get('/api/users/:id',(req,res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    if(!user){ return res.status(404).send("user not found")}
    return res.json(user)
})

app.patch('/api/users/:id', (req,res) => {
    //TOOD : edit a user
    return res.json({status: "pending"})
})
app.delete('/api/users/:id', (req,res) => {
    //TOOD : delete a user
    return res.json({status: "pending"})
})


//Method 2 to do all that method request in one time

// app.route('/api/users/:id')
// .get((req,res) => {
//     const id = Number(req.param.id)
//     const user = users.find((user) => user.id === id)
//     return res.json(user)
// })
// .patch( (req,res) => {
//     //TOOD : edit a user
//     return res.json({status: "pending"})
// })
// .delete( (req,res) => {
//     //TOOD : delete a user
//     return res.json({status: "pending"})
// })


app.listen(PORT, ()=>{
    console.log(`App is listening on PORT: ${PORT}`)
})