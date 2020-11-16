
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folder_id === folderId)
)

export const countNotesForFolder = (notes=[], folderId) =>(
  
  // console.log(typeof folderId),
  // console.log(notes[0]), 
  notes.filter(note => note.folder_id === folderId).length
)
