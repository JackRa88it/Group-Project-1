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

// var currentUser;

// FUNCTIONS
// ----------------------

function buildNote(pushKey, text) {

    var card = $('<div>');
    card.attr({'class':'card', 'id':'note' + pushKey});
    var cardBody = $('<div>');
    cardBody.attr('class', 'card-body note-card');
    var row = $('<div>');
    row.attr('class', 'row');
    var textCol = $('<div>');
    textCol.attr('class', 'col-10 my-auto');
    textCol.text(text);
    var buttonCol = $('<div>');
    buttonCol.attr('class', 'col-2');
    var button = $('<button>');
    button.attr({'type':'button', 'class':'btn btn-light', 'id':'delButton', 'value':pushKey, 'style':'float:right; height:38px; color:green;'});
    button.text('X');

    card.append(cardBody);
    cardBody.append(row);
    row.append(textCol, buttonCol);
    buttonCol.append(button);
    $('#notesList').append(card);

};


// EVENT HANDLERS/CALLS
// ----------------------

// sign up new users
$('#signUpButton').on('click', function(event) {

  event.preventDefault();

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
  }).then(function(authReturn) {
    var newUser = authReturn.user;
    database.ref().on('value', function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val().userID == newUser.uid){
          buildNote(childSnapshot.key, childSnapshot.val().noteText);
        }
      })
      
    })
  });


});

// sign in existing users
$('#signInButton').on('click', function(event) {
  event.preventDefault();
  var email = $('#InputEmail').val().trim();
  var password = $('#InputPassword').val().trim();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  }).then(function(authReturn) {
    var newUser = authReturn.user;
    database.ref().on('value', function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val().userID == newUser.uid){
          buildNote(childSnapshot.key, childSnapshot.val().noteText);
        }
      })
      
    })
  });

});

// sign out user
$('#signOutButton').on('click', function(event) {

  event.preventDefault();

  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    // reload page to get login modal again
    location.reload();
  }, function(error) {
    console.error('Sign Out Error', error);
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
    // assignUser(uid);
    // ...
  } else {
    // User is signed out, show login modal
    $('#loginModal').modal('show');
  }
});

// refresh notes list on child added
database.ref().on('child_added', function(snapshot) {
  if (snapshot.val().userID == firebase.auth().currentUser.uid) {
    buildNote(snapshot.key, snapshot.val().noteText);
  }
  else {};
});

// add note button
$('#AddNoteButton').on('click', function(event) {

  event.preventDefault();

  var userID = firebase.auth().currentUser.uid;
  var noteText = $('#InputNote').val().trim();

  // console.log(userID);
  // console.log(noteText);

  database.ref().push({
    userID: userID,
    noteText: noteText
  });

  $('#InputNote').val('');
  
});

// delete note button
$('#notesList').on('click', '#delButton', function(event) {

  event.preventDefault();


  database.ref().child(this.value).remove().then(function(){
    console.log('removed');
  });

  $('#note' + this.value).remove();
  $('#InputNote').val('');

});

// small card size = 500x250

// ISSUES REMAINING
// sign out button pushes title to the left
// cannot override css for note-card height
// cannot override clicking of card navigating to detail
// detail view dynamically writes innerHTML, so all javascript needs delegated event listeners