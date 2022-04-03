import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

export const Notes = () => {
    //Using context call to use the note Context
    const context = useContext(noteContext);

    //Getting the notes and getNotes from the context
    const { notes, getNotes } = context;

    //Calling the getNotes function to call all the notes through the fetch api
    useEffect(() => {
        getNotes()
    }, [])

    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {/* For all the items of the notes return the Noteitem with key and note as a prop */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
