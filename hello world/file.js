const fs = require("fs")

//Sync  ---> this can change file text automatically when changed here
// fs.writeFileSync("./test.txt","why are you here");  

//Asyc --->
fs.writeFile("./test.txt","this is async",()=> {}); 

// Reading a file 

//Sync
// const result = fs.readFileSync("./contact.txt","utf-8");
// console.log(result)

// Async

fs.readFile("./contact.txt","utf-8",(err,result)=>{
    if(err){
        console.log(`Error`,err);
    }else{
        console.log(result);
    }
})

//some more fs functions in notes look at them once