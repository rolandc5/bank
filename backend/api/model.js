const mongoose = require('mongoose'), Schema = mongoose.Schema;

const UserSchema = new Schema ({
  accountNum: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
  },
  transactions: [
    {
      date: { type: String },
      merchant: { type: String },
      amount: { type: String },
    }
  ],
  token: String
});

UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.token;
    return user;
}

module.exports = mongoose.model('User', UserSchema);
