import axios from 'axios';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = 'index.html'; // Redirect to to-do app
  } catch (error) {
    alert(error.response.data.msg || 'Login failed');
  }
});