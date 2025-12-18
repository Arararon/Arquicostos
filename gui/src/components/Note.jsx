import React from "react";
import "../styles/Note.css";
import { useNavigate,Link } from "react-router-dom";


function Note({note,onDelete}) {

    const formatedDate=new Date(note.created_at).toLocaleDateString("es-MX");

    return <div className="note-container">
                <p className="note-title"><Link to={`/obra/${note.id}/`}>{note.name}</Link></p>
                <p className="note-content">{note.description}</p>
                <p className="note-date">{formatedDate}</p>
                <button className="delete-button" onClick={() => onDelete(note.id)}>Delete</button>
            </div>
}

export default Note;