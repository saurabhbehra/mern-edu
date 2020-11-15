import React from 'react'
import { NavLink } from 'react-router-dom';

//IMPORT CSS
import './courseCard.css'


const CourseCard = (props) => {
    return (
        <div className="col-12 col-sm-4 col-md-4">
            <div className="card mb-3 course-card" >
                <div className="card-header bg-transparent card-border">{props.header}</div>
                <div className="card-body course-body justify-content-center">
                    <img src={props.image} alt="course" className="course-image" />
                </div>
                <div className="card-footer bg-transparent card-border"><del>Rs. {props.delprice}</del> &nbsp; Rs. {props.price}<br/>
                   <NavLink to={props.path}><button type="button" className="btn btn-outline-info">Get Details</button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default CourseCard