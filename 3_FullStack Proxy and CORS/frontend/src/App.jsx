import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
//come from backend


function App() {
  const [jokes, setJokes] = useState([]) // how to fetch jokes? 
  // but we will install package AXIOS fail hua to kaise karenge, mainly req ke liye axios deta by default

//mai chahta hu jaise hi appl load ho data ajaye isiliye useEffect
// axios ise json me parse kr deta

  useEffect(() => {
    //http://localhost:3000 ko cut kar diya kyoki ise standarization kr diya
    // local host vla url likhna sense nhi banata
    //abhi local host pe serve kr rhe, manlo baad me khi aur kre
    // but ye url exist nhi karta to 
    /// to ata hai PROXYS ka concept: search PROXY create react app
    // agar create react app se banata to package.json me jake proxy:"http://localhost:3000" dalna padta

    axios.get('/api/jokes/')
    .then((response) => {
      setJokes(response.data)
    })
    .catch((error) => {
      console.log(error);
      
    })

    // abb maine VITE use kiya hai, to proxy vite me alag se serve kr skte
    //VITE ke config.js me jao
  })
  //[jokes] : dependency array dalne ki zarurat nhi hai yaha as a parameter
  return (
    <>
     <h1>Holllaa</h1>
     <p>Jokes: {jokes.length}</p>

     {
      // loop kr rhe to index zroor karna
      jokes.map((joke, index) => (
        <div key={joke.id}>
          <h3>{joke.joke}</h3>
        </div>
      ))

      //jokes ke map me callback me agar curly use kr rhe to return krna padega
      //isiliye curve brackets
      //cors ke error nhi aya kyoki proxy lagaya
      //dusre ko ghar ke andar nhi jane diya
     }

     
    </>
  )
}

export default App


/*
http://localhost:3000/joke/' from origin 'http://localhost:5173' has been blocked by CORS policy:
 No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
App.jsx:20 



ghar me jab koi ata hai to aise hi allow kar dete hai direct
jiska origin hai ghar me usko allow krte lekin bakiyo ko karne ke liye
ghar me phone milate, ise kehte hai CORS = cross origin

Mann lijiye server chal rha kisiaur port pe, aur ye kisi aur pe, to koi bhi ake data le ja skte
url/port alag hai to vo cross origin hota hai
"ORIGIN ALAG-ALAG HAI"

solution hai backend developer hai ki : mere URL ko whitelist krdo
cors ka package install kr do aur lr skte
abb jaroori nhi hai whitelist krne ke baad jo URL hai vo same PORT me serve ho rhi isiliye
kuch tarike se handle kr skte

Proxy laga diya 

DIGITAL OCEAN ME HOST KRTE LECT 2

//HEAD TO BACKEND

npm run build

vite ek dist (distribution) folder deta hai jana isko hai
to finally utha ke khi aur dalenge to proxy ka dikat ata hai
log is folder ko utha ke backend me dalte, sb sourcecode udhar dal diya
to server.js me ek middleware daal skte

vaha static asset erve kr skte(middleware)
app.use()
GO TO SERVER>JS
*/