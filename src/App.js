import "./App.css";
import {Component, useEffect, useState} from "react";
import Navbar from "./components/layout/navbar/Navbar";
import axios from "axios";
import Users from "./components/reuseable/users/Users";
import Spinner from "./components/reuseable/spinner/Spinner";

class App extends Component{

    state = {
        users: [],
        loading: false,
    }

    async componentDidMount() {
        this.setState({loading: true});
        const res = await axios.get("https://api.github.com/users");
        this.setState({users: res.data, loading: false})
        console.log(this.state.users);
    }

    render() {
        return (
            <div className="App">
                <Navbar/>
                {this.state.loading ? <Spinner/> : <Users users={this.state.users}/>}
            </div>
        );
    }

}

export default App;
