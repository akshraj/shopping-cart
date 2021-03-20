import React,{useState, useEffect} from 'react'
import './App.css';
import HomePage from './page/homepage/homepage.component'
import ShopPage from './page/shop/shop.component'
import {Route, Switch,Redirect} from 'react-router-dom'

import Header from './components/header/header.component'
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'

import {auth, createUserProfileDocument} from './firebase/firebase.utils'

function App(props) {

  const [currentUser, setCurrentUser] = useState(null)

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
        <Route path='/signIn' exact render={() => props.currentUser ? <Redirect to="/"/> : <SignInAndSignUpPage />} />
      </Switch> 
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (disptach) => ({
  setCurrentUser : user => disptach(setCurrentUser(user)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
