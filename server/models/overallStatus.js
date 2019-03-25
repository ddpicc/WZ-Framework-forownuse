const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const sysSchema = new Schema({
  yearlyIncome : Array,
  yearlyOutcome: Array,
  monthlyIncome: Array,
  monthlyProfit : Array,
}, { collection: 'mySys'})    //这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


module.exports = mongoose.model('sys',sysSchema);