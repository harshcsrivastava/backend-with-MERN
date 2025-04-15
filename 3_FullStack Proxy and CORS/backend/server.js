// const express = require('express')
import express from "express";
// run krne pe error ayega kyoki ye code unsynchronus me ata hai
//package.json me dalna hai type : module naki common js




const app = express();

//ye hota hhai middleware
app.use(express.static('dist'))


//ye nhi likhte hai agar static dis kiya
//server ki cost bach gyi, but frontend ke changes propogate nhi honge
//iske liye vapas se build karke naya DISTRIBUTION folder dalna padega
//is liye "BAD-PRACTICE"
//Hamesha frontend backend ko segregate krke rkho
// app.get("/", (req, res) => {
//   res.send("Ready");
// });

///api pe serve kr rhe// Standarization kar diya
app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      joke: "Why don’t skeletons fight each other? Because they don’t have the guts.",
    },
    {
      id: 2,
      joke: "Why did the scarecrow win an award? Because he was outstanding in his field.",
    },
    {
      id: 3,
      joke: "Why can’t you give Elsa a balloon? Because she’ll let it go!",
    },
    {
      id: 4,
      joke: "What did the left eye say to the right eye? Between you and me, something smells.",
    },
    {
      id: 5,
      joke: "Why did the math book look so sad? It had too many problems.",
    },
  ];

  //json response jata
  // json formator me jake TREE form me dekh lo
  // abb hogya backend ka kam hogya abb mude ki baat hai frontend kaise banayenge
  

  res.send(jokes );
});

const port = process.env.PORT || 3000;
//agar local host me env nhi hai to 3000 le leta but production me env file se hi lega

app.listen(port, () => {
  console.log(`Server Live at: http://localhost:${port}/`);
});


/* 
*

*/