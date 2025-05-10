import connectDB from "./db/db.js";
import {app} from "./app.js"
import dotenv from "dotenv"

dotenv.config()

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    })
}).catch((err)=>{
    console.log("Mongo DB connection failed ",err);

})


