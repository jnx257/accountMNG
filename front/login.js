async function loginDB() {
  const email = document.getElementById("login").value;
  const password = document.getElementById("password").value;
  const body = JSON.stringify({ email: email, password: password });

  console.log(body);

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("connected in DB", data);
  } catch (err) {
    console.log(`error: ${err}`);
  }
}

document.getElementById("loginButton").addEventListener("click", loginDB);
