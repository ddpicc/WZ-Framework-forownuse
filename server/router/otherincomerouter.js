//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const OtherIncome = require("../models/otherIncomeSchema");

// 添加一个其他收入信息
router.post("/addIncome", (req, res) => {
	//使用OtherIncome model上的create方法储存数据
	OtherIncome.create(req.body, (err, hero) => {
		if (err) {
			res.json(err);
		} else {
			res.json(hero);
		}
	});
});

// 查询所有其他收入信息路由
router.get("/getAllIncome", (req, res) => {
  OtherIncome.find({})
		.sort({'_id':-1})
    .then(heros => {
      res.json(heros);
    })
    .catch(err => {
      console.log('error getting other income');
      res.json(err);
    });
});