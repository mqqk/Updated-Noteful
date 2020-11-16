import React from 'react';
import {  Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton';
import Folder from '../Folder/Folder';
import ApiContext from '../ApiContext';
import './NoteListNav.css';
// import PropTypes from 'prop-types';


export default class NoteListNav extends React.Component {
  // static defaultProps ={
  //   onDeleteNote: () => {},
  // }
  static contextType = ApiContext;




  render() {
    const { folders=[]} = this.context;
    const folderId=(this.props.match.params.folderId)
    // console.log(folderId)
    // console.log(folders.map(folder => folder.id))
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            
            <li key={`${folder.id}`}>
              <Folder
                id={`${folder.id}`}
                name={folder.name}
                folder_id={folderId}
              />
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
            // onClick={show => showForm(show)}
          >
            <FontAwesomeIcon icon='plus' />
            <br />

            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}




