import express from 'express';

const app = express();
import bodyParser from 'body-parser';
import usersRoutes from  './routes/users.js'
import path from 'path';
import log from './logger/logger.js';
const PORT = 5000;

let staticPath = path.join(path.resolve(),'public');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/api/users" , usersRoutes);



//GET '/'
app.get('/', (req, res) => {
 // console.info("GET request to endpoint '/' received")

  res.sendFile(path.join(staticPath, 'index.html'))

})

 app.get('/api/', (req, res) => {
    log.info("GET request to endpoint '/' received.");
    //res.send("Node Express API Server");
    res.send("Node Express API Server App");
})
app.use('/users', usersRoutes)

app.listen(PORT, () => log.server(`Server is running on http://localhost:${PORT}`))
//https://docs.google.com
// /document/d/1pXnIGYVK_eeHGJmKYdl7i_01fuSKTw6Lkq6o7ur9p-U/edit?usp=sharing