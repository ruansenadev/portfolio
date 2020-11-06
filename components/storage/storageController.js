const { S3 } = require('aws-sdk');
const { query, validationResult } = require('express-validator');

const allowed = {
  extensions: ['png', 'jpg', 'jpeg', 'svg', 'webp'],
  mimes: ["image/png", "image/jpeg", "image/svg+xml", "image/webp"],
  paths: ['admin', 'blog', 'album']
};

exports.getSignedUrl = [
  query('mimetype').isIn(allowed.mimes),
  query('filename').matches(`^[\\w-]+\\.(?:${allowed.extensions.join('$|') + '$'})`),
  query('path').isIn(allowed.paths),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Parâmetros inválidos' });
    }
    const Key = (req.query.path === 'admin') ?
      `images/${req.query.filename}`
      : `images/${req.query.path}/${req.query.filename}`;
    const ContentType = req.query.mimetype;
    const s3 = new S3();
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key,
      ContentType,
      ACL: 'public-read',
      Expires: 120 // 2 minutes valid time for uploading in browser
    };

    s3.getSignedUrl('putObject', s3Params, function (err, url) {
      if (err) { return res.status(502).json({ message: 'Falha ao aprovar upload' }); }
      return res.json({
        url,
        key: Key
      });
    });
  }
];
