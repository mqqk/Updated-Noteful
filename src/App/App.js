import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import ApiContext from '../ApiContext';
import config from '../config';
import Error from '../Error';
import './App.css';
// import { isThisQuarter } from 'date-fns';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        showAddForm:false,
    };

    componentDidMount() {
        // console.log(`${config.API_ENDPOINT}/notes`)
        Promise.all([
            fetch(`${config.API_ENDPOINT}/api/notes`),
            fetch(`${config.API_ENDPOINT}/api/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
                // console.log([notes,folders])
            })
            // .then( console.log([notes,folders]))
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleAddFolder = (name) => {
        // console.log('adding folder')
        this.setState({
            folders:[...this.state.folders,{name}],
            showAddForm:false,
        });   
    };

    handleAddNote = (id,name,content,folder_id,modified) => {
        this.setState({
            notes:[...this.state.notes,{id,name,content,folder_id,modified}]
        });
    };

    setShowFolderForm=(show)=>{
        this.setState({
          showAddForm:show
        });
      }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Error>
                <Route path="/add-folder" component={AddFolder} />
                </Error>
                {/* <Route path="/add-note" component={AddNote} /> */}
            </>
        );
    }



    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Error>
                    <Route path="/add-note" component={AddNote} />
                </Error>
                
            </>
        );
    }

    render() {
        // console.log(this.state);
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            showAddForm:this.state.showAddForm,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
            showForm: this.setShowFolderForm,
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
