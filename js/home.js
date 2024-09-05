document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.submit');

    function displayShifts(fromDate = null, toDate = null, shiftName = null) {
        const shifts = JSON.parse(localStorage.getItem('shifts')) || [];
        const table = document.getElementById('myTable');

        table.innerHTML = `
            <tr class="header">
                <th>Date</th>
                <th>Beginning time</th>
                <th>End time</th>
                <th>Price per hour</th>
                <th>Shift place</th>
                <th>Total profit per shift</th>
                <th>Action</th>
            </tr>`;

        let totalProfit = 0;

        shifts.forEach(shift => {
            if ((!fromDate || shift.date >= fromDate) && 
                (!toDate || shift.date <= toDate) && 
                (!shiftName || shift.shiftSlug.includes(shiftName))) {

                const row = table.insertRow();

                const dateCell = row.insertCell(0);
                const startTimeCell = row.insertCell(1);
                const endTimeCell = row.insertCell(2);
                const hourlyWageCell = row.insertCell(3);
                const workplaceCell = row.insertCell(4);
                const profitCell = row.insertCell(5);
                const actionCell = row.insertCell(6);

                const start = new Date(`${shift.date}T${shift.startTime}`);
                const end = new Date(`${shift.date}T${shift.endTime}`);

                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                    console.error('Invalid time data for shift:', shift);
                    profitCell.textContent = 'Error';
                    return;
                }

                const hoursWorked = (end - start) / (1000 * 60 * 60);
                
                const profit = hoursWorked * parseFloat(shift.hourlyWage);

                if (isNaN(profit)) {
                    profitCell.textContent = 'Error';
                    return;
                }

                dateCell.textContent = shift.date;
                startTimeCell.textContent = shift.startTime;
                endTimeCell.textContent = shift.endTime;
                hourlyWageCell.textContent = shift.hourlyWage;
                workplaceCell.textContent = shift.workplace;

                profitCell.textContent = profit.toFixed(2);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () {
                    deleteShift(shift);
                    row.remove();
                };
                actionCell.appendChild(deleteButton);

                totalProfit += profit;
            }
        });

        if (totalProfit > 0) {
            const totalProfitRow = table.insertRow();
            const totalProfitCell = totalProfitRow.insertCell(0);
            totalProfitCell.colSpan = 5;
            totalProfitCell.style.textAlign = 'right';
            totalProfitCell.textContent = 'Total Profit:';

            const totalProfitValueCell = totalProfitRow.insertCell(1);
            totalProfitValueCell.textContent = totalProfit.toFixed(2);
            totalProfitValueCell.colSpan = 2;
        }
    }

    displayShifts();

    searchButton.addEventListener('click', function (event) {
        event.preventDefault();
        const fromDate = document.getElementById('fromdate').value;
        const toDate = document.getElementById('todate').value;
        const shiftName = document.getElementById('shift').value.trim();
        displayShifts(fromDate, toDate, shiftName);
    });

    function deleteShift(shiftToDelete) {
        const shifts = JSON.parse(localStorage.getItem('shifts')) || [];
        const updatedShifts = shifts.filter(shift =>
            !(shift.date === shiftToDelete.date &&
              shift.startTime === shiftToDelete.startTime &&
              shift.endTime === shiftToDelete.endTime &&
              shift.shiftSlug === shiftToDelete.shiftSlug)
        );
        localStorage.setItem('shifts', JSON.stringify(updatedShifts));
    }
});