
async function loginDB () {
    const login = document.getElementById('login')
    const password = document.querySelector('password')
    const body = {login: login, password: password}

    fetch('http://localhost:8080/auth/login', {
        method:"POST",
        body: body
    }) 
    .then((response)=> response.json)
    .then(console.log('connected in DB'))
    .catch((err)=>console.log(`error:${err}`))
}

document.getElementById("loginButton").addEventListener("click",loginDB)

loginDB()