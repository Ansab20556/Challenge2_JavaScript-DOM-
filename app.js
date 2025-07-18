document.getElementById('employeeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;

    if (!name || !role || !status) {
        alert('يرجى ملء جميع الحقول!');
        return;
    }

    addEmployee(name, role, status);
    this.reset();
});

let employees = [];
let trash = [];

function addEmployee(name, role, status) {
    const employee = { name, role, status, deleted: false };
    employees.push(employee);
    renderEmployeeTable();
}

function renderEmployeeTable() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';
    employees.forEach((employee, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = employee.name;
        row.insertCell(1).innerText = employee.role;
        row.insertCell(2).innerHTML = `<span class="${employee.status}">${employee.status}</span>`;
        row.insertCell(3).innerHTML = `<button onclick="editEmployee(${index})">تعديل</button> <button onclick="deleteEmployee(${index})">حذف</button>`;
    });
}

function editEmployee(index) {
    const employee = employees[index];
    const name = prompt('تعديل اسم الموظف', employee.name);
    const role = prompt('تعديل الدور', employee.role);
    const status = prompt('تعديل الحالة', employee.status);

    if (name && role && status) {
        employees[index] = { ...employee, name, role, status };
        renderEmployeeTable();
    }
}


function deleteEmployee(index) {
    const employee = employees.splice(index, 1)[0];
    trash.push(employee);
    renderEmployeeTable();
    renderTrash();
}

function renderTrash() {
    const trashTable = document.querySelector('#trashTable');
    trashTable.innerHTML = '';
    trash.forEach((employee, index) => {
        const row = trashTable.insertRow();
        row.insertCell(0).innerText = employee.name;
        row.insertCell(1).innerText = employee.role;
        row.insertCell(2).innerHTML = `<span class="${employee.status}">${employee.status}</span>`;
        row.insertCell(3).innerHTML = `<button onclick="restoreEmployee(${index})">استعادة</button> <button onclick="permanentlyDelete(${index})">حذف نهائي</button>`;
    });
}

function restoreEmployee(index) {
    const employee = trash.splice(index, 1)[0];
    employees.push(employee);
    renderEmployeeTable();
    renderTrash();
}

function permanentlyDelete(index) {
    trash.splice(index, 1);
    renderTrash();
}