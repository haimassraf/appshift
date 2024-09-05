function save() {
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('Start-time').value;
    const endTime = document.getElementById('End-time').value;
    const hourlyWage = document.getElementById('Hourly-wage').value;
    const shiftSlug = document.getElementById('Shift-slug').value;
    const comments = document.getElementById('Comments').value;
    const workplace = document.getElementById('Workplace').value;

    const shift = {
        date: date,
        startTime: startTime,
        endTime: endTime,
        hourlyWage: hourlyWage,
        shiftSlug: shiftSlug,
        comments: comments,
        workplace: workplace
    };

    const shifts = JSON.parse(localStorage.getItem('shifts')) || [];
    shifts.push(shift)
    localStorage.setItem('shifts', JSON.stringify(shifts));

    alert('Shift add successful!');
    window.location.href = 'addshift.html';
    return false;
}
document.getElementById('addShiftform').onsubmit = save;