import axios from 'axios';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = 'index.html'; // Redirect to to-do app
  } catch (error) {
    alert(error.response.data.msg || 'Registration failed');
  }
});