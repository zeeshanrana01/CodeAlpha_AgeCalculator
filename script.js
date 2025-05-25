document.getElementById('ageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.getElementById('error').textContent = '';
    
    // Get input values
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    
    // Validate inputs
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        showError('Please enter valid numbers for all fields');
        return;
    }
    
    // Validate date
    const inputDate = new Date(year, month - 1, day);
    if (
        inputDate.getFullYear() !== year ||
        inputDate.getMonth() !== month - 1 ||
        inputDate.getDate() !== day
    ) {
        showError('Please enter a valid date');
        return;
    }
    
    // Check if date is in the future
    const today = new Date();
    if (inputDate > today) {
        showError('Birth date cannot be in the future');
        return;
    }
    
    // Calculate age
    calculateAge(inputDate);
});

function calculateAge(birthDate) {
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    // Adjust for negative months or days
    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }
    
    if (days < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
        days = Math.floor((today - lastMonth) / (1000 * 60 * 60 * 24));
        months--;
    }
    
    // Display result
    const resultElement = document.getElementById('ageResult');
    resultElement.innerHTML = `Your age is:<br>
        <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days`;
}

function showError(message) {
    document.getElementById('error').textContent = message;
}