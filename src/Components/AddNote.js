import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext';
import Alert from './Alert';

const AddNote = (props) => {
    //Using context call to use the note Context
    const context = useContext(noteContext);

    //Setting the useState for the title desc and tag
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    //We are using the addNote functionality of the context
    const { addNote } = context;

    //The function to handle the add note button click
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        document.getElementById('title').value="";
        document.getElementById('description').value="";
        document.getElementById('tag').value="";
        props.showAlert("Note added successfully","success");
    }

    //The function to make the textbox editable
    const onChange = (e) => {
        //This is a special syntax used to say that add the listed property after the note
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container my-2">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="titleHelp" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
