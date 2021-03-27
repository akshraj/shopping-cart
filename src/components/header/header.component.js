import React from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'
import {createStructuredSelector} from 'reselect'

import {ReactComponent as Logo} from '../../assets/crown.svg'
import './header.styles.scss'
import CartIcon from '../cart-icon/cart-icon-component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component'

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'

import {connect} from 'react-redux'

const Header = ({currentUser, hidden}) => {
    console.log('hidden', hidden)
return(
    <div className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ? 
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                : <Link to='signIn' className='option'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        {!hidden && <CartDropDown /> }
    </div>
)
}

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    hidden : selectCartHidden
})

export default connect(mapStateToProps)(Header)