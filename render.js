// var config = {
//     apiKey: "AIzaSyAXVopqYljuSO7daP1nIN_glMoxhT-fPCE",
//     authDomain: "jira-app-c98dc.firebaseapp.com",
//     databaseURL: "https://jira-app-c98dc.firebaseio.com",
//     projectId: "jira-app-c98dc",
//     storageBucket: "",
//     messagingSenderId: "1040391233034"
//   };
//   firebase.initializeApp(config);
//   var signUp=document.getElementById('submit');

//   signUp.addEventListener('click',function(){
//   	var email=document.getElementById('email').value;
//   	var password=document.getElementById('password').value;
//   	firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
//   		if(error!=null){
//   			console.log(error.message);
//   			return;
//   		}
//   	});
//   	$("#sign_up_page").fadeOut();
//   });

//   var signUp_page=document.getElementById("new_register");

//   signUp_page.addEventListener('click',function(){
//   	$("#sign_up_page").fadeIn();
//   });	
//   $("#back").on('click',function(){
//   	$("#sign_up_page").fadeOut();
//   });

//   $("#submit_sign").on('click',function(){
//   	firebase.auth().signInWithEmailAndPassword($("#email_sign").val(),$("#Password_sign").val()).then(function(){
//   		document.location.href="today.html";
//   	}).catch(function(err){
//   		if(err!=null){
//   			console.log(err.message);
//   			return;
//   		}
//   	})
//   });