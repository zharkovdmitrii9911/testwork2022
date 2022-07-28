var RegistrationFormError = document.getElementById('RegistrationFormError');
var RegistrationFormSuccess = document.getElementById('RegistrationFormSuccess');
var AuthorizationFormError = document.getElementById('AuthorizationFormError');
var AuthorizationFormSuccess = document.getElementById('AuthorizationFormSuccess');

let userGlobal = {     
  name: "",  
  userLogIn: ""       
};

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

if (getCookie("name")!=undefined) 
if (getCookie("name")!="")
{
  let name = getCookie('name', json=true);
  let login = getCookie('userLogIn', json=true) 
  userGlobal.name = name;
  userGlobal.userLogIn = login;
  UserLogIn(userGlobal.name);
}
function CookiesDelete() {
  var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        setCookie(name, "", {expires: -1})
    }
}
function InputCheck() {
  var login = document.getElementById('RegistrationLogin').value;
  var Name = document.getElementById('RegistrationName').value;
  var Email = document.getElementById('RegistrationEmail').value;
  var Pass = document.getElementById('RegistrationPass').value;
  var Pass1 = document.getElementById('RegistrationPass1').value;
  var Button = document.getElementById('RegistrationSend');
  
  var Passisre = /^(?=.*\d)(?=.*?[a-zA-Z]).{6,30}$/;
  var PassisValid = Passisre.test(Pass);  
  var loginre =/(?=.*\S).{6,30}/;
  var loginisValid = loginre.test(login);
  var Namere =/(?=.*\S).{1,30}/;
  var NameisValid = Namere.test(Name);
  var Emailre = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; 
  var EmailisValid = Emailre.test(Email);
  var confirm_password = false;
  var errormassege="";
  if (Pass==Pass1) {
    confirm_password= true;
  }else{
    confirm_password= false;
    errormassege+= ("Пароли не совпадают");
  }    
  if (PassisValid&&loginisValid&&NameisValid&&EmailisValid&&confirm_password) {
    Button.disabled=false;
  }else
  {Button.disabled=true;}
  
  if (!PassisValid) {
    errormassege+= ("<br>Этот пароль не подходит")
  }
  if (!loginisValid) {
    errormassege+= ("<br>Этот логин не подходит <br> минимум 6 символов")
  }
  if (!NameisValid) {
    errormassege+= ("<br>Этот имя не подходит <br> минимум 2 символов")
  }
  if (!EmailisValid) {
    errormassege+= ("<br>Неправильное написание почты, пожалуйста проверьте")
  }


  RegistrationFormError.innerHTML = errormassege
  console.log("Pass1 ="+Pass);
  console.log("Pass2 ="+Pass1);
  console.log("PassisValid ="+PassisValid);
  console.log("loginisValid ="+loginisValid);
  console.log("NameisValid ="+NameisValid);
  console.log("EmailisValid ="+EmailisValid);
}

function UserLogOut() {
  CookiesDelete();
  LogIn = document.getElementById("UnlogInFormButton");
  LogIn.classList.remove("UnVivible");
  LogOut = document.getElementById("logInFormButton");
  LogOut.classList.add("UnVivible");
  var HeaderPanel = document.getElementById('HeaderInform');
  HeaderPanel.innerHTML = "";
  
}
function UserLogIn(userLogIn) {
  forms = document.getElementsByClassName("container");
  for (let index = 0; index < forms.length; index++) {
    if (forms[index].classList.contains("formVisibility")) {
      forms[index].classList.remove("formVisibility");
    } 
  }
  LogIn = document.getElementById("UnlogInFormButton");
  LogIn.classList.add("UnVivible");
  LogOut = document.getElementById("logInFormButton");
  LogOut.classList.remove("UnVivible");
  var HeaderPanel = document.getElementById('HeaderInform');

  HeaderPanel.innerHTML = "Здравствуйте "+userLogIn+" ";
  

}

function FormShowSwich(FormShowingId,FormHiddenId) {
    FormShowing = document.getElementById(FormShowingId);
    FormHidden = document.getElementById(FormHiddenId);
    FormShowing.classList.toggle("formVisibility");
    FormHidden.classList.remove("formVisibility");
    AuthorizationFormError.innerHTML ="";
    AuthorizationFormSuccess.innerHTML="";
    RegistrationFormError.innerHTML="";
    RegistrationFormSuccess.innerHTML="";   
}




document.addEventListener("DOMContentLoaded",function() {

    var buttonRegistration = document.getElementById('RegistrationSend');

    buttonRegistration.addEventListener("click", function(){
        var login = document.getElementById('RegistrationLogin').value;
        var Name = document.getElementById('RegistrationName').value;
        var Email = document.getElementById('RegistrationEmail').value;
        var Pass = document.getElementById('RegistrationPass').value;

        Send ='Login=' + encodeURIComponent(login)+
        '&Name='+encodeURIComponent(Name)+
        '&Email='+encodeURIComponent(Email)+
        '&Pass='+encodeURIComponent(Pass)+'&Operation=registration';
        console.log(Send);
        var request = new XMLHttpRequest();
        request.open('POST','phpFiles/action.php',true);
        request.addEventListener('readystatechange', function() {
            if ((request.readyState==4) && (request.status==200)) {         
             console.log(request);
             console.log(request.responseText);
             console.log(request.responseText=='Error');
              if (request.responseText=='Error') {
                RegistrationFormError.innerHTML = ("Ошибка, возможно на такой логин уже зарегестирован аккаунт");
              }else
              {
                RegistrationFormSuccess.innerHTML=("Регистрация проведина успешно");
              }
              console.log(request.responseText);
            }
        });
         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
        request.send(Send);
    });
  });

  document.addEventListener("DOMContentLoaded",function() {

    var buttonAuthorization = document.getElementById('AuthorizationSend');

    buttonAuthorization.addEventListener("click", function(){
        var login = document.getElementById('AuthorizationLogin').value;

        var Pass = document.getElementById('AuthorizationPass').value;

        Send ='Login=' + encodeURIComponent(login)+
        '&Pass='+encodeURIComponent(Pass)+'&Operation=authorization';
        console.log(Send);
        var request = new XMLHttpRequest();
        request.open('POST','phpFiles/action.php',true);
        request.addEventListener('readystatechange', function() {
            if ((request.readyState==4) && (request.status==200)) {  
              console.log(request.responseText);
              if (request.responseText=='Error') {
                AuthorizationFormError.innerHTML = ("Ошибка, проверьте логин и пароль");
              }else
              {
                AuthorizationFormSuccess.innerHTML=("Авторизация проведина успешно");
                console.log(request.responseText);
                  user = JSON.parse(request.responseText);
                  
                  userGlobal.name = user.name;
                  userGlobal.userLogIn = user.LogIn;
                  setCookie('name', userGlobal.name,7);
                  setCookie('userLogIn', userGlobal.userLogIn,7);
                  
                  
                  UserLogIn(userGlobal.name);
                
              }
            }
        });
         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(Send);
    });
  });
  function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


  