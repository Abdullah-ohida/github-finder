
import "./user-item.scss"
 const UserItem = ({user}) =>{
     console.log(user)
    const {login, avatar_url, html_url} = user
        return (
            <div className="card text-center">
                <img src={avatar_url} alt="userImage" className="round-img" style={{width: '60px'}}/>
                <h3>{login}</h3>
                <div>
                    <a href={html_url} className="btn btn-dark btn-sm my-1">More</a>
                </div>
            </div>

        );
}

export default UserItem;