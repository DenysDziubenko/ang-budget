let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = require('./user');

let schema = new Schema({
  name: {type: String, required: true},
  dueDate: {type: String, required: true},
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, default: 'add some description' },
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', (monthlyItem) => {
  User.findById(monthlyItem.user, (err, user)=> {
    user.monthlyItems.pull(monthlyItem);
    user.save();
  });
});

module.exports = mongoose.model('MonthlyItem', schema);
