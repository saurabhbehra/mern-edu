import React from 'react'

//IMPORT CSS
import './featuresCard.css'


const FeaturesCard = (props) => {
    return (
            <div className="col-12 col-sm-4 col-md-4">
                <div className="card text-center card-section">
                    <div className="card-body">
                        <div className="text-center mb-4">{props.icon}</div>
                        <h6 className="card-title">{props.title}</h6>
                        <p className="card-text text-muted">{props.text}</p>
                    </div>
                </div>
            </div>
         )
}

export default FeaturesCard
