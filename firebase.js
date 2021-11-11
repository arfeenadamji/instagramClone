import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyACmDUBXa-L5-hRew9JYwtHbRefj19ANjc",
  authDomain: "instagram-dev-be67f.firebaseapp.com",
  projectId: "instagram-dev-be67f",
  storageBucket: "instagram-dev-be67f.appspot.com",
  messagingSenderId: "65439395486",
  appId: "1:65439395486:web:3a33866ae0ec10225c958f",
  measurementId: "G-406YYPD17B"
};

if(firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig)
}

export default firebase;