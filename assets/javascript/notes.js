// this js file is just for the personal notes/checklists feature
// made by Jack K

// GLOBAL VARIABLES
// ----------------------

// initialize firebase
var config = {
  apiKey: "AIzaSyD8jTGozVGNENJk8JbzPb22Z_6S2fUc_m8",
  authDomain: "group-project-1-6eee4.firebaseapp.com",
  databaseURL: "https://group-project-1-6eee4.firebaseio.com",
  projectId: "group-project-1-6eee4",
  storageBucket: "",
  messagingSenderId: "1034102183779"
};
firebase.initializeApp(config);
var database = firebase.database();



// FUNCTIONS
// ----------------------





// EVENT HANDLERS/CALLS
// ----------------------

// sign up new users
$('#SignUpButton').on('click', function(event) {

  event.preventDefault();

  console.log('sign up clicked');

  var email = $('#InputEmail').val().trim();
  var password = $('#InputPassword').val().trim();

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('error');
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });

});

// sign in existing users
$('#SignUpButton').on('click', function(event) {

  event.preventDefault();

  var email = $('#InputEmail').val().trim();
  var password = $('#InputPassword').val().trim();

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

});

// authentication state observer gets user data
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;

    console.log(displayName);
    console.log(email);
    console.log(emailVerified);
    console.log(photoURL);
    console.log(isAnonymous);
    console.log(uid);
    console.log(providerData);
    // ...
  } else {
    // User is signed out.
    // ...
  }
});