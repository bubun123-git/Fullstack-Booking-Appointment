document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("appointmentForm");

  const fetchData = () => {
    axios
      .get("http://localhost:3000/appointments")
      .then((response) => {
        let displayArea = document.getElementById("displayArea");
        displayArea.innerHTML = "";
        response.data.forEach((entry) => {
          let newEntry = document.createElement("div");
          newEntry.innerHTML = `
            <p>Name: ${entry.name}</p>
            <p>Phone: ${entry.phone}</p>
            <p>Email: ${entry.email}</p>
            <button onclick="editEntry(${entry.id}, '${entry.name}', '${entry.phone}')">Edit</button>
            <button onclick="deleteEntry(${entry.id})">Delete</button>
          `;
          displayArea.appendChild(newEntry);
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  
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

//delete
window.deleteEntry = (id) => {
  axios
    .delete(`http://localhost:300/delete/${id}`)
    .then((res) => {
      console.log(res.data);
      fetchData();
    })
    .catch((err) => {
      console.log("error", err);
    });
};

//edit
window.editEntry = (id, name, phone, email) => {
  document.getElementById("username").value = name;
  document.getElementById("phone").value = phone;
  document.getElementById("email").value = email;

  let form = document.getElementById("appointmentForm");
  form.onsubmit = (event) => {
    event.preventDefault();

    let updatedName = document.getElementById("username").value;
    let updatedPhone = document.getElementById("phone").value;
    let updatedEmail = document.getElementById("email").value;

    axios
      .put(`http://localhost:3000/update/${id}`, {
        name: updatedName,
        phone: updatedPhone,
        email: updatedEmail,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        fetchData();
        form.onsubmit = null; // Reset form submission
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
