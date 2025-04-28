/*
nodemon : server ko auto restart karti hai aur ek devdependicies hai
devdependency jo development ke daunran use hoti production me use nhi hota


env me mongoose ke end slash hoga na
dotenv me import vla use nhi krskte direct ti uske liye package me ye likha
"scripts": {
    "dev": "nodemon -r dotenv/config  --experimental-json-modules src/index.js"
  },

  
database hamesha try catch aur async and await use kro



---------------------------------=
n Express.js (and in web development overall), middleware refers to functions that intercept and 
process requests and responses as they pass through your application. They are like "middle layers" that 
handle tasks before the request reaches the route handler or before the response is sent back to the client.


These are built-in middleware functions in Express.js, each serving a specific purpose:
- express.json(): This middleware parses incoming requests with JSON payloads. It's particularly useful
for POST and PUT request where the data is in JSON format.

express.urlencoded(): This middleware parses incoming requests with URL-encoded payloads. It's commonly used
for handling form submissions. You can configure it to handle nested objects by setting the extended option

express.static(): This middleware serves static files, such as images, CSS, and JavaScript, from a specified directory


These middleware functions streamline the process of handling different types of data and serving resources
in your Express application. Let me know if you'd like examples or further details!
---------------------------------=



express me app.get("/", (err,req, res, next) => ())
baar database me hm call karenge ise acha method bana lete joki hota hai asyncHandler


Higher order function :  jo dusre function ki as a parameter lelete

Jab error aur response code standardize kiya to uska ek tarika haim,k



------------------------------- model

import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
    
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)

mongoDB me ye USERS nam se save hoga



index: true,
        soch samajh ke index rakhna database pe toll padta

         watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
        watch history ka array lenge jisme har video ka ek object hoga
    ],
    password: {
        type:String,
        password ko kaise String rakha encrpt rakhenge
        iske lie kuch krenge
        required: [true, "Password is required"],
    },


    Watch HIstory project ko complex banata isiliye ek package use krenge jo allow krega Aggregation
   Queries allow karta
    npm i mongoose-aggregate-paginate-v2
    PLUGIN KI TRAH INJECT KRTA

    mongoose allow krta plugin add krne ka

    An aggregation pipeline is a powerful framework in MongoDB used for data processing and analysis. It consists of a series of stages, where each stage 
    performs a specific operation on the input documents. These operations can include filtering, grouping, sorting, and calculating values. The 
    output of one stage becomes the input for the next, allowing for complex transformations and computations on data.
------------------------------- model


bcrypt core library | bcryptjs
dono ka kam same hai, it helps you to HASH your password

for token we have : JSONWEBTOKEN(JWT)
ye cryptographic algo use krta
1 Header
2 payload data yaha inject hota
3 Verify Signature
ek secret hota jo unique banata

Direct encryption karna possible nhi so we use Hook: PRE
Pre-hooks are commonly used in conjunction with Mongoose, a popular ODM (Object Data Modeling) library
for MongoDB. These hooks allow you to execute specific functions before certain events occur, such as saving,
 updating, or deleting documents.

userSchema.pre("save", callback) 
alag alag hota yaha, jab bhi data save se pahle krenge pre ka kam
callback function me arrow function use nhi karna hai kyoki problem hai, aur ka reference nhi hota JS me


userSchema.pre("save",async function(next) {
    kaam hone ke baad ki flag ab age pass krdo
    kisko karna, kitne round lagau: 8-10
    
    if(!this.isModified("password")) return next()
        modified nhi hua to skip kr do
    this.password = bcrypt.hash(this.password, 10)
    next()
})
problem ye hai ki avatar change kiya aur save kiya to vapas ye hook encrypt krega
to ise password jab change ho tbhi krna


we can create methods like middleware
userSchema.method.isPasswordCorrect = async function(password){
    bcryot khud compare krta ek string aur encripted pass leke
    return await bcrypt.compare(password, this.password) //time lega
}


What is JWT? It is a bearer token. Ek tarike se jispe token hai uspe access hai

refresh token ki expiry, access token se jyada hota, access token DB me save nhi hoga, refresh token hoga


==========FILE UPLOAD 
File handling third party server se krte hai hamesha
 
We will use "CLOUDNARY" which is used by badi badi company

Express-fileupload OR MULTER(Read from github)
multer ke through upload krenge cloudnary me
temp file user se leke apne server pe rakhenge, fir cloudnary me dalenge

Direct bhi kr skte lekin industry me nhi hai

import fs from "fs"  : Node me default hota hai, for file management
Head to Cloudinary.js



=============================Multer ka use krke MIDDLEWARE banayenge
Jaha docs upload ki zrurat padegi vha multer use 
Jana docs padh lena

See multer.middleware.js

=============================== VIDEO 11

HTTP : data in clear-text
HTTPS: Data encrypt hoke jata, inbetween readable na ho, ends me hi ho

HYPER TEXT TRANSFER PROTOCAL

URL/URI/URN  (Uniform Resource Locator) same hai

What are HTTP headers? when we send http we send metadata

metadata: keyvalue sent along with req and Response
req and response dono me headers hote

Use in Caching, authentication, manage state

2012 me X-Deprecated naam se hota tha header me(Deprecated)

    Request Headers -> from Client
    Response Headers -> from Server
    Representation Headers -> Encoding/Compression 
        (Data kis encoding me hai ya kis compression me hai)
        (Agar graph chart use kre to usme Compression krte)
    Payload Headers -> Data (_id, email kuch bhi bhejna ho)

    Aur bhi headers hote hai, jo padha rha uspe depend krta


Most Common Header
    Accept: Application/json
    User - Agent
    Authorization (Sabse common Bearer: _____ JWT token)
    Content - Type
    Cookie
    Cache - Control(Data kab expire ho)

CORS
    Access-Control-Allow-Origin
    Access-Control-Allow-Credentials
    Access-COntrol-Allow-Method

Security
    Cross-Origin-Embedders-Policy
    Cross-Origin-Opener-Policy
    Content-Security-Policy
    X-XSS-Protection

HTTP Methods
    Kya kya operation perform kr rha(Req kr rha, pura data update mt kro ya kuch aur)
    Basic set of operations that can be used to interact with server    

    MOST COMMON : GET POST PUT DELETE
    automatic kuch nhi hota sab banate

    GET : Retrieve a resource
    POST : interact with resource(mostly add)
    HEAD : (Rare) No message body(Response Headers only)
    OPTIONS : what operations are available
    TRACE : loopback test (get same data) (kabhi kabhi data proxy pe hota, hopping ho rhi usme hota)
    DELETE : remove a resource
    PUT : replace a resource
    PATCH : change  part of a resource

Sabse acha tool POSTMAN

HTTP STATUS CODE
    1xx = Informational (101,111)
    2xx = Success
    3xx = Redirection (remove hogya ya hataya)
    4xx = Client Error 
        (Client ne token nhi bheja, client se info shi nhi ayi, ya pass galat hai)
    5xx = Server Error 
        (Network me traffic zyada client ne sb shi bheja hai)

    Common:
        100 Continue
        102 Processing
        200 ok
        201 created
        202 accepted
        307 temporary redirect
        308 perm redirect
        400 Bad request
        401 Unauthorized
        402 Payment Required
        404 Not Found
        409 user error
        500 Internal Server Error
        504 Gateway Timeout

=============================== VIDEO 12

Hamne ek helper file likhi hai jise async handler kahte hai
It is a higher order function

See user.controller

Method run kab ho, jab ek url hit hhhoga tb run ho,
To jitne url hai vo routes me rakhenge


Routes ka import cookieParser ke niche hi krte jo bhi

Pahle hm app.get karke direct kr rhe the abb hamne seperate kr diya hai using routes to ABB middleware ka istemaal krenge

    app.use("/users", userRouter);
    abb koi bhi likhega "users" to vo control userRouter ko dedega'

    vha control pahuch jata hai abb kya kre
    https://localhost:8000/api/v1/users/register method pe jayenge
    to jaise hi control ayega vaha hum further route kr skte aise


    AsyncHandler me error thaa => return karna tha

    POSTMAN install kro 
    kis type ka req bhej rhe dekho


    =========VIDEO 13


    -> app se redirect kiya user.routes par
    -> vha se further router.route("/register").post(controller)
    -> res.status(200).json({
        message: "ok"
    })

    Register User:

    1. Get the data from req.body and check if all fields are present (ex: username, email, password)
    2. Check in the db, if a user with provided email is already present or not.
    3. If present, then return. If not, then proceed further.
    4. Create a new user in the db with provided details from req.body.
    5. Send a success message to client.


.some 
  A function that accepts up to three arguments. The some method calls the predicate function for each
   element in the array until the predicate returns a value which is coercible to the Boolean 
  value true, or until the end of the array.
  if(
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ){
    throw new ApiError(400, "Cannot be left empty.")
  }

  .some() is an array method that checks if at least one element in the array meets a given condition.

  go to user.controller












*/
