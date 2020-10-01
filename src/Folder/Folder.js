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
  // static defaultProps ={
  //   onDeleteNote: () => {},
  // }
  static contextType = ApiContext;

  handleClickDelete = () => {
    // e.preventDefault()
    console.log(this.props)
    const folderId = this.props.id
    console.log(folderId);

    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
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
    return (
      <div className='Folder'>
        

              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, id)}
                </span>
                {name}
              </NavLink>
      </div>
    )
  }
}

Folder.propTypes = {
  onDeleteNote:PropTypes.func,
}

Folder.defaultProps={
  onDeleteNote: () => {},
}
