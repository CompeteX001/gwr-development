document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const appName = document.getElementById('appName').value;

    const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, appName })
    });

    const result = await response.json();
    alert(result.message);
});
