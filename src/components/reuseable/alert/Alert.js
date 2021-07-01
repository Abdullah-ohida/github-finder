import React from 'react';
import  "./alert.scss"
const Alert = ({alert}) => {
        return (
            alert && (
                <div className={`${alert.type}`}>
                    <i className='fas fa-info-circle'/>{alert.msg}
                </div>
            )
        );
}

export default Alert;