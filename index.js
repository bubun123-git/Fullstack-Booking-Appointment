document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("appointmentForm");

  const fetchData = () => {
    axios
      .get("http://localhost:3000/appointments")
      .then((response) => {
        let displayArea = document.getElementById("displayArea");
        displayArea.innerHTML = ''; 
        response.data.forEach((entry) => {
          let newEntry = document.createElement("div");
          newEntry.innerHTML = `<p>Name: ${entry.name}</p><p>Phone: ${entry.phone}</p><p>Email: ${entry.email}</p>`;
          displayArea.appendChild(newEntry);
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // Fetch data when DOM is loaded
  fetchData();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let name = document.getElementById("username").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;

    axios
      .post("http://localhost:3000/submit", {
        name: name,
        phone: phone,
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });
});
