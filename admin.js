// admin.js
import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// ---------- Elements ----------
const loginView = document.getElementById("loginView");
const dashboardView = document.getElementById("dashboardView");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");

const tableBody = document.getElementById("rsvpTableBody");
const emptyState = document.getElementById("emptyState");

const totalResponses = document.getElementById("totalResponses");
const totalAttending = document.getElementById("totalAttending");
const totalDeclined = document.getElementById("totalDeclined");
const totalGuests = document.getElementById("totalGuests");

const editModal = document.getElementById("editModal");
const editName = document.getElementById("editName");
const editAttending = document.getElementById("editAttending");
const editGuestCount = document.getElementById("editGuestCount");
const editGuestNames = document.getElementById("editGuestNames");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let currentEditId = null;
let unsubscribeSnapshot = null;

// ---------- Auth ----------
loginBtn.addEventListener("click", async () => {
  loginError.textContent = "";
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    loginError.textContent = "Please enter both email and password.";
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    loginError.textContent = "Invalid email or password.";
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Log In";
  }
});

// Allow "Enter" key to submit login
[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loginBtn.click();
  });
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginView.style.display = "none";
    dashboardView.style.display = "block";
    startListening();
  } else {
    loginView.style.display = "flex";
    dashboardView.style.display = "none";
    if (unsubscribeSnapshot) {
      unsubscribeSnapshot();
      unsubscribeSnapshot = null;
    }
  }
});

// ---------- Live data ----------
function startListening() {
  const q = query(collection(db, "rsvps"), orderBy("updatedAt", "desc"));

  unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs;

    if (docs.length === 0) {
      tableBody.innerHTML = "";
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";
      tableBody.innerHTML = docs.map((d) => renderRow(d.id, d.data())).join("");
    }

    updateSummary(docs);
    attachRowListeners();
  }, (err) => {
    console.error("Snapshot error:", err);
  });
}

function renderRow(id, data) {
  const attending = data.attending === "yes";
  const guestNames = Array.isArray(data.guestNames) ? data.guestNames.join(", ") : "";
  const updated = data.updatedAt && data.updatedAt.toDate
    ? data.updatedAt.toDate().toLocaleString()
    : "—";

  return `
    <tr data-id="${escapeHtml(id)}">
      <td>${escapeHtml(data.name || "")}</td>
      <td><span class="badge ${attending ? "badge-yes" : "badge-no"}">${attending ? "Yes" : "No"}</span></td>
      <td>${data.guestCount ?? 1}</td>
      <td>${escapeHtml(guestNames)}</td>
      <td>${updated}</td>
      <td>
        <button class="action-btn edit" data-action="edit" title="Edit"><i class="fa-solid fa-pen"></i></button>
        <button class="action-btn delete" data-action="delete" title="Delete"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `;
}

function updateSummary(docs) {
  let attending = 0;
  let declined = 0;
  let guests = 0;

  docs.forEach((d) => {
    const data = d.data();
    if (data.attending === "yes") {
      attending++;
      guests += data.guestCount || 0;
    } else {
      declined++;
    }
  });

  totalResponses.textContent = docs.length;
  totalAttending.textContent = attending;
  totalDeclined.textContent = declined;
  totalGuests.textContent = guests;
}

// ---------- Row actions ----------
function attachRowListeners() {
  tableBody.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const id = row.dataset.id;
      const action = btn.dataset.action;

      if (action === "delete") {
        handleDelete(id, row);
      } else if (action === "edit") {
        handleEditOpen(id, row);
      }
    });
  });
}

async function handleDelete(id, row) {
  const name = row.children[0].textContent;
  if (!confirm(`Delete RSVP for "${name}"? This cannot be undone.`)) return;

  try {
    await deleteDoc(doc(db, "rsvps", id));
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete. Please try again.");
  }
}

function handleEditOpen(id, row) {
  currentEditId = id;

  const cells = row.children;
  editName.value = cells[0].textContent;
  editAttending.value = cells[1].textContent.trim().toLowerCase() === "yes" ? "yes" : "no";
  editGuestCount.value = cells[2].textContent.trim();
  editGuestNames.value = cells[3].textContent;

  editModal.style.display = "flex";
}

cancelEditBtn.addEventListener("click", () => {
  editModal.style.display = "none";
  currentEditId = null;
});

saveEditBtn.addEventListener("click", async () => {
  if (!currentEditId) return;

  const guestNames = editGuestNames.value
    .split(",")
    .map((n) => n.trim())
    .filter((n) => n.length > 0);

  saveEditBtn.disabled = true;
  saveEditBtn.textContent = "Saving...";

  try {
    await updateDoc(doc(db, "rsvps", currentEditId), {
      name: editName.value.trim(),
      attending: editAttending.value,
      guestCount: parseInt(editGuestCount.value, 10) || 1,
      guestNames
    });

    editModal.style.display = "none";
    currentEditId = null;
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to save changes. Please try again.");
  } finally {
    saveEditBtn.disabled = false;
    saveEditBtn.textContent = "Save Changes";
  }
});

// ---------- Helpers ----------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
