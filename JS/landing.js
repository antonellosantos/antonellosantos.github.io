const username = document.querySelector('#username');
const password = document.querySelector('#password');
const userForm = document.querySelector('#form');

form.addEventListener('submit', submitForm)

function submitForm(e){
    e.preventDefault();

    if(username.value == "admin" && password.value == "p@ssword"){
        console.log('success')
        window.location = "LandingPage.html"
    }
    else if(username.value == '' || password.value == ''){
        alert('Please input fields')
        console.log("empty")
    }
    else{
        alert('Wrong username/password')
    }

    username.value = '';
    password.value = '';
}
