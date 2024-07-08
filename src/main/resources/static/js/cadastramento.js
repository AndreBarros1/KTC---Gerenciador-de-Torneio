var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

const loginsec = document.querySelector('.login-section')
const Registerlink = document.querySelector('.Register-link')
const Loginlink = document.querySelector('.Login-link')
Loginlink.addEventListener('click', ()=> {
    loginsec.classList.add('active')
})
Registerlink.addEventListener('click', ()=> {
    loginsec.classList.remove('active')
})


document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('registerBtn');
  const loginBtn = document.getElementById('loginBtn');

  registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (name && email && password) {
          addUser(name, email, password);
          alert('Usuário registrado com sucesso!');
          document.getElementById('name').value = '';
          document.getElementById('email').value = '';
          document.getElementById('password').value = '';
      } else {
          alert('Por favor, preencha todos os campos.');
      }
  });

  loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      if (authenticateUser(email, password)) {
          alert('Login bem-sucedido!');
          window.location.href = 'index.html'; // Redireciona para a página principal
      } else {
          alert('Email ou senha incorretos.');
      }
  });

  function addUser(name, email, password) {
      const users = getUsers();
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
  }

  function getUsers() {
      return JSON.parse(localStorage.getItem('users')) || [];
  }

  function authenticateUser(email, password) {
      const users = getUsers();
      return users.some(user => user.email === email && user.password === password);
  }
});
