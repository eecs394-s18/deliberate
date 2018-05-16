var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBqEixniLoO-4iR_g3NZIRuR0x41TYEnbE",
    authDomain: "deliberate-355d4.firebaseapp.com",
    databaseURL: "https://deliberate-355d4.firebaseio.com",
    projectId: "deliberate-355d4",
    storageBucket: "deliberate-355d4.appspot.com",
    messagingSenderId: "139874346562"
};

firebase.initializeApp(config);

export default firebase;