const Project = require('./project');
const { verify } = require('../auth/authService');
const { query, param, validationResult } = require('express-validator');
const { IncomingForm } = require('formidable');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Bahia').locale('pt-br');

exports.readProjects = [
  query(['behind', 'items']).isAlphanumeric().toInt(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Paginação incorreta' });
    }
    Project.find()
      .lean()
      .sort('-seq')
      .skip(req.query.behind)
      .limit(req.query.items + 1)
      .exec((err, projects) => {
        if (err) { return res.status(502).json({ message: 'Falha ao buscar projetos' }); }
        let hasMore = false;
        if (projects.length > req.query.items) {
          projects.pop();
          hasMore = true;
        }
        return res.json({ projects, hasMore });
      });
  }
];

exports.getSequences = function (req, res) {
  Project.find({}, { _id: 0, seq: 1, name: 1 })
    .lean()
    .exec((err, result) => {
      if (err) { return res.status(502).json({ message: 'Falha ao buscar sequências' }); }
      return res.json(result);
    });
};

exports.readProject = [
  param('seq').isAlphanumeric().toInt(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Número de projeto inválido' });
    }
    Project.findOne({ seq: req.params.seq })
      .lean()
      .exec((err, project) => {
        if (err) { return res.status(502).json({ message: 'Falha ao buscar' }); }
        if (!project) { return res.status(404).json({ message: 'Projeto inexistente' }); }
        return res.json(project);
      });
  }
];

exports.createProject = [
  verify,
  function (req, res) {
    const form = new IncomingForm();
    form.onPart = (part) => {
      if (part.filename === '' || !part.mime) {
        form.handlePart(part);
      }
    };
    form.parse(req, function (err, fields, fields) {
      if (err) { return res.status(400).json({ message: 'Formulário inválido' }); }
      let project = new Project({
        seq: fields.seq,
        name: fields.name,
        status: fields.status,
        description: fields.description,
        technologies: JSON.parse(fields.technologies),
        url: fields.url,
        keywords: JSON.parse(fields.keywords)
      });
      if (fields.thumbnailPath) project.thumbnailPath = fields.thumbnailPath;
      if (fields.overview) project.overview = fields.overview;
      if (fields.homepage) project.homepage = fields.homepage;
      project.save((err, projectSaved) => {
        if (err) { return res.status(502).json({ message: 'Falha ao salvar' }); }
        return res.status(200).json({ message: 'Projeto adicionado!', project: projectSaved });
      });
    });
  }
];

exports.updateProject = [
  verify,
  param('id').isMongoId(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const form = new IncomingForm();
    form.onPart = (part) => {
      if (part.filename === '' || !part.mime) {
        form.handlePart(part);
      }
    };
    form.parse(req, function (err, fields) {
      if (err) { return res.status(400).json({ message: 'Formulário inválido' }); }
      let project = new Project({
        _id: fields._id,
        seq: +fields.seq,
        name: fields.name,
        status: fields.status,
        description: fields.description,
        technologies: JSON.parse(fields.technologies),
        url: fields.url,
        keywords: JSON.parse(fields.keywords)
      });
      if (fields.thumbnailPath) project.thumbnailPath = fields.thumbnailPath;
      if (fields.overview) project.overview = fields.overview;
      if (fields.homepage) project.homepage = fields.homepage;
      Project.updateOne({ _id: req.params.id }, project, (err, result) => {
        if (err || !result.n) { return res.status(502).json({ message: 'Falha ao atualizar' }); }
        return res.status(200).json({ message: 'Projeto atualizado!' });
      });
    });
  }
];

exports.deleteProject = [
  verify,
  param('id').isMongoId(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    Project.findByIdAndDelete(req.params.id, { select: 'seq' }, (err, projectDeleted) => {
      if (err || !projectDeleted) { return res.status(400).json({ message: 'Falha ao deletar' }); }
      return res.status(200).json({ message: `Projeto ${projectDeleted.seq} deletado.` });
    });
  }
];
