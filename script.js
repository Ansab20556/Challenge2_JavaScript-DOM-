function addData(){
    let name=document.querySelector(".name").value;
    let role=document.querySelector(".role").value;
    let state=document.querySelector(".status").value;

    
    let table = document.getElementById("outputTable");

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
                '<button onclick="editData(this)">Edit</button>' +
                '<button onclick="deleteData(this)">Delete</button>';
    
    clearInputs();
    }


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

            
            row.parentNode.removeChild(row);
        }

function clearInputs() {

            // Clear input fields
            document.querySelector(".name").value = "";
            document.querySelector(".role").value = "";
            document.querySelector(".status").value = "";
            
        }
