/*
2 major components: 
    A programming language             
        - Java
        - JS
        - PHP
        - golang
        - C++

        on a framework


    A Database (Data process kroge, verify anaylise karoge aur database me bhejdoge)
               (ya koi query pucha fir se anaylise karoge, database pe jaoge aur lekar aoge)

        - Mongo
        - MySQL
        - Postgres
        - Sqlite

        ORM, ODM


server is a software where we can access from anywhere.
those are data centers where hardware is there

Frontend ne req Kiya , backend ne bheja api ke form me


How to write this server?
Using JS but it is not capable 
As it is designed to work on the browser first as it cannot interact with file

Therefore nodejs is used, writing files synchronously, asynchronously.

Node js = Js+ Libuv + many other (have access to all)

Node js has npm which is not a node package manager 
We will use express, routing 

Npm grabs the package that you want and allows you to use

A JS Based Backend
-Data       f-File       -ThirdParty(API)


A JS runtime: nodejs/Deno/Bun (Node.js is not necessary for backend)
package.json  .env      (Readme, git, lint, prettier)

- src
    index(DB connects)      APP(config cookie, urlencode)   constants(enums, DB-name)

    DB(actual code jo DB se connect hota)
    MOdels(structure bana padega lib me, sample bana lia)
    COntrollers(methods, functions ka fancy naam)
    Routes(/login, /signup)
    Middlewares(baad me)
    Utils(mail bhejna, upload krna, jo baar use krenge)
    More



Express = package jo listen karta hai request ka

abhi basic computer/mobile ye GET req karta hai server ko, server bnana hai
aur listen khi bhi kar skte 
/: home route
/login : login setup


Empty node ki application baanana hai
we use:
    npm init -y

    batane ke liye: npm i

*/

console.log("hoho");
/*
In js we use `node main.js` to execute 

here we create script command under "" in package.json
    "scripts": {
    "start": "node main.js"
  },

  and we use npm run start

  Install express npm install express

  5 6 7 8 1 2 3 4
*/

require('dotenv').config()

const express = require('express')
// import express from "express" // modern or depend on use 
const app = express() // creating express object


const port = 4000

app.get('/', (req, res) => { /// home route pe listen kro {ek req, ek response}
  res.send('Hellodw f World!') // hello world bheja
})

// lagana mat bhulna

app.get('/twitter', (req, res) => {
  /** 
  *  Defines a route that handles GET HTTP requests
  * Used to specify what happens when a client sends a GET request 
    to a particular endpoint.
  */
   res.send('x.com')
})
app.listen(process.env.PORT , () => { //listen krna req
/**
 * Purpose: Starts the server and listens for incoming requests on a specified port and host
 * Typically used at the end of your Express application to make it accessible over the network.
 */
  console.log(`Example app listening on port ${process.env.PORT}`)
})

/**
 * hotreloading hota automatically backend ko restart hona joki automatically nhi hota 
 * isiliye close krke vapas start
 * iske liye package yse krte
 * 
 * 
 * dotenv => ek package hota jo private matter ko protect karte 
 */