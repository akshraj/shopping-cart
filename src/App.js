import React,{useState, useEffect} from 'react'
import './App.css';
import HomePage from './page/homepage/homepage.component'
import ShopPage from './page/shop/shop.component'
import {Route, Switch} from 'react-router-dom'

import Header from './components/header/header.component'
import SignInAndSignUpPage from './page/sign-in-and-sign-up/sign-in-and-sign-up.component'

import {auth, createUserProfileDocument} from './firebase/firebase.utils'

function App() {

  const [currentUser, setCurrentUser] = useState(null)

  var unsubscribeFromAuth = null

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          })
        })
      }

      setCurrentUser(userAuth)
      
      // createUserProfileDocument(user)
    });

    return () => unsubscribeFromAuth()
  },[])


  return (
    <div>
      <Header currentUser={currentUser}/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/signIn' component={SignInAndSignUpPage}/>
      </Switch> 
    </div>
  );
}

export default App;
