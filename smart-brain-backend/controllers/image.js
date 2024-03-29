
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
})

const handleFaceDetection = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => { res.json(data); })
    .catch(err => { res.status(400).json('Unable to resolve image'); });
}

const handleImage = (req, res, db) => {
  db('users').where('id', '=', req.body.id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(() => res.status(400).json('unable to get entries!'));
}

module.exports = {
  handleImage,
  handleFaceDetection
};
