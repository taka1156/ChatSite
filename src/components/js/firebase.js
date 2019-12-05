import firebase from 'firebase/app';
import 'firebase/auth';
import store from '@/store/index.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKRPGAZrRZtI-r7fCzy1jb791yPZd799A',
  authDomain: 'chatapp-f1e5d.firebaseapp.com',
  databaseURL: 'https://chatapp-f1e5d.firebaseio.com',
  projectId: 'chatapp-f1e5d',
  storageBucket: 'chatapp-f1e5d.appspot.com',
  messagingSenderId: '1076128056671',
  appId: '1:1076128056671:web:415c83c7fe1c0d26'
};

export default {
  //APIkeyやログインの設定
  initAuth() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  },
  logIn(providerName) {
    let provider;

    switch (providerName) {
      case 'Twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case 'Google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      default:
        provider = new firebase.auth.GithubAuthProvider();
        break;
    }

    firebase
      .auth()
      .signInWithRedirect(provider)
      .then();
  },
  logOut() {
    firebase
      .auth()
      .signOut()
      .then()
      .catch(err => alert(err));
  },
  //ログイン状態の制御
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserStatusChanged', user.uid ? true : false);
    });
  }
};
