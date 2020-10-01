import React from 'react';
import {  Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton';
import Folder from '../Folder/Folder';
import ApiContext from '../ApiContext';
import './NoteListNav.css';
import PropTypes from 'prop-types';


export default class NoteListNav extends React.Component {
  // static defaultProps ={
  //   onDeleteNote: () => {},
  // }
  static contextType = ApiContext;



  render() {
    const { folders=[]} = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            
            <li key={folder.id}>
              <Folder
                id={folder.id}
                name={folder.name}/>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          {/* <FolderError>
            <AddFolder />
          </FolderError> */}
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
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


NoteListNav.propTypes = {

  onDeleteNote:PropTypes.func,

};

NoteListNav.defaultProps = {

  onDeleteNote: () => {},
}