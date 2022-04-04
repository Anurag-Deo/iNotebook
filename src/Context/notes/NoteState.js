import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    //Get all Notes
    const getNotes = async () => {
        //Api call to fetch all the notes through the fetch all notes api made in backend
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0NDQyNmU4NWEyMWI2ZjU5NjI2OWIyIn0sImlhdCI6MTY0ODY5NjQ1NX0.QRdWMg3rIsnUzxJvwDqs-NdToxm-AoKh_Bb-qiuOPCs'

            },
        });
        //Setting the response.json to the setNotes to change the note useState
        const json = await response.json()
        console.log(json);
        setNotes(json)

    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        //Api call to add the notes using the addNote api created in the Backend
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0NDQyNmU4NWEyMWI2ZjU5NjI2OWIyIn0sImlhdCI6MTY0ODY5NjQ1NX0.QRdWMg3rIsnUzxJvwDqs-NdToxm-AoKh_Bb-qiuOPCs'

            },
            //The body should be an object consisting the title, desc and the tag
            body: JSON.stringify({ title, description, tag })
        });

        //This is the client side logic to add note
        const note = {
            "_id": "624678a728cd409adfd587dde",
            "user": "6244426e85a21b6f596269b2d",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-04-01T03:59:35.134Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //Api call to edit the notes using the editNote api created in the Backend
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0NDQyNmU4NWEyMWI2ZjU5NjI2OWIyIn0sImlhdCI6MTY0ODY5NjQ1NX0.QRdWMg3rIsnUzxJvwDqs-NdToxm-AoKh_Bb-qiuOPCs'

            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        // Created a newNote 
        let newNote = JSON.parse(JSON.stringify(notes))
        //The logic for the client
        for (let index = 0; index < newNote.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote);
    }

    //Delete a Note
    const deleteNote = async (id) => {
        //TODO: Api Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0NDQyNmU4NWEyMWI2ZjU5NjI2OWIyIn0sImlhdCI6MTY0ODY5NjQ1NX0.QRdWMg3rIsnUzxJvwDqs-NdToxm-AoKh_Bb-qiuOPCs'

            },
            //body: JSON.stringify(data)
        });
        // const json = response.json();
        //Client side logic for deleting the note
        console.log('Deleting the note with id' + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }

    return (
        //This is the syntax for the NoteContext usage exporting all the needed things
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;