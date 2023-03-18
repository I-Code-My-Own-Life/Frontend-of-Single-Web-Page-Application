const tab_swichers = document.querySelectorAll("[data-switcher]");

for (let i = 0; i < tab_swichers.length; i++) {
    const tab_switcher = tab_swichers[i];
    const page_id = tab_switcher.dataset.tab;
    tab_switcher.addEventListener("click", () => {
        const tab = document.querySelector(".tabs .tab.is-active");
        tab.classList.remove("is-active");
        tab_switcher.parentNode.classList.add("is-active");
        Switch_page(page_id);
    })
}

function Switch_page(id) {
    const currentPage = document.querySelector(".pages .page.is-active");
    currentPage.classList.remove("is-active");
    const nextPage = document.querySelector(`.pages .page[data-page="${id}"]`);
    nextPage.classList.add("is-active");
}

// Registration alert box : 
const alertBox = document.querySelector('.alert');
// Login alert box : 
const alertBoxLogin = document.querySelector('.alertLogin');
// Account info edit alert : 
const alertAccountEdit = document.getElementById("alertAccountEdit");
// Function to close the alert
function closeAlert() {
    alert.style.display = 'none';
}

// Get the registration form 
const form = document.querySelector('#registration-form');

// Adding event listener to registration form : 
form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default form submission
    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                alertBox.style.display = "block";
                alertBox.style.backgroundColor = '#f44336';
                alertBox.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> <strong>Success!</strong> User registered.';
                event.target.reset();
            } else if (response.status === 'error') {
                alertBox.style.display = "block";
                alertBox.style.backgroundColor = '#f44336';
                alertBox.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span><strong>Error occured!</strong>Please try again.';
            } else if (response.status === 'username_taken') {
                alertBox.style.display = "block";
                alertBox.style.backgroundColor = '#f44336';
                alertBox.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span><strong>Error!</strong> Email already exists.';
            }
        } else {
            window.alert('Request failed. Please try again.');
        }
    };
    xhr.send(JSON.stringify(Object.fromEntries(formData)));
});

// Get the login form 
const loginForm = document.querySelector('#login-form');

// Adding event listener to login form : 
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default form submission
    const formData = new FormData(loginForm);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            const response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                alertBoxLogin.style.display = "block";
                alertBoxLogin.style.backgroundColor = '#f44336';
                alertBoxLogin.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> <strong>Success!</strong> User logged in.';
                event.target.reset();
                setTimeout(() => {
                    location.reload();
                }, 1000)
            } else if (response.status === 'wrong_password') {
                alertBoxLogin.style.display = "block";
                alertBoxLogin.style.backgroundColor = '#f44336';
                alertBoxLogin.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span><strong>Error occured!</strong> Wrong password';
            }
            else if (response.status === 'error') {
                alertBoxLogin.style.display = "block";
                alertBoxLogin.style.backgroundColor = '#f44336';
                alertBoxLogin.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span><strong>Error occured !</strong> Please try again.';
            } else if (response.status === 'email_does_not_exist') {
                alertBoxLogin.style.display = "block";
                alertBoxLogin.style.backgroundColor = '#f44336';
                alertBoxLogin.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span><strong>Error!</strong> Email does not exist.';
            }
        } else {
            console.log(xhr.status);
            alertBoxLogin.style.display = "block";
            alertBoxLogin.style.backgroundColor = '#f44336';
            alertBoxLogin.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span><strong>Error!</strong> Invalid Credentials.';
        }
    };
    xhr.send(JSON.stringify(Object.fromEntries(formData)));
});

// Getting account_info form : 
const account_info_form = document.getElementById("account_info_form");
let updateData = true;
// Adding event listener to account info edit form : 
account_info_form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(account_info_form);
    let obj = Object.fromEntries(formData);
    for (const key in obj) {
        if (obj[key] == "") {
            let inp = document.getElementById(key);
            inp.value = inp.placeholder;
            updateData = false;
        }
        else {
            updateData = true;
            break;
        }
    }
    formData = new FormData(account_info_form);
    if (updateData) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    alertAccountEdit.style.display = "block";
                    alertAccountEdit.style.backgroundColor = '#f44336';
                    alertAccountEdit.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> <strong>Changes successful!</strong> Please log out and sign in again .';
                    event.target.reset();
                } else if (response.status === 'error') {
                    alertAccountEdit.style.display = "block";
                    alertAccountEdit.style.backgroundColor = '#f44336';
                    alertAccountEdit.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> <strong>Email already exists! </strong>Choose another one ';
                } else if (response.status === 'email_already_exists') {
                    alertAccountEdit.style.display = "block";
                    alertAccountEdit.style.backgroundColor = '#f44336';
                    alertAccountEdit.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> <strong>Email already exists! </strong>Choose another one ';
                }
            }
            else {
                alertBoxLogin.style.display = "block";
                alertBoxLogin.style.backgroundColor = '#f44336';
                alertBoxLogin.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span><strong>Error!</strong> Invalid Credentials.';
            }
        };
        obj = Object.fromEntries(formData);
        for (const key in obj) {
            if (obj[key] == "") {
                let inp = document.getElementById(key);
                obj[key] = inp.placeholder;
            }
            
        }
        console.log(obj);
        xhr.send(JSON.stringify(obj));
    }
    else {
        alertAccountEdit.style.display = "block";
        alertAccountEdit.style.backgroundColor = '#f44336';
        alertAccountEdit.innerHTML = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> <strong>Enter the details that you want to change. </strong>';
    }
})