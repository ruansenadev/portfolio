const mongoose = require('mongoose')
const leanVirtuals = require('mongoose-lean-virtuals')
const Schema = mongoose.Schema

const adminSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true },
  photo: { type: String, required: true },
  nickname: { type: String },
  logo: { type: String },
  biodata: { type: String, required: true },
  profession: { type: String, required: true },
  skills: {},
  social: { type: Map, of: String }
})

adminSchema.virtual('fullName')
  .get(function () {
    return `${this.name} ${this.surname}`
  })

adminSchema.plugin(leanVirtuals)

module.exports = mongoose.model('Admin', adminSchema)
