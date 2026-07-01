document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

async function fetchUsers() {
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();

        renderUsers(users);

    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('users-container').innerHTML =
            `<p style="color: red; grid-column: 1/-1; text-align: center;">
                Failed to load users: ${error.message}
             </p>`;
    }
}

function renderUsers(users) {
    const container = document.getElementById('users-container');

    container.innerHTML = '';

    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';

        const nameHeader = document.createElement('h2');
        nameHeader.textContent = user.name;

        const emailParagraph = document.createElement('p');
        emailParagraph.innerHTML = `<strong>Email:</strong> ${user.email}`;

        const companyParagraph = document.createElement('p');
        companyParagraph.innerHTML = `<strong>Company:</strong> ${user.company.name}`;

        card.appendChild(nameHeader);
        card.appendChild(emailParagraph);
        card.appendChild(companyParagraph);

        container.appendChild(card);
    });
}