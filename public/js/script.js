document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const userTableBody = document.getElementById('userTableBody');

    // Función para obtener y mostrar los usuarios
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:4000/users');
            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            const users = await response.json();
            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.usuario}</td>
                    <td>${user.email}</td>
                `;
                userTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Evento para enviar el formulario y manejar el registro de usuario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usuario = document.getElementById('usuario').value;
        const email = document.getElementById('email').value;
        const contraseña = document.getElementById('contraseña').value;

        try {
            const response = await fetch('http://localhost:4000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, email, contraseña })
            });

            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }

            form.reset();
            fetchUsers(); // Actualizar la tabla después de registrar
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Inicializar la tabla de usuarios al cargar la página
    fetchUsers();
});
