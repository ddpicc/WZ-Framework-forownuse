const express = require('express');
const med = require('./router/medrouter')
const ord = require('./router/orderrouter')
const mongoose = require("mongoose");
const Med = require("./models/medSchema");
const overallStatus = require("./models/overallStatus");

const bodyParser = require("body-parser")
var schedule = require("node-schedule");



//这一句是连接上数据库
//var url = 'mongodb://qcui:8890@localhost:27017/myDbs?authSource=admin';
//var db = mongoose.connect(url, {useNewUrlParser: true});

var url = 'mongodb://localhost:27017/myDbs';
var db = mongoose.connect(url, {useNewUrlParser: true});

//这里的myDbs是数据库的名字，不是表的名字



const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/medapi',med);
app.use('/ordapi',ord);

//定时任务  todo
var rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.second = 0;
schedule.scheduleJob(rule, function(){
	Med.find({"count":{$lte: 1},
	"checked": true,
	"medtype": "草药"})
	.then(heros => {
		console.log(heros)
    })
	overallStatus.findOne({name: "GlobalStatus"}, function(err, doc){
	let msgArray = doc.warning;
	msgArray.unshift("fuck");
	doc.warning = msgArray;
	doc.save();
	});
	
});


app.all("*",(req,res,next) => {
    res.header("Access-Control-Allow-Credentials", "ture");
    res.header("Access-Control-Allow-Origin", req.header.origin);
    res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,Option");
    res.header("Access-Control-Allow-Headers", "Content-Type,username");
    next();
});

app.listen(3000,() => {
    console.log('app listening on port 3000.')
})


