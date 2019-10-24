document.querySelector('.img__btn').addEventListener('click', function() {
  document.querySelector('.cont').classList.toggle('s--signup');
});
   
function User(){
this.data = [];
this.errors = [];
this.msg = {}
}
//MODAL PROTOTYPES
User.prototype = {
init:function(){
this.data = JSON.parse(localStorage.getItem('users')) != null ? JSON.parse(localStorage.getItem('users')): []
console.log(this.data);
},
save: function(user){
var existUser = this.data.find(function(usr){
return usr.email == user.email
})
if(existUser){
this.errors.push({error:'This email already exist'})
}
if(this.errors.length > 0){
this.msg.errors = this.errors
return this.msg;
}else{
this.data.push(user)
localStorage.setItem('users', JSON.stringify(this.data))
this.msg.success = true
this.msg.data = user
return this.msg
}
},
login: function(user){
console.log(user);
}
}
function UI(){
this.selectors = {
registerForm: document.getElementById('signup-form'),
loginForm: document.getElementById('login-form'),
name:document.getElementById('name'),
email:document.getElementById('email'),
pass:document.getElementById('password'),
cpass:document.getElementById('cpassword'),
loginEmail: document.getElementById('l-email'),
loginPass: document.getElementById('l-password'),
loginid: document.getElementById('youare'),
registerErrors: document.querySelector('.textbox'),
successMsg: document.querySelector('.success-msg'),
}
}

UI.prototype = {
registerHandler: function(){
var user = {
name:this.selectors.name.value,
email:this.selectors.email.value,
pass:this.selectors.pass.value,
}
return user
},
init:function(){
console.log('ui init');
this.selectors.loginContainer.style.display = 'none';
},
loginHandler: function(){
var loginData = {
email:this.selectors.loginEmail.value,
pass:this.selectors.loginPass.value,
loginid:this.selectors.loginid.value,
}
return loginData
},
getErrors: function(errorsArray){
var errors = ''
errorsArray.forEach(function(err){
errors += '<li>' + err.error + '</li>'
})
this.selectors.registerErrors.innerHTML = errors;
},
getSuccessMsg: function(msg){
this.selectors.successMsg.innerHTML = msg
this.selectors.name.value = ''
this.selectors.email.value = ''
this.selectors.pass.value = ''
},
showLoginHandler:function(){
if(this.selectors.successMsg.textContent.length > 0){
this.showLogin()
this.selectors.registerContainer.style.display = 'none'
}
},
showLogin: function(){
this.selectors.loginContainer.style.display = 'block'
}
}
//APP CONTROLLER
function App(userCtrl, UICtrl){
var ui = new UICtrl()
var user = new userCtrl()
ui.selectors.registerForm.addEventListener('submit', function(e){
e.preventDefault()
var userData = ui.registerHandler()
var result = user.save(userData)
if(result.errors){
ui.getErrors(result.errors)
}else{
if(result.success){
ui.getSuccessMsg('user registered successfully!')
ui.showLoginHandler()
}
}
})
ui.selectors.loginForm.addEventListener('submit', function(e){
var userLoginData = ui.loginHandler();
e.preventDefault()
user.login(userLoginData)
})
ui.init()
user.init()
}
//APP INIT
App(User, UI)
