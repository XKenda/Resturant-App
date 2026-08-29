import app from "./src/app.js";
import { PORT } from "./src/config/env.js";

const port = PORT || 3000;

app.listen(port, ()=>{
    console.log(`App listened on Port ${port}`)
})