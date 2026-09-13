import dotenv from 'dotenv';
import app from './app';

dotenv.config();


const port = Number(process.env.PORT) || 4000;

const server = app.listen(port, "0.0.0.0", () => {
    console.log(`server is running on port ${port}`);
});

server.on('error',(err:NodeJS.ErrnoException)=>{
    if(err.code === 'EADDRINUSE'){
        console.error(`${port } port is already in use , please pick another port`);
    }else{
        console.error(`Error :${err.code} -  ${err.message}`)
    }

    process.exit(1);
})

