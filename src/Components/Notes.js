import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import noteContext from '../Context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

export const Notes = (props) => {
    let history = useHistory();
    //Setting the useState for the title desc and tag
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    //Making the update note function
    const updateNote = (currentNote) => {
        //Using the ref.current.click() function to programmatically click on the button to which ref={ref} is added
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    //Using context call to use the note Context
    const context = useContext(noteContext);

    //Getting the notes and getNotes from the context
    const { notes, getNotes, editNote } = context;

    //Calling the getNotes function to call all the notes through the fetch api
    useEffect(() => {
        //If the user has logged in then his token is stored in the local storage so checking if it is present before giving him his notes
        if(localStorage.getItem('token')){
        getNotes()
        }
        else{
            history.push('/login');
        }
    }, [])


    //The function to handle the add note button click
    const handleClick = (e) => {
        console.log('Updating the note....');
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        e.preventDefault()
        props.showAlert("Note edited successfully","success");

    }

    //The function to make the textbox editable
    const onChange = (e) => {
        //This is a special syntax used to say that add the listed property after the note
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            {/*Adding a button and a modal for editing the note. Using the bootstrap js and useref hook to trigger the modal*/}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" style={{ display: 'none' }}>
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="etitleHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length===0 ? <p className='mx-2'>Please add some note to view it here</p>:""}
                {/* For all the items of the notes return the Noteitem with key and note as a prop */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
