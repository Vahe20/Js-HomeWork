// fetch("http://localhost:3000", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         fullName: "Vahe Ghazaryan",
//         email: "vaheghazaryan122@gmail.com",
//         age: 20,
//     })
// })

// fetch("http://localhost:3000", {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json"
//     }
// }).then(res => res.json()).then(data => {
//     console.log(data)
// }).catch(err => console.log(err))

const registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const age = document.getElementById("age");

    fetch("http://158.220.101.27:7901/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(data => {
        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].email === email.value) {
                alert("User already exists");
                return;
            }
        }
        if (fullName.value && email.value && age.value) {
            fetch("http://158.220.101.27:7901/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: fullName.value,
                    email: email.value,
                    age: age.value,
                })
            }).then(res => res.json()).then(data => {
                console.log(data)
            }).catch(err => console.log(err))
        }
    }).catch(err => console.log(err))
})