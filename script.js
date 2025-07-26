let deleteElements = []; // مصفوفة لتخزين البيانات المحذوفة مؤقتًا

// وظيفة إضافة بيانات جديدة إلى الجدول الرئيسي
function addData() {
    let name = document.querySelector(".name").value;
    let role = document.querySelector(".role").value;
    let salary = document.querySelector(".salary").value;
    let state = document.querySelector(".status").value;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!name || !nameRegex.test(name)) {
        window.alert("الاسم مطلوب (أحرف ومسافات فقط)!");
    } else if (!role) {
        window.alert("المسمى الوظيفي مطلوب!");
    } else if (!salary || isNaN(salary)) {
        window.alert("الراتب مطلوب ويجب أن يكون رقمًا!");
    } else if (!state) {
        window.alert("الحالة مطلوبة!");
    } else {
        let table = document.getElementById("outputTable").querySelector("tbody");
        let newRow = table.insertRow();
        newRow.insertCell(0).innerHTML = name;
        newRow.insertCell(1).innerHTML = role;
        newRow.insertCell(2).innerHTML = salary;
        newRow.insertCell(3).innerHTML = state;
        newRow.insertCell(4).innerHTML =
            '<button onclick="editData(this)">تعديل</button>' +
            '<button onclick="deleteData(this)">حذف</button>' +
            '<button onclick="openBonusModal(this)">مكافأة</button>';

        clearInputs(); // تفريغ الحقول بعد الإضافة
    }
}

// تعديل البيانات داخل الصف
function editData(button) {
    let row = button.parentNode.parentNode;
    let nameCell = row.cells[0];
    let roleCell = row.cells[1];
    let salaryCell = row.cells[2];
    let stateCell = row.cells[3];

    let nameInput = prompt("أدخل الاسم الجديد:", nameCell.innerHTML);
    let roleInput = prompt("أدخل المسمى الوظيفي الجديد:", roleCell.innerHTML);
    let salaryInput = prompt("أدخل الراتب الجديد:", salaryCell.innerHTML);
    let stateInput = prompt("أدخل الحالة الجديدة:", stateCell.innerHTML);

    nameCell.innerHTML = nameInput;
    roleCell.innerHTML = roleInput;
    salaryCell.innerHTML = salaryInput;
    stateCell.innerHTML = stateInput;
}

// حذف الموظف ونقله إلى سلة المهملات
function deleteData(button) {
    let row = button.parentNode.parentNode;
    let rowData = {
        name: row.cells[0].innerHTML,
        role: row.cells[1].innerHTML,
        salary: row.cells[2].innerHTML,
        state: row.cells[3].innerHTML,
    };

    deleteElements.push(rowData);

    let table2 = document.getElementById("trashTable").querySelector("tbody");
    let deleteRow = table2.insertRow();
    deleteRow.insertCell(0).innerHTML = rowData.name;
    deleteRow.insertCell(1).innerHTML = rowData.role;
    deleteRow.insertCell(2).innerHTML = rowData.salary;
    deleteRow.insertCell(3).innerHTML = rowData.state;
    deleteRow.insertCell(4).innerHTML =
        '<button onclick="restorFromTrash(this)">استعادة</button>';

    row.parentNode.removeChild(row);
}

// استعادة موظف من سلة المهملات
function restorFromTrash(button) {
    let row = button.parentNode.parentNode;
    let name = row.cells[0].innerHTML;
    let role = row.cells[1].innerHTML;
    let salary = row.cells[2].innerHTML;
    let state = row.cells[3].innerHTML;

    let table = document.getElementById("outputTable").querySelector("tbody");
    let newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = role;
    newRow.insertCell(2).innerHTML = salary;
    newRow.insertCell(3).innerHTML = state;
    newRow.insertCell(4).innerHTML =
        '<button onclick="editData(this)">تعديل</button>' +
        '<button onclick="deleteData(this)">حذف</button>' +
        '<button onclick="openBonusModal(this)">مكافأة</button>';

    row.parentNode.removeChild(row);
    trashClose();
}

