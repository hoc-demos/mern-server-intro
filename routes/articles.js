const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get('/:id', getArticle, (req, res) => {
  res.send(res.article);
});

router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    abstract: req.body.abstract
  });

  try {
    let newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({message: err.message})
  }

});

async function getArticle(req, res, next) {
  let article = null;
  const id = req.params.id;
  try {
    article = await Article.findById(id);
    if (article === null) {
      return res.status(404).json({message: `Cannot find article with id: ${id}`});
    }
  }
  catch (err) {
    return res.status(500).json({message:err.message});
  }

  res.article = article;
  next();
}

module.exports = router;