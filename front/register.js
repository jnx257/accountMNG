async function registerAc () {
    const name = document.getElementById('name').value
    const email = document.getElementById('login').value
    const password = document.getElementById("password").value
    const confirmPass = document.getElementById("confPassword").value
    const body = JSON.stringify({
        name: name,
        email: email,
        password:password,
        confirmPassword: confirmPass,
    })

    fetch("http://localhost:8080/auth/register", {
        method: "POST",
        body:body,
        headers: {
            "Content-Type": "application/json",
        },
    })

    .then((response)=> response.json)
    .then(data => {
            console.log("account registered sucessfully", data)
            const loginPopup = document.querySelector(".PopUp");
            loginPopup.style.display = "block";
            setTimeout(() => (loginPopup.style.display = "none"), 5000);
            console.log(body)
    })
    .catch((err) => console.log(err) )
}

document.getElementById("registerButton").addEventListener("click", registerAc );
