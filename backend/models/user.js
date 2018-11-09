let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  monthlyItems: [{type: Schema.Types.ObjectId, ref: 'MonthlyItem'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
