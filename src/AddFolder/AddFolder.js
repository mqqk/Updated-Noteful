import React, {Component} from 'react';
import config from '../config';
import ApiContext from '../ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import PropTypes from 'prop-types';
import './AddFolder.css'

// const userError = <p>Need Input</p>;

export default class AddFolder extends Component{

    static contextType = ApiContext;


    constructor(props){
        super(props);
        this.state={
           
            name:'',
            showError:'Cannot Leave Blank',

        }
    }

    

    // addName(name) {
    //     // console.log(name,name.length)
        
    //     this.setState({
    //         id:name,
    //         name:name,
    //         showError:'',
            
    //     })

    // }


    //receives state up date and ensures folder name won't be blank
    validateLength(name) {
       
        // console.log(this.context);
        if(name.length>0){
            this.setState({
                name:name,
                id:name,
                showError:"",
            })
        }else {
            this.setState({
                name:'',
                id:'',
                showError:'Cannot Leave Blank',
            })
        }
        

        // this.context.folders.map(folder => {
        //     if(name===folder.name){return( 
        //         this.setState({
        //             showError:'This Folder Name Already Exists'
        //         }))
        //     }
        //     else{
        //         console.log('what now?')
        //         this.setState({
        //             name:'',
        //             id:'',
        //         })}
        // })
            
            
       
    }

    validateName(e){
        e.preventDefault();
        // console.log(this.state.name);
        const nameCheck = this.context.folders.filter(folder => folder.name===this.state.name);
        // console.log(nameCheck);
            if(nameCheck.length===0){return this.handleSubmit(e)};
            if(nameCheck[0].name===this.state.name){return (
            this.setState({
                name:'',
                id:'',
                showError:'Folder Name Already Exists'
            })
        )}
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('running fetch');
        const {id, name} = this.state;
        const folder = {id, name};
        this.setState({
            id:'',
            name:'',
        })

        // console.log(folder)

        // this.context.addFolder(folder)

        const option = {
            method:'POST',
            body: JSON.stringify(folder),
            headers: {
                'content-type': 'application/json',
            }
        };
        fetch(`${config.API_ENDPOINT}/folders`,option)
        .then(res => {
            if(!res.ok){
                throw new Error('Something went wrong');
            }
            return res.json();
        })
        .then(console.log(folder))
        .then(data => {
            // console.log(this.context)
            this.setState({
                id:'',
                name:'',
            });
            this.context.addFolder(folder.id,folder.name)
            this.props.history.goBack();
            // console.log(this.context.folders)
        })
        .catch(error => {
            console.error({error});
        });

    }



    render(){
        // console.log(this.context)
        console.log(this.state);
        return(
        <div>
            <form
                className="addFolder"
                onSubmit={e => this.validateName(e)}
                >
                <h2>Add Your Folder Here</h2>
                <label htmlFor="name">
                    Folder Name Here:
                    
                    
                    <input 
                        type="text"
                        className="folderName"
                        name="name"
                        id='name'
                        defaultValue=''
                        onClick={e => this.validateLength(e.target.value)}
                        onChange={e => this.validateLength(e.target.value)}
                        required
                        />
                        <p className="error">{this.state.showError}</p>
                </label>
                <button 
                    type="submit"
                    // onClick={() => this.props.history.goBack()}
                >Submit
                </button>
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


AddFolder.propTypes={
    history:PropTypes.object,
}