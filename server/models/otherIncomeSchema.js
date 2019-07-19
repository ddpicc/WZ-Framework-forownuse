const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const otherIncomeSchema = new Schema({
    name :String,
    comment: String,
    type : String,
    date: String,
    amount : Number,
    profit : Number,
    editable : Boolean,
  }, { collection: 'otherIncome'})

  module.exports = mongoose.model('otherIncome',otherIncomeSchema);