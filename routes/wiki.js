const express = require('express');
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");


router.get('/', (req, res, next)=>{
    res.send('got to GET /wiki/');
});

router.post('/', async (req, res, next)=>{
    try {
        let data = await req.body;
        const page = await Page.create({
          title: data.title,
          content: data.content
        });
        await page.save();
        console.log('title', req.body.title);
        console.log('content', req.body.content);
        // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
        res.redirect('/');
      } catch (error) { next(error) }
});

router.get("/add", (req, res) => {
    console.log('req body', req.body);
    res.send(addPage());
});

module.exports = router;