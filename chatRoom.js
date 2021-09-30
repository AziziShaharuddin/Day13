
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSck9gfhY7OWekS2-BENrb166hBzTj5Tw",
  authDomain: "chat-room-31e56.firebaseapp.com",
  databaseURL: "https://chat-room-31e56-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-room-31e56",
  storageBucket: "chat-room-31e56.appspot.com",
  messagingSenderId: "229289612929",
  appId: "1:229289612929:web:5c6e5e34c4e011e3071f80"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

var nameInput = document.getElementById('name-input');
var message = document.getElementById('msg-input');
var chatBox = document.getElementById('chat-holder');
var chatRoom = document.getElementById('chat-room');

var userName = localStorage.getItem("name");
console.log(userName);

//get data from firebase when start the page
firebase.database().ref('chat').child('message').on('child_added', function(snapshot) {
    console.log(snapshot.val());
    var nameVal = snapshot.val().name; //string
    var msgVal = snapshot.val().msg; //string
    var nowDate = snapshot.val().date; //To include time as well

    //create element when firebase has new child
    var chatBox = document.createElement('div');
    chatBox.classList.add('chat-box');
    if (nameVal === userName) {
        chatBox.classList.add('self');
    }

    var nameText = document.createElement('h4'); //create element h5 for the name
    nameText.classList.add('name-text');
    nameText.innerHTML = nameVal;

    var msgText = document.createElement('p'); //create element p for the message
    msgText.classList.add('msg-text');
    msgText.innerHTML = msgVal;

    var dateText = document.createElement('p'); //create element p for the time
    dateText.classList.add('time-chat');
    dateText.innerHTML = nowDate; 

    chatBox.append(nameText);
    chatBox.append(msgText);
    chatBox.append(nowDate);

    chatRoom.append(chatBox);

    chatRoom.scrollTo(0, chatRoom.scrollHeight)
})


function sendMsg() {
    console.log(message.value);
    if (message.value != '') {
        var dateToday = new Date ();
        var todayDateString = dateToday.toTimeString().slice(0,8);

        firebase.database().ref('chat').child('message').push({
            name: userName, //name
            msg: message.value, //message
            date: todayDateString //time
        })
    }
    //push data and store in database
    
//    userName = '';
   message.value = '';
}