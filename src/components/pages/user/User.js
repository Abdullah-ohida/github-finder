import React, {Fragment, useEffect} from 'react';
import {Link} from "react-router-dom";
import Repos from "../../layout/repos/Repos";

const User = ({getUser, user, getUserRepos, repos, match}) => {
    const {
        name, avatar_url, location, bio,
        blog, login, html_url, followers,
        following, public_repo, hireable,
        public_gists, company
    } = user;

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login)
    }, [])

    return (
        <Fragment>
            <Link to="/" className="btn">Back to search</Link>
            Hireable: {' '}
            {hireable ? (<i className="fas fa-check text-success"/>) : (<i className="fas fa-time text-danger"/>)}

            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className='round-img' width={{width: '150px'}} alt={login}/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>

                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}

                    <a href={html_url} className="btn">Visit Github Profile</a>

                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {company && (
                                <Fragment>
                                    <strong>Company: </strong> {company}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <Fragment>
                                    <strong>Website: </strong> {blog}
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>


            <div className="card text-center">
                <div className="badge badge-primary">Followers: {following}</div>
                <div className="badge badge-primary">Following: {followers}</div>
                <div className="badge badge-primary">Public Repo: {public_repo}</div>
                <div className="badge badge-primary">Public Gist: {public_gists}</div>
            </div>

            <Repos repos={repos} />
        </Fragment>
    );
};

export default User;