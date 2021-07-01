import "./App.css";
import {useEffect, useState} from "react";
import Navbar from "./components/layout/navbar/Navbar";
import axios from "axios";
import Users from "./components/reuseable/users/Users";
import Spinner from "./components/reuseable/spinner/Spinner";
import Search from "./components/reuseable/Search/Search";
import Alert from "./components/reuseable/alert/Alert";

const App = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    function getSearchUrl(params) {
        return `https://api.github.com/search/users?q=${params}&client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    }


    const defaultUserUrl = `https://api.github.com/users?client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`


    const fetchData = async (url) => {
        const response = await axios.get(url);
        return await response.data;
    }

    const searchUser = (text) => {
        setLoading(true);
        fetchData(getSearchUrl(text))
            .then(res => setUsers(res.items))
            .catch(console.error)
        setLoading(false);
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setLoading(true);
       fetchData(defaultUserUrl)
           .then(response=>setUsers(response))
        setLoading(false);
    }, [])

    const clearUsers = () => {
        console.log("Test")
        setUsers([]);
    }

    const updateAlert = (msg, type) => {
        setAlert({msg, type});

        setTimeout(() => {
            setAlert(null);
        }, 5000)
    }

    return (
        <div className="App">
            <Navbar/>
            <Alert alert={alert}/>
            <Search
                handleSearch={searchUser}
                clearUsers={clearUsers}
                showClear={users.length > 0}
                setAlert={updateAlert}
            />
            {loading ? <Spinner/> : <Users users={users}/>}
        </div>
    );
}

export default App;
