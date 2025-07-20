let deletedEmployees = []; 

function addData(){
    let name=document.querySelector(".name").value.trim();
    let role=document.querySelector(".role").value.trim();
    let state=document.querySelector(".status").value;

    let table = document.getElementById("outputTable")

    const RegEx = /^[A-Za-z\s]+$/;

    if (!name || !RegEx.test(name)) {
        window.alert("Name is required (letters and spaces only)!");
    } else if (!role) {
        window.alert("Role is required");
    } else if (!state) {
        window.alert("Status is required");
    } else {
    let newRow = table.insertRow(table.rows.length);

    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = role;
    newRow.insertCell(2).innerHTML = state;
    newRow.insertCell(3).innerHTML =
                '<button class="btn-edit" onclick="editData(this)">Edit</button>' +
                '<button class="btn-delete"onclick="deleteData(this)">Delete</button>';
    
    clearInputs();
    editeButtons();
    }
    

}
function editeButtons(){
    document.querySelectorAll(".btn-edit").style.backgroundColor="green";
    document.querySelectorAll(".btn-edit").style.width="70px";
    document.querySelectorAll(".btn-delete").style.backgroundColor="red";
    document.querySelectorAll(".btn-delete").style.width="70px";

}

function editData(button) {

    let row = button.parentNode.parentNode;

    let nameCell = row.cells[0];
    let roleCell = row.cells[1];
    let stateCell = row.cells[2];

    let nameInput =
            prompt("Enter the updated name:",
                    nameCell.innerHTML);
    let roleInput =
                prompt("Enter the updated role:",
                    roleCell.innerHTML);
    let stateInput =
                prompt("Enter the updated state:",
                    stateCell.innerHTML);
    nameCell.innerHTML = nameInput;
    roleCell.innerHTML = roleInput;
    stateCell.innerHTML = stateInput;

}

function deleteData(button) {
    let row = button.parentNode.parentNode;

    let name = row.cells[0].innerHTML;
    let role = row.cells[1].innerHTML;
    let state = row.cells[2].innerHTML;

    deletedEmployees.push({ name, role, state });

    row.parentNode.removeChild(row);
}
function showTrash() {
    let trashContainer = document.getElementById("trashContainer");
    let trashData = document.getElementById("trashData");
    
    trashData.innerHTML = "";
    
    deletedEmployees.forEach((employee, index) => {
        let row = trashData.insertRow();
        row.insertCell(0).innerHTML = employee.name;
        row.insertCell(1).innerHTML = employee.role;
        row.insertCell(2).innerHTML = employee.state;
        row.insertCell(3).innerHTML =
            `<button onclick="restoreData(${index})">Restore</button>` +
            `<button onclick="permanentlyDelete(${index})">Delete Permanently</button>`;
        });

    trashContainer.style.display = trashData.rows.length > 0 ? "block" : "none";
}

function restoreData(index) {
    let restoredEmployee = deletedEmployees.splice(index, 1)[0];
    let table = document.getElementById("outputTable").getElementsByClassName("table_data")[0];
    let newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = restoredEmployee.name;
    newRow.insertCell(1).innerHTML = restoredEmployee.role;
    newRow.insertCell(2).innerHTML = restoredEmployee.state;
    newRow.insertCell(3).innerHTML =
        '<button onclick="editData(this)">Edit</button>' +
        '<button onclick="deleteData(this)">Delete</button>';
}

function permanentlyDelete(index) {
    deletedEmployees.splice(index, 1);
    showTrash();
}
function clearInputs() {

    document.querySelector(".name").value = "";
    document.querySelector(".role").value = "";
    document.querySelector(".status").value = "";
}
