import React from 'react'
import { NavLink } from 'react-router-dom'
// import { format } from 'date-fns'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import { countNotesForFolder } from '../notes-helpers'
import './Folder.css';
import PropTypes from 'prop-types';

export default class Folder extends React.Component {
 
  static contextType = ApiContext;

  handleClickDelete = () => {
    // e.preventDefault()
    
    const folderId = this.props.id
    // console.log(folderId);

    fetch(`${config.API_ENDPOINT}/api/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(folderId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(folderId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    
    const { name, id } = this.props
    const { notes=[]} = this.context;
    // const { folders = [] } = this.context;
    const folder = parseInt(id)
    // console.log(notes,folders, id);
    // console.log('hi',this.props, notes);
    return (
      <div className='Folder'>
        

              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder)}
                </span>
                {name}
              </NavLink>
      </div>
    )
  }
}

Folder.propTypes = {
  onDeleteNote:PropTypes.func,
  id:PropTypes.string,
  name:PropTypes.string,
}

Folder.defaultProps={
  onDeleteNote: () => {},
}
