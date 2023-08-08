async function loginDB() {
  const email = document.getElementById("login").value;
  const password = document.getElementById("password").value;
  const body = JSON.stringify({ email: email, password: password });

  fetch('http://localhost:8080/auth/login',
  {method: "POST",
   body: body,
   headers: {
    "Content-Type": "application/json",
  }})
  .then((response)=> response.json)
  .then(data => console.log("login auth", data))
  .catch((error)=> console.log(error))
}

document.getElementById("loginButton").addEventListener("click", loginDB);
