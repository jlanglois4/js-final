import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUriAvIG3qMC4nN8BZbc_Z3F1wwl2Wj8E",
    authDomain: "javascript-final-8249d.firebaseapp.com",
    projectId: "javascript-final-8249d",
    storageBucket: "javascript-final-8249d.appspot.com",
    messagingSenderId: "873780868245",
    appId: "1:873780868245:web:cd35cd34473bec1b7d579c"
};

firebase.initializeApp(firebaseConfig)

// utilities

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collections

const usersCollection = db.collection('users')
const itemsCollection = db.collection('items')

export {
    db,
    auth,
    storage,
    usersCollection,
    itemsCollection
}