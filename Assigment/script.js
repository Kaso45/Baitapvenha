document.getElementById("add-button").addEventListener("click", function() {
    const first = document.getElementById("first").value;
    const last = document.getElementById("last").value;
    const handle = document.getElementById("handle").value;
    if (first && last && handle) {
        const table = document.querySelector("table tbody");
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell(0);
        cell1.textContent = table.rows.length;
        const cell2 = newRow.insertCell(1);
        cell2.textContent = first;
        const cell3 = newRow.insertCell(2);
        cell3.textContent = last;
        const cell4 = newRow.insertCell(3);
        cell4.textContent = handle;
        document.getElementById("first").value = "";
        document.getElementById("last").value = "";
        document.getElementById("handle").value = "";
    } else {
        alert("Vui lòng nhập đầy đủ thông tin.");
    }
});
