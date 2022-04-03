const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

//ROUTE 1: Get all the notes of the logged in user: GET "/api/note/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    //Using the fetchuser middleware to ensure the user is logged in and then fetching the notes of that particular user based on his id
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

//ROUTE 2: Adding a new notes using: POST "/api/note/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title of atleast 3 character').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character long').isLength({ min: 3 })], async (req, res) => {
        try {
            //Taking the title description and tag from the body of the request
            const { title, description, tag } = req.body;
            //If there are errors return bad requests. Following lines are same as mentioned on the express validator website
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //Creating a new note based on the title description tag and also getting the userid received 
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            //Saving the note and sending the note as json
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    })

//ROUTE 3: Update an existing note using: PUT "/api/note/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    //Taking the title description and tag from the body of the request
    const { title, description, tag } = req.body;

    //Creating a newNote object which will be the updated object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated and update
    let note = await Note.findById(req.params.id);

    //If the note is not found send the status code 404 with message not found
    if (!note) { return res.status(404).send("Not Found") }

    //If the user that is updating the note and the user associated with the note is not same then send the status code 401 Not Allowed
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

    //If everything went good then update the note and send the note as a confirmation
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note)

})

//ROUTE 4: Delete an existing note using: DELETE "/api/note/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);

    //If the note is not found send the status code 404 with message not found
    if (!note) { return res.status(404).send("Not Found") }

    //If the user that is deleting the note and the user associated with the note is not same then send the status code 401 Not Allowed
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }

    //If everything went good then delete the note and send a success message
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success": "The note has been deleted successfully", "note": note });

})
module.exports = router