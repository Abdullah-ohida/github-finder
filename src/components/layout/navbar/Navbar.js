import './navbar.scss';
import PropTypes from 'prop-types';

const Navbar = ({icon, title}) => {
        return (
            <div className ="navbar">
                <div className="logo">
                    <i className={icon}/>
                    <h3>{title}</h3>
                </div>

                <ul className="list">
                    <li>home</li>
                    <li>about us</li>
                </ul>
            </div>
        );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
    title: 'github finder',
    icon: 'fab fa-github',
}

export default Navbar;