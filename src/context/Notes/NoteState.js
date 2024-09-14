import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8080";
  const notesIntial = [];

  const [notes, setNotes] = useState(notesIntial);
  
  //get all Notes
  const getNotes = async () => {
    //Api call
        const url = `${host}/api/notes/fetchAllNotes`;
        const headers = new Headers();
        headers.set("Authorization", localStorage.getItem("token"));
      
        let data = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        let parseData = await data.json();
        // const notesArray = Array.isArray(parseData) ? parseData : [parseData];
        setNotes(parseData);
  }
  //Add a Note
  const addNote = async (title, description, tag) => {
    //To do api call
    //Api call
        const url = `${host}/api/notes/addNote`;
        const headers = new Headers();
        headers.set("Authorization", localStorage.getItem("token"));
        headers.set("Content-Type", "application/json");  // Set the content type to JSON

        const body = JSON.stringify({title, description, tag});
        let data = await fetch(url, {
          method: "POST",
          headers: headers,
          body: body 
        });
        let parseData = await data.json();
        const a = [parseData];
        console.log(a);
        setNotes((prevNotes) => [...prevNotes, parseData]);

   
    // console.log(json);
  }

  //Delete a Note
  const deleteNote = async(id) => {

        const url = `${host}/api/notes/deleteNote/${id}`;
        const headers = new Headers();
        headers.set("Authorization", localStorage.getItem("token"));
        headers.set("Content-Type", "application/json");  

        await fetch(url, {
          method: "DELETE",
          headers: headers,
        });
    
    const newNotes = notes.filter((note) => {
              
      return note.id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const url = `${host}/api/notes/updateNote/${id}`;
    const headers = new Headers();
    headers.set("Authorization", localStorage.getItem("token"));
    headers.set("Content-Type", "application/json");  // Set the content type to JSON

    const body = JSON.stringify({title, description, tag});
    let data = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: body 
    });
    let parseData = await data.json();
    console.log(parseData);
    let newNotes = JSON.parse(JSON.stringify(notes));


    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element.id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
      }
      
      }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