// عرض جدول سلة المهملات
function trash() {
    let trash = document.getElementById("trashTable");
    if (trash.style.display === "none") {
        trash.style.display = "block";
    }
}

// إخفاء سلة المهملات
function trashClose() {
    let trashclose = document.getElementById("trashTable");
    if (trashclose.style.display === "block") {
        trashclose.style.display = "none";
    }
}

// تفريغ الحقول
function clearInputs() {
    document.querySelector(".name").value = "";
    document.querySelector(".role").value = "";
    document.querySelector(".salary").value = "";
    document.querySelector(".status").value = "";
}

let currentBonusRow = null;

// فتح نافذة المكافأة
function openBonusModal(button) {
    currentBonusRow = button.parentNode.parentNode;
    document.getElementById("bonusPercentage").value = "";
    document.getElementById("bonusModal").style.display = "block";
}

// إغلاق نافذة المكافأة
function closeBonusModal() {
    document.getElementById("bonusModal").style.display = "none";
}

// حساب المكافأة
function calculateBonus() {
    const percentage = parseFloat(document.getElementById("bonusPercentage").value);
    if (isNaN(percentage) || percentage < 0) {
        alert("يرجى إدخال نسبة مكافأة صحيحة.");
        return;
    }

    const salaryCell = currentBonusRow.cells[2];
    const salary = parseFloat(salaryCell.innerText);
    const bonus = ((salary * percentage) / 100).toFixed(2);

    let bonusSpan = salaryCell.querySelector("span");
    if (!bonusSpan) {
        bonusSpan = document.createElement("span");
        salaryCell.appendChild(document.createElement("br"));
        bonusSpan.style.color = "green";
        salaryCell.appendChild(bonusSpan);
    }

    bonusSpan.textContent = `مكافأة: $${bonus}`;
    closeBonusModal();
}

// تصفية الموظفين حسب المدخلات
function applyFilters() {
    const nameFilter = document.getElementById("filterName").value.toLowerCase();
    const roleFilter = document.getElementById("filterRole").value.toLowerCase();
    const minSalary = parseFloat(document.getElementById("minSalary").value);
    const maxSalary = parseFloat(document.getElementById("maxSalary").value);
    const minBonus = parseFloat(document.getElementById("minBonus").value);
    const maxBonus = parseFloat(document.getElementById("maxBonus").value);
    const statusFilter = document.getElementById("filterStatus").value;

    const rows = document.querySelectorAll("#outputTable tbody tr");
    rows.forEach((row) => {
        const name = row.cells[0].innerText.toLowerCase();
        const role = row.cells[1].innerText.toLowerCase();

        const salaryText = row.cells[2].innerText.split("\n")[0];
        const salary = parseFloat(salaryText);

        const bonusSpan = row.cells[2].querySelector("span");
        const bonusValue = bonusSpan ? parseFloat(bonusSpan.textContent.replace(/[^\d.]/g, "")) : 0;

        const status = row.cells[3].innerText;

        const matchesName = !nameFilter || name.includes(nameFilter);
        const matchesRole = !roleFilter || role.includes(roleFilter);
        const matchesSalary = (isNaN(minSalary) || salary >= minSalary) &&
                              (isNaN(maxSalary) || salary <= maxSalary);
        const matchesBonus = (isNaN(minBonus) || bonusValue >= minBonus) &&
                             (isNaN(maxBonus) || bonusValue <= maxBonus);
        const matchesStatus = !statusFilter || status === statusFilter;

        row.style.display = (matchesName && matchesRole && matchesSalary && matchesBonus && matchesStatus)
            ? ""
            : "none";
    });
}

// تحديث إجمالي الرواتب المعروضة
function updateTotalPayroll() {
    const rows = document.querySelectorAll("#outputTable tbody tr");
    let total = 0;
    rows.forEach((row) => {
        const salary = parseFloat(row.cells[2].innerText.split("\n")[0]);
        if (!isNaN(salary)) total += salary;
    });
    document.getElementById("totalPayroll").innerText = `إجمالي الرواتب: ${total.toLocaleString()} ر.ي`;
}

