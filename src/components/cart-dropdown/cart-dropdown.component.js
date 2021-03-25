import React from 'react'
import './cart-dropdown.styles.scss'

import {connect} from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-items/cart-item.component'
import {selectCartItems} from '../../redux/cart/cart.selectors'

function Cart({cartItems}) {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)}
            </div>
                <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems : selectCartItems(state)
})

export default  connect(mapStateToProps)(Cart)
