import "./App.css";
import {Fragment, useEffect, useState} from "react";
import Navbar from "./components/layout/navbar/Navbar";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Users from "./components/layout/users/Users";
import Spinner from "./components/reuseable/spinner/Spinner";
import Search from "./components/layout/Search/Search";
import Alert from "./components/reuseable/alert/Alert";
import About from "./components/pages/about/About";
import User from "./components/pages/user/User";

const App = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);


    function getSearchUrl(params) {
        return `https://api.github.com/search/users?q=${params}&client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    }


    const defaultUserUrl = `https://api.github.com/users?client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

    const fetchUser = (params) =>{
        return `https://api.github.com/users/${params}&client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    }


    const fetchUserRepos = (params) =>{
        return `https://api.github.com/users/${params}/repos?per_page=5&sort=created:asc&client_id=
            ${process.env.REACT_APP_GITHUB_ID}&client_secret=
            ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    }


    const fetchData = async (url) => {
        setLoading(true);
        const response = await axios.get(url);
        return await response.data;
    }

    const searchUser = (text) => {
        fetchData(getSearchUrl(text))
            .then(res => setUsers(res.items))
            .catch(console.error)
        setLoading(false);
    }

    const getUser = (username) => {
        fetchData(fetchUser(username))
            .then(res => console.log(res))
            // .then(res => setUser(res))
            .catch(console.error)
        setLoading(false);
    }

    const getUserRepos = (username) => {
        fetchData(fetchUserRepos(username))
            .then(res => setRepos(res))
            .catch(console.error)
        setLoading(false);
    }


    useEffect(() => {
        fetchData(defaultUserUrl)
            .then(response => setUsers(response))
        setLoading(false);
    }, [defaultUserUrl])

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
        <Router>

            <Switch>
                <Route exact path="/" render={props => (
                    <Fragment>
                        <Search
                            handleSearch={searchUser}
                            clearUsers={clearUsers}
                            showClear={users.length > 0}
                            setAlert={updateAlert}
                        />
                        {loading ? <Spinner/> : <Users users={users}/>}
                    </Fragment>
                )}/>

                <Route path="/about" component={About}/>

                <Route path='/user/:login' render={props => (
                    <User {...props} getUser={getUser} user={user} repos={repos} getUserRepos={getUserRepos}/>
                )} />
            </Switch>
            <div className="App">
                <Navbar/>
                <Alert alert={alert}/>


            </div>


        </Router>
    );
}

export default App;
