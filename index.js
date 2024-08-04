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
            <button onclick="editEntry(${entry.id}, '${entry.name}', '${entry.phone}', '${entry.email}')">Edit</button><br/>
            <button onclick="deleteEntry(${entry.id})">Delete</button>
          `;
          displayArea.appendChild(newEntry);
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // Fetch data when DOM is loaded
  fetchData();

  const defaultFormSubmit = (event) => {
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
        fetchData();
        form.reset();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // Set the default form submit handler
  form.addEventListener("submit", defaultFormSubmit);

  window.deleteEntry = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log('Data Deleted Successfully');
        
        fetchData();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  window.editEntry = (id, name, phone, email) => {
    document.getElementById("username").value = name;
    document.getElementById("phone").value = phone;
    document.getElementById("email").value = email;

    form.removeEventListener("submit", defaultFormSubmit);

    const editFormSubmit = (event) => {
      event.preventDefault();

      let updatedName = document.getElementById("username").value;
      let updatedPhone = document.getElementById("phone").value;
      let updatedEmail = document.getElementById("email").value;

      axios.put(`http://localhost:3000/update/${id}`, {
        name: updatedName,
        phone: updatedPhone,
        email: updatedEmail,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        fetchData();
        form.reset();
        form.removeEventListener("submit", editFormSubmit);
        form.addEventListener("submit", defaultFormSubmit);
      })
      .catch((err) => {
        console.log("error", err);
      });
    };

    form.addEventListener("submit", editFormSubmit);
  };
});