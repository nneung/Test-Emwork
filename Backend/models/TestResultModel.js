const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testResultSchema = new Schema({
  result_id: { type: String, default: '' },
  user_id: { type: String, default: '' },
  test_name: { type: String, default: '' },
  result: {type: Array, default: ''},
  status: {type: String, default: ''},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const testResult = mongoose.model("test_result", testResultSchema)
module.exports = testResult
