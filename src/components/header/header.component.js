import React from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import './header.styles.scss'
import CartIcon from '../cart-icon/cart-icon-component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component'

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

const mapStateToProps = ({user: {currentUser}, cart:{hidden}}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header)