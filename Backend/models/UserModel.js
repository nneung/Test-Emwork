const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  user_id: { type: String, default: '' },
  first_name: {type: String, default: ''},
  last_name: {type: String, default: ''},
  license_status: {type: String, default: ''},
  created_at: { type: Date, default: Date.now },
  created_by: { type: String, default: '' },
  updated_at: { type: Date, default: Date.now },
});
const users = mongoose.model("users", userSchema)
module.exports = users
