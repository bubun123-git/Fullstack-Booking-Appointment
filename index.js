document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("appointmentForm");

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
