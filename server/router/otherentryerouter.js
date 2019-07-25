//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const OtherEntry = require("../models/otherEntrySchema");

// 添加一个其他收入信息
router.post("/addIncome", (req, res) => {
	//OtherEntry model上的create方法储存数据
	OtherEntry.create(req.body, (err, hero) => {
		if (err) {
			res.json(err);
		} else {
			res.json(hero);
		}
	});
});

//更新订单状态
router.put("/updateEntryStatus/:id", (req, res) => {
  console.log("Update status");
  OtherEntry.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        editable: false,
      }
    },
    {
      new: true
    }
  )
    .then(hero => console.log(hero))
    .catch(err => res.json(err));
});

//删除一条其他收入信息
router.delete("/deletIncome/:id", (req, res) => {
  OtherEntry.findOneAndRemove({
    _id: req.params.id
  })
    .then(hero => res.send(`${hero.title}删除成功`))
    .catch(err => res.json(err));
})

// 查询所有其他收入信息路由
router.get("/getAllEntry", (req, res) => {
  OtherEntry.find({})
		.sort({'_id':-1})
    .then(heros => {
      res.json(heros);
    })
    .catch(err => {
      console.log('error getting other income');
      res.json(err);
    });
});

module.exports = router;