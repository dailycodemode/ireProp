const functions = require('firebase-functions');
const cors = require('cors');
const app = require('express')();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

const {
    getAllTodos,
    getOneMyHome,
    getAllProps,
    postOneProperty,
    postOneMyHome
} = require('./APIs/todos')

app.get('/todos', cors(corsOptions), getAllTodos);
app.get('/properGet', cors(corsOptions), getOneMyHome);
app.post('/oneHome', cors(corsOptions), postOneMyHome);

app.get('/properties', cors(corsOptions), getAllProps);
app.post('/postOneProperty', cors(corsOptions), postOneProperty);
exports.api = functions.region('europe-west1').https.onRequest(app);
