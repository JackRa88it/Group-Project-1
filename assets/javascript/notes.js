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
  // create regular note
  var card = $('<div>');
  card.attr({'class':'card note-card', 'id':'note' + pushKey});
  var cardBody = $('<div>');
  cardBody.attr('class', 'card-body note-body');
  var row = $('<div>');
  row.attr('class', 'row');
  var textCol = $('<div>');
  textCol.attr('class', 'col-10 my-auto');
  textCol.text(text);
  var buttonCol = $('<div>');
  buttonCol.attr('class', 'col-2');
  var button = $('<button>');
  button.attr({'type':'button', 'class':'btn btn-light delButton', 'value':pushKey});
  button.text('X');
  card.append(cardBody);
  cardBody.append(row);
  row.append(textCol, buttonCol);
  buttonCol.append(button);
  $('#notesList').append(card);

  // create detail note
  var dCard = $('<div>');
  dCard.attr({'class':'card note-card', 'id':'dNote' + pushKey});
  var dCardBody = $('<div>');
  dCardBody.attr('class', 'card-body note-body');
  var dRow = $('<div>');
  dRow.attr('class', 'row');
  var dTextCol = $('<div>');
  dTextCol.attr('class', 'col-10 my-auto');
  dTextCol.text(text);
  var dButtonCol = $('<div>');
  dButtonCol.attr('class', 'col-2');
  var dButton = $('<button>');
  dButton.attr({'type':'button', 'class':'btn btn-light delButton', 'value':pushKey});
  dButton.text('X');
  dCard.append(dCardBody);
  dCardBody.append(dRow);
  dRow.append(dTextCol, dButtonCol);
  dButtonCol.append(dButton);
  $('#detailNotesList').append(dCard);
};

function logInOutButton() {
  if (firebase.auth().currentUser) {
    $('#logInOutButton').text('Log Out');
  }
  else {
    $('#logInOutButton').text('Log In');
  };
};


// EVENT HANDLERS/CALLS
// ----------------------

// sign up new users
$('#modalSignUpButton').on('click', function(event) {

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
$('#modalLogInButton').on('click', function(event) {
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
$('#logInOutButton').on('click', function(event) {

  event.preventDefault();

  // if for log in/out
  if (firebase.auth().currentUser) {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      // reload page to get login modal again
      location.reload();
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }
  else {
    $('#loginModal').modal('show');
  }

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
    // User is signed out
  }

  logInOutButton();

});

// refresh notes list on child added
database.ref().on('child_added', function(snapshot) {
  if (firebase.auth().currentUser) {
    if (snapshot.val().userID == firebase.auth().currentUser.uid) {
      buildNote(snapshot.key, snapshot.val().noteText);
    };
  };
});

// add note button
$('#AddNoteButton').on('click', function(event) {

  event.preventDefault();

  var userID = firebase.auth().currentUser.uid;
  var noteText = $('#InputNote').val().trim();

  if (noteText === "") {
    $('#InputNote').attr('class', 'form-control emptyNoteWarning');
  }
  else {

    $('#InputNote').attr('class', 'form-control');
    database.ref().push({
      userID: userID,
      noteText: noteText
    });

    $('#InputNote').val('');
  };
});

// add note button from detail view
$('#detailAddNoteButton').on('click', function(event) {

  event.preventDefault();

  var userID = firebase.auth().currentUser.uid;
  var noteText = $('#detailInputNote').val().trim();

  if (noteText === "") {
    $('#detailInputNote').attr('class', 'form-control emptyNoteWarning');
  }
  else {

    $('#detailInputNote').attr('class', 'form-control');
    database.ref().push({
      userID: userID,
      noteText: noteText
    });

    $('#detailInputNote').val('');
  };
});


// delete note button
$('#notesList, #detailNotesList').on('click', '.delButton', function(event) {

  event.preventDefault();


  database.ref().child(this.value).remove().then(function(){
    console.log('removed');
  });

  $('#note' + this.value).remove();
  $('#dNote' + this.value).remove();
  $('#InputNote').val('');

});



// small card size = 500x250

// ISSUES REMAINING
// sign out button pushes title to the left
// new note duplicates list (happens sometimes...)
// validation 
// 
// toggling sign in-out button
// fix the double append

