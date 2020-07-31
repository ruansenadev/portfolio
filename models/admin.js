const mongoose = require('mongoose')
const leanVirtuals = require('mongoose-lean-virtuals')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Bahia').locale('pt-br')
const Schema = mongoose.Schema

const adminSchema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  address: {
    city: { type: String },
    state: { type: String },
    country: { type: String }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String, required: true },
  nickname: { type: String },
  logo: { type: String },
  profession: { type: String, required: true },
  biodata: { type: String, required: true },
  skills: {},
  social: { type: Map, of: String }
}, { typePojoToMixed: false })

adminSchema.virtual('fullName')
  .get(function () {
    return `${this.name} ${this.last_name}`
  })
adminSchema.virtual('location')
  .get(function () {
    let output = null
    if (this.address.city) {
      output = this.address.city + (this.address.state ? `, ${this.address.state}` : '') + (this.address.country ? ` - ${this.address.country}` : '')
    } else if (this.address.state) {
      output = this.address.state + (this.address.country ? ` - ${this.address.country}` : '')
    } else if (this.address.country) {
      output = this.address.country
    }
    return output
  })
adminSchema.virtual('age')
  .get(function () {
    return moment().diff(this.birthdate, 'years')
  })

adminSchema.plugin(leanVirtuals)

module.exports = mongoose.model('Admin', adminSchema)
