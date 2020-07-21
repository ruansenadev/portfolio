require('dotenv').config()
const bcrypt = require('bcryptjs')
const md5 = require('md5')
const moment = require('moment')
const Admin = require('./models/admin')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const passwordEncrypted = bcrypt.hashSync(process.env.ACCOUNT_PASS, 10)

async function createAdmin(name, surname, email, password, birthdate, photo, nickname, profession, logo, biodata, skills, social) {
  birthdate = moment(birthdate, 'DD-MM-YYYY').toDate();
  let data = {
    name,
    surname,
    email,
    password,
    birthdate,
    profession
  }
  if(!photo) data.photo = `https://www.gravatar.com/avatar/${md5(email.toLowerCase())}?s=200&d=identicon`
  if(!biodata) data.biodata = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, veniam, aliquid vel asperiores velit nemo dolore repellendus atque nesciunt assumenda eius dolor magni laborum. Minus tempora temporibus voluptates distinctio similique!'

  if(nickname) data.nickname = nickname
  if(logo) data.logo = logo
  if(skills) data.skills = skills
  if(social) data.social = social

  const admin = new Admin(data)
  return admin.save()
}

createAdmin('Ruan', 'Sena', 'ruansenadev@gmail.com', passwordEncrypted, '02-02-1999', null, 'ruansenadev', 'Fullstack developer', null, null, { JavaScript: ['Node', 'Express', 'Angular', 'MongoDB'], Git: true, English: 'Intermediate' }, {'GitHub': 'ruansenadev'})
.then(console.log)
.catch(console.error)
.finally(() => {
  mongoose.connection.close()
})
