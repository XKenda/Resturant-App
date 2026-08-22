import app from "./src/app";
import { PORT } from "./src/config/env";

const port = PORT || 3000;

app.listen(port, ()=>{
    console.log(`App listened on Port ${port}`)
})