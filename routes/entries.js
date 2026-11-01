const mongoose = require("mongoose");
const Entry = require("../models/Entry.js");
const router = require("express").Router();
const isSignedIn = require("../middleware/is-signed-in.js");

router.get('/new', isSignedIn, (req,res)=>{
    res.render('new-entry.ejs')
})

router.post('/', isSignedIn, async (req,res)=>{
     console.log(req.session.user);

 const newEntry = await Entry.create({
    title: req.body.title,
    entryBody: req.body.entryBody,
    isPublic: req.body.isPublic === 'on',
    owner: req.session.user._id



 });
 res.redirect('/entries');
});


router.get('/', async (req,res)=>{
    const entries = await Entry.find({});
    console.log(entries);
    res.render('all-entries.ejs', { entries });
});


router.get ("/my-entries", isSignedIn, async (req,res)=>{
    const entries = await Entry.find({ owner: req.session.user._id }); // to only get entries owned by the signed-in user
    res.render('all-entries.ejs', { entries });
});

router.delete('/:id', isSignedIn, async (req,res)=>{
    await Entry.findByIdAndDelete(req.params.id);
    res.redirect('/entries');
});

router.get('/:id/edit', isSignedIn, async (req,res)=>{
    const entry = await Entry.findById(req.params.id);
    res.render('edit-entry.ejs', { entry });
});

router.put('/:id', isSignedIn, async (req,res)=>{
    await Entry.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic: req.body.isPublic === 'on'
    });
    res.redirect('/entries');
});

module.exports = router;
