document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/login', { // Cambia la ruta a tu endpoint de autenticación
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }), // Asegúrate de que coincida con los datos que espera tu API
            });

            const result = await response.json();

            if (response.ok) {
                messageElement.textContent = 'Inicio de sesión exitoso';
                messageElement.style.color = 'green';
                localStorage.setItem('token', result.token); // Guardar el token para futuras solicitudes
                // Redirigir o realizar alguna acción adicional
            } else {
                messageElement.textContent = result.msg;
                messageElement.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            messageElement.textContent = 'Error de conexión con el servidor';
            messageElement.style.color = 'red';
        }
    });
});