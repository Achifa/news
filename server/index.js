const { express,cookieParser,morgan,path,fs,parser,mocha,cors,shortId,jwt,io} = require('./modules');
const authorRouter = require('./routes/author');
const clientRouter = require('./routes/client');

require('dotenv').config();

const PORT = process.env.PORT;



const app = express();

app.use(cookieParser());
app.use(cors({
    origin: "*"
})); 

app.use(clientRouter)
app.use(authorRouter)

app.use(morgan("tiny"))

app.listen(PORT, () => { console.log(`listening to port ${PORT}`) })
