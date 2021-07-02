import React, {useState} from 'react';
import './search.scss';

const Search = ({handleSearch, clearUsers, showClear, setAlert}) =>{

    const [text, setText] = useState("");

    const onChangeHandler = (event) =>{
        setText(event.target.value.trim());
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        if (text === ''){
            setAlert('Please enter something', 'light')
        }else{
            handleSearch(text);
            setText("");
        }
    }

        return (
            <div>
                <form className="form" onSubmit={submitHandler}>
                    <input type="text" value={text} onChange={onChangeHandler} name='text' placeholder="Search users..."/>
                    <input type="submit" value="Search" className="btn"/>
                </form>
                {showClear && ( <div className="clear-btn">
                    <button onClick={clearUsers}>Clear Users</button>
                </div>)}

            </div>
        );
}

export default Search;