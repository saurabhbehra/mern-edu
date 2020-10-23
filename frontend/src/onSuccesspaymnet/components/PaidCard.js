import React from 'react'
import { Link } from 'react-router-dom'
//IMPORT CSS
import './paidCard.css'

const PaidCard = props => {
    return (
        <div className="card my-course-card mt-3">
            <div className="card-body">
                <Link to={props.path}>
                    <div className="v-line">
                        <span>{props.icon}</span> 
                        <span className="play-heading">{props.heading}</span>
                    </div>
                 </Link>
            </div>
        </div>
    )
}

export default PaidCard
