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

app.get('/api/users',(req,res) => {
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
    //console.log(body)
    users.push({id: users.length+1,...body });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err,data)=>{
        return res.json({status: "pending"})
    })
    
})
// method 1 to do this
app.get('/api/users/:id',(req,res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
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