import React,{useEffect} from 'react'
import './App.css';
import HomePage from './page/homepage/homepage.component'
import ShopPage from './page/shop/shop.component'
import {Route, Switch,Redirect} from 'react-router-dom'

import { createStructuredSelector } from 'reselect'

import Header from './components/header/header.component'
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {connect} from 'react-redux'

import {setCurrentUser} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors'

import {auth, createUserProfileDocument} from './firebase/firebase.utils'

import CheckOut from './page/checkout/checkout.component';

function App(props) {

  var unsubscribeFromAuth = null

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          props.setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          })
        })
      }

      props.setCurrentUser(userAuth)
      
      // createUserProfileDocument(user)
    });

    return () => unsubscribeFromAuth()
  },[])


  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/checkout' component={CheckOut}/>
        <Route path='/signIn' exact render={() => props.currentUser ? <Redirect to="/"/> : <SignInAndSignUpPage />} />
      </Switch> 
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = (disptach) => ({
  setCurrentUser : user => disptach(setCurrentUser(user)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
