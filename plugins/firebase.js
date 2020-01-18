// firebaseドキュメント
// [参考]https://firebase.google.com/docs/web/setup?authuser=0#config-object

// must
import firebase from "firebase/app"
// optional
import "firebase/auth"
import "firebase/firestore"

// firebase の準備が出来ている場合のみに設定
if (!firebase.apps.length) {
  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAahWf2BRRa00FRVrKpvUR-PWDinAUlkEk",
    authDomain: "chatapp-14d50.firebaseapp.com",
    databaseURL: "https://chatapp-14d50.firebaseio.com",
    projectId: "chatapp-14d50",
    storageBucket: "chatapp-14d50.appspot.com",
    messagingSenderId: "271605846019",
    appId: "1:271605846019:web:b72b9c66cda2638a99be36",
    measurementId: "G-C3E8LMPK6Q"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()

// 外部ファイルで使用
export { firebase, db }
