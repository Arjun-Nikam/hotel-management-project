function getFormData() {
  const form = document.getElementById("hotelForm");
  const formData = new FormData(form);

  return {
    aadhar: Number(formData.get("aadhar")),
    name: formData.get("name"),
    email: formData.get("email"),
    phn: formData.get("phn"),
    roomNo: formData.get("roomNo"),
    fromDate: formData.get("checkin"),   // ✅ updated
    toDate: formData.get("checkout"),    // ✅ updated
    payment: formData.get("payment")
  };
}

function addData() {
  const data = getFormData();

  fetch("/hotel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(msg => {
      alert("✅ " + msg);
      document.getElementById("hotelForm").reset();
      fetchAll();
    });
}

function updateData() {
  const aadhar = document.getElementById("hotelForm").aadhar.value;
  if (!aadhar) return alert("Enter Aadhar to update!");

  const form = document.getElementById("hotelForm");
  const saveBtn = document.getElementById("saveUpdateBtn");

  saveBtn.classList.add("hidden");
  form.querySelectorAll("input, button").forEach(el => el.disabled = true);

  fetch(`/hotel/aadhar/${aadhar}`)
    .then(res => {
      if (!res.ok) throw new Error(`No booking found with Aadhar: ${aadhar}`);
      return res.json();
    })
    .then(data => {
      if (!data || Object.keys(data).length === 0) {
        throw new Error("Empty response for the given Aadhar.");
      }

      form.name.value = data.name || "";
      form.email.value = data.email || "";
      form.phn.value = data.phn || "";
      form.roomNo.value = data.roomNo || "";
      form.checkin.value = data.fromDate ? data.fromDate.substring(0, 16) : "";   // ✅ updated
      form.checkout.value = data.toDate ? data.toDate.substring(0, 16) : "";       // ✅ updated
      form.payment.value = data.payment || "";

      saveBtn.classList.remove("hidden");
      alert("✏️ Booking loaded. You can now edit and save.");
    })
    .catch(err => alert("❌ " + err.message))
    .finally(() => {
      form.querySelectorAll("input, button").forEach(el => el.disabled = false);
    });
}

function saveUpdatedData() {
  const data = getFormData();

  fetch(`/hotel/update/${data.aadhar}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    })
    .then(() => {
      alert("✅ Changes saved successfully!");
      document.getElementById("hotelForm").reset();
      document.getElementById("saveUpdateBtn").classList.add("hidden");
      fetchAll();
    })
    .catch(err => alert("❌ " + err.message));
}

function deleteData() {
  const aadhar = document.getElementById("hotelForm").aadhar.value;
  if (!aadhar) return alert("Enter Aadhar to delete!");

  if (!confirm("Are you sure you want to delete this booking?")) return;

  fetch(`/hotel/delete/${aadhar}`, {
    method: "DELETE"
  })
    .then(res => res.text())
    .then(msg => {
      alert("🗑️ " + msg);
      document.getElementById("hotelForm").reset();
      fetchAll();
    });
}

function findData() {
  const aadhar = document.getElementById("hotelForm").aadhar.value;
  if (!aadhar) return alert("Enter Aadhar to search!");
  if (!/^\d+$/.test(aadhar)) return alert("Aadhar must be a number!");

  fetch(`/hotel/aadhar/${aadhar}`)
    .then(res => {
      if (!res.ok) throw new Error(`No booking found with Aadhar: ${aadhar}`);
      return res.json();
    })
    .then(data => {
      const form = document.getElementById("hotelForm");
      form.reset();

      form.name.value = data.name;
      form.email.value = data.email;
      form.phn.value = data.phn;
      form.roomNo.value = data.roomNo;
      form.checkin.value = data.fromDate ? data.fromDate.substring(0, 16) : "";   // ✅ updated
      form.checkout.value = data.toDate ? data.toDate.substring(0, 16) : "";       // ✅ updated
      form.payment.value = data.payment;

      alert("✅ Booking found and loaded into form!");
    });
}

function fetchAll() {
  fetch("/hotel")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#dataTable tbody");
      tbody.innerHTML = "";

      data.forEach(entry => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${entry.aadhar}</td>
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.phn}</td>
          <td>${entry.roomNo}</td>
          <td>${new Date(entry.fromDate).toLocaleString()}</td>
          <td>${new Date(entry.toDate).toLocaleString()}</td>
          <td>${entry.payment}</td>
        `;

        tbody.appendChild(row);
      });
    });
}

function toggleTable() {
  const wrapper = document.getElementById("tableWrapper");
  wrapper.classList.toggle("hidden");

  if (!wrapper.classList.contains("hidden")) {
    fetchAll();
  }
}
