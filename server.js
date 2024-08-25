import { configDotenv } from 'dotenv';
import  express  from 'express';
import requestRouter from './routers/RequestRouter.js';
import volenteerRouter from './routers/VolenteerRouter.js';

configDotenv()
const app = express();
const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

app.use(express.json());
app.use('/api/volenteers', volenteerRouter);
app.use('/api/helpRequests', requestRouter);
app.use('/', (req, res) => {
    res.send('welcome to our volenteer api');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})