// حذف الموظفين الذين رواتبهم تحت أو تساوي الحد المحدد
function deleteLowSalaryEmployees(threshold) {
    const rows = Array.from(document.querySelectorAll("#outputTable tbody tr"));
    rows.forEach((row) => {
        const salary = parseFloat(row.cells[2].innerText.split("\n")[0]);
        if (!isNaN(salary) && salary <= threshold) {
            deleteData(row.cells[4].querySelector("button"));
        }
    });
    updateTotalPayroll();
}

// تمييز الموظفين ذوي الرواتب العالية أو من لديهم مكافآت
function highlightEmployees() {
    const rows = document.querySelectorAll("#outputTable tbody tr");
    rows.forEach((row) => {
        const nameCell = row.cells[0];
        const salaryCell = row.cells[2];

        nameCell.querySelectorAll(".badge").forEach((b) => b.remove());

        const salary = parseFloat(salaryCell.innerText.split("\n")[0]);
        const hasBonus = salaryCell.querySelector("span");

        if (salary >= 100000) {
            const badge = document.createElement("span");
            badge.textContent = "عالي";
            badge.className = "badge high";
            nameCell.appendChild(badge);
        }

        if (hasBonus) {
            const badge = document.createElement("span");
            badge.textContent = "مكافأة";
            badge.className = "badge bonus";
            nameCell.appendChild(badge);
        }
    });
}

// ربط التحديثات مع الإغلاق والإضافة
const originalClose = closeBonusModal;
closeBonusModal = function () {
    originalClose();
    highlightEmployees();
    updateTotalPayroll();
};

const originalAdd = addData;
addData = function () {
    originalAdd();
    highlightEmployees();
    updateTotalPayroll();
};

// البحث عن موظف بالاسم
function searchEmployeeByName() {
    const searchName = document.getElementById("searchNameInput").value.trim().toLowerCase();
    const rows = document.querySelectorAll("#outputTable tbody tr");

    rows.forEach((row) => {
        row.classList.remove("highlight");

        const nameCell = row.cells[0].cloneNode(true);
        nameCell.querySelectorAll(".badge")?.forEach((b) => b.remove());

        const name = nameCell.textContent.trim().toLowerCase();

        if (name === searchName && searchName !== "") {
            row.classList.add("highlight");
        }
    });
}

// التحقق من صحة الإدخال قبل الإضافة
function validateAndAddData() {
    clearErrors();

    const name = document.querySelector(".name").value.trim();
    const role = document.querySelector(".role").value.trim();
    const salary = document.querySelector(".salary").value.trim();
    const state = document.querySelector(".status").value;

    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const roleRegex = /^[A-Za-z\s]{2,}$/;
    const salaryRegex = /^\d+(\.\d{1,2})?$/;

    let valid = true;

    if (!name || !nameRegex.test(name)) {
        showError(".name", "الاسم يجب أن يحتوي على أحرف فقط وطوله لا يقل عن حرفين.");
        valid = false;
    }

    if (!role || !roleRegex.test(role)) {
        showError(".role", "المسمى الوظيفي يجب أن يحتوي على أحرف فقط وطوله لا يقل عن حرفين.");
        valid = false;
    }

    if (!salary || !salaryRegex.test(salary)) {
        showError(".salary", "الراتب يجب أن يكون رقمًا صحيحًا أو عشريًا (مثال: 5000 أو 5000.00).");
        valid = false;
    }

    if (!state) {
        showError(".status", "الحالة مطلوبة.");
        valid = false;
    }

    if (valid) {
        addData(); // إضافة البيانات بعد التحقق
    }
}

// عرض رسالة الخطأ بجانب الحقل
function showError(selector, message) {
    const field = document.querySelector(selector);
    const error = document.createElement("div");
    error.className = "error-message";
    error.innerText = message;
    field.parentNode.insertBefore(error, field.nextSibling);
    field.classList.add("input-error");
}

// إزالة جميع رسائل الخطأ
function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
}

// مسح نتيجة البحث عن موظف
function clearSearch() {
    document.getElementById("searchNameInput").value = "";
    const rows = document.querySelectorAll("#outputTable tbody tr");
    rows.forEach((row) => row.classList.remove("highlight"));
}
