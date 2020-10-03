import React, {Component} from 'react';
import './AddNote.css';
import ApiContext from '../ApiContext';
import config from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton';
import PropTypes from 'prop-types';


export default class AddNote extends Component{

    static contextType = ApiContext;

    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            // modified:'',
            folderId:'',
            content:'',
            showFolderError:'Must Choose a Folder',
            showNameError:'Cannot be blank',
            showContentError:'Cannot be blank',
        }
    }

    

    addName(name) {
        // console.log(name)
        if(name.length>0){
            this.setState({
                id:name,
                name:name,
                showNameError:'',
                
            })}
            else{
            this.setState({
                name:'',
                id:'',
                showNameError:'Cannot be blank!',
            }   
        )}
    }

    addContent(content) {
        // console.log(content)
        if(content.length>0){
            this.setState({
                content:content,
                showContentError:'',
                
            })}
            else{
            this.setState({
                content:'',
                showContentError:'Cannot be blank!',
            }   
        )}
        
    }

    
    

    addFolder(folderSelect){        
        const folderId=this.context.folders.filter(folder => folder.name===folderSelect)
        console.log(folderSelect);
        if(folderSelect!=="Select"){

            this.setState({
                folderId:folderId[0].id,
                showFolderError:''
            })
        }else{
            this.setState({
                folderId:'',
                showFolderError:'Must Select a Folder',
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const {id, name, content, folderId} = this.state;
        const note = {id, name, content, folderId};
        console.log(note)

        // this.context.addFolder(folder)

        const option = {
            method:'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json',
            }
        };
        fetch(`${config.API_ENDPOINT}/notes`,option)
        .then(res => {
            if(!res.ok){
                throw new Error('Something went wrong');
            }
            return res.json();
        })
        .then(console.log(note))
        .then(data => {
            console.log(this.context)
            this.setState({
                id:'',
                name:'',
                content:'',
                folderId:'',
            });
            this.context.addNote(note.id,note.name,note.content,note.folderId);
            this.props.history.goBack();
            // console.log(this.context.notes)

        })
        .catch(error => {
            console.error({error});
        });

    }

    render(){
        console.log(this.state)
        console.log(this.props)
        // console.log(this.context)

        const folderOptions = this.context.folders.map((folder) =>
            <option value={folder.name} key={folder.id}>{folder.name}</option>)

            // console.log(folderOptions)

        return(
        <div>
            <form
                className="addNote"
                onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Your Note Here</h2>
                <label htmlFor="name">
                    Note Name:
                    <input 
                        type="text"
                        className="noteName"
                        name="name"
                        id='name'
                        defaultValue=''
                        // onClick={e => this.addName(e.target.value)}
                        onChange={e => this.addName(e.target.value)}
                        required
                        />
                        <p className='error'>{this.state.showNameError}</p>
                </label>
                <label htmlFor="content">
                    Contents:
                    <input
                        type="text"
                        className="noteContent"
                        name="content"
                        id="content"
                        defaultValue=''
                        // onClick={e => this.addContent(e.target.value)}
                        onChange={e => this.addContent(e.target.value)}
                        required
                        />
                        <p className='error'>{this.state.showContentError}</p>
                </label>
                <label htmlFor="folderSelect">
                    Folder Select:
                    <select
                        id="folder"
                        name="folder"
                        // defaultValue="Important"                        
                        onChange={e => this.addFolder(e.target.value)}
                    >
                        <option defaultValue='Important'>Select</option>                        
                        {folderOptions}
                    </select>
                    <p className='error'>{this.state.showFolderError}</p>

                </label>
                <button 
                    type="submit"
                    // onClick={() => this.props.history.goBack()}
                    >Submit</button>
            </form>
            <CircleButton
                tag='button'
                role='link'
                onClick={() => this.props.history.goBack()}
                className='NotePageNav__back-button'
            >
            <FontAwesomeIcon icon='chevron-left' />
            <br />
                Back
            </CircleButton>
        </div>
        )
    }
}



AddNote.propTypes={
    history:PropTypes.object,

}