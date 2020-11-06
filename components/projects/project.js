const { Schema, model } = require('mongoose');

const schema = new Schema({
  seq: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ['Protótipagem', 'Desenvolvimento', 'Encerrado', 'Finalizado'] },
  description: { type: String, required: true, maxlength: 330 },
  overview: { type: String, required: true },
  thumbnailPath: { type: String },
  technologies: [{ type: String, required: true }],
  url: { type: String, required: true },
  homepage: { type: String },
  keywords: [{ type: String, required: true }]
});

schema.index({ url: 1, homepage: 1 }, { unique: true });

module.exports = model('Project', schema);
