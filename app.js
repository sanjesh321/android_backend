
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const{strict} = require('assert');
const path = require('path')
const publicDir = path.join(__dirname,'images')
const db = require('./database/db')
const register_route = require('./Routes/register_route');
const productRoute = require("./Routes/productRoute");
const cartRoute = require('./Routes/cartRoute')
const app = express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(express.static(publicDir))
app.use(cors());
app.use(register_route)
app.use(productRoute)
app.use(cartRoute)
app.listen(90)