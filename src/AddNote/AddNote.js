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
            modified:'',
            folder_id:'',
            content:'',
            showFolderError:'Must Choose a Folder',
            showNameError:'Cannot be blank',
            showContentError:'Cannot be blank',
        }
    }

    modifyDate(e){
        e.preventDefault();
        const date = toString(Date.now());
        this.setState({
            modified:date,
        })
    }
    

    addName(name) {
        // console.log(name)
        name=name.trim();
        // console.log(name.length)
        if(name.length>0){
            this.setState({
                id:'',
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
        const folder_id=this.context.folders.filter(folder => folder.name===folderSelect)
        // console.log(folderSelect);
        if(folderSelect!=="Select"){

            this.setState({
                folder_id:folder_id[0].id,
                showFolderError:''
            })
        }else{
            this.setState({
                folder_id:'',
                showFolderError:'Must Select a Folder',
            })
        }
    }


    validateName(e){
        e.preventDefault();
        
       
        const nameCheck = this.context.notes.filter(note => note.name===this.state.name);
        // console.log(nameCheck);
            if(this.state.name.length===0){return(
                this.setState({
                    name:'',
                    id:'',
                    showNameError:'Remember, this cannot be blank'
                })
            )}
            if(this.state.content.length===0){return(
                this.setState({
                    content:'',
                    showContentError:'Remember, this cannot be blank',
                })
            )}
            if(this.state.folder_id===''){return(
                this.setState({
                    showFolderError:'Remember to make a selection',
                })
            )}

            
            // console.log('made it to name check')
            if(nameCheck.length===0){return this.handleSubmit(e)};
            if(nameCheck[0].name===this.state.name){return (
            this.setState({
                name:'',
                id:'',
                showNameError:'Note Name Already Exists'
            })
            )}
            
    }


    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const {name, id, modified, content, folder_id} = this.state;
        const note = {id, name, modified, content, folder_id};
        // console.log(note)

        // this.context.addFolder(folder)

        const option = {
            method:'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json',
            }
        };
        fetch(`${config.API_ENDPOINT}/api/notes`,option)
        .then(res => {
            if(!res.ok){
                throw new Error('Something went wrong');
            }
            return res.json();
        })
        // .then(console.log(note))
        .then(data => {
            // console.log(this.context)
            this.setState({
                id:'',
                name:'',
                content:'',
                folder_id:'',
                modified:'',
            });
            this.context.addNote(note.id,note.name,note.content,note.folder_id,note.modified);
            this.props.history.goBack();
            // console.log(this.context.notes)

        })
        .catch(error => {
            console.error({error});
        });

    }

    render(){
        // console.log(this.state)
        // console.log(this.props)
        // console.log(this.context)
        // console.log(this.state.name.length);

        const folderOptions = this.context.folders.map((folder) =>
            <option value={folder.name} key={folder.id}>{folder.name}</option>)

            // console.log(folderOptions)

        return(
        <div>
            <form
                className="addNote"
                onSubmit={e => this.validateName(e)}>
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
                        // required
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
                        // required
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