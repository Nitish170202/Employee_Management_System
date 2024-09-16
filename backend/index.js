const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
const bodyParser = require('body-parser');
const CreateUser = require('./routes/CreateUser');
const EmployeeManagement = require('./routes/EmployeeManagement')
require('./DBconnect');


// app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());


// Or if you're using body-parser instead of express.json()
app.use(bodyParser.json({ limit: '10000kb' }));
app.use(bodyParser.urlencoded({extended: true, parameterLimit:100000, limit:"500mb" }));

app.use(CreateUser);
app.use('/item',EmployeeManagement);

app.listen(3001);