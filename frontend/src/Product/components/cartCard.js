import React from 'react'

//IMPORT CSS
import './cartCard.css'


const CartCard = (props) => {
    return (
        <div className="col-12 col-sm-4 col-md-4">
            <div className="card mb-3 cart-item-card" >
                <div className="card-header bg-transparent cart-border">{props.header}</div>
                <div className="card-body cart-body justify-content-center">
                    <img src={props.image} alt="course" className="cart-image" />
                </div>
                <div className="card-footer bg-transparent cart-border">
                    <del>{props.delprice}</del> &nbsp; {props.price}<br/>
                </div>
            </div>
        </div>
    )
}

export default CartCard