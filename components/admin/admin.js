const { Schema, model } = require('mongoose');
const leanVirtuals = require('mongoose-lean-virtuals');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Bahia').locale('pt-br');

const schema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  address: {
    city: { type: String },
    state: { type: String }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  photo: { type: String, required: true },
  logo: { type: String },
  profession: { type: String, required: true },
  nickname: { type: String },
  biodata: { type: String, required: true },
  skills: {},
  social: { type: Map, of: String }
}, { typePojoToMixed: false });

schema.virtual('fullName')
  .get(function () {
    return `${this.name} ${this.last_name}`;
  });
schema.virtual('location')
  .get(function () {
    let output;
    if (this.address.city) {
      output = this.address.city + (this.address.state ? `, ${this.address.state}` : '');
    } else if (this.address.state) {
      output = this.address.state;
    }
    return output;
  });
schema.virtual('age')
  .get(function () {
    return moment().diff(this.birthdate, 'years');
  });

schema.plugin(leanVirtuals);

module.exports = model('Admin', schema);
