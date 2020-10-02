import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  showAddForm:false,
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  showForm:() => {},
})
