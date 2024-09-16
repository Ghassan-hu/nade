document.addEventListener('DOMContentLoaded', function() {
  initializeLogo();
  initializeTeamLogin();
  initializeAdminLogin();
  initializeReservationSystem();
  initializeNavigation();
});

function initializeLogo() {
  const logo = document.querySelector('.navbar img');
  const links = document.querySelectorAll('.navbar-links a');

  links.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth > 768) {
        animateLogo();
      }
    });
  });

  function animateLogo() {
    logo.style.transform = 'translateX(100%)';
    setTimeout(() => {
      logo.style.transform = 'translateX(0)';
      animateLogoVertically();
    }, 750);
  }

  function animateLogoVertically() {
    logo.style.transform = 'translateY(-20%)';
    setTimeout(() => {
      logo.style.transform = 'translateY(20%)';
      setTimeout(() => {
        logo.style.transform = 'translateY(-10%)';
        setTimeout(() => {
          logo.style.transform = 'translateY(0)';
        }, 300);
      }, 300);
    }, 300);
  }
}

function initializeTeamLogin() {
  const teams = document.querySelectorAll('.dropdown-content a');
  teams.forEach((team, index) => {
    team.addEventListener('click', function() {
      const teamName = this.textContent;
      const teamUsernames = ['1', 'team2user', 'team3user', 'team4user', 'team5user'];
      const teamPasswords = ['1', 'team2pass', 'team3pass', 'team4pass', 'team5pass'];
      const teamPages = ['team1.html', 'team2.html', 'team3.html', 'team4.html', 'team5.html'];
      displayTeamLoginForm(teamName, teamUsernames[index], teamPasswords[index], teamPages[index]);
    });
  });
}

function displayTeamLoginForm(teamName, username, password, page) {
  closeAllLoginForms();
  const form = document.createElement('div');
  form.className = 'team-login-form';
  form.innerHTML = `
    <button class="close-button">X</button>
    <h2>Login for ${teamName}</h2>
    <input type="text" id="username" placeholder="Username">
    <input type="password" id="password" placeholder="Password">
    <button class="submit-button">Submit</button>
    <p id="error-message"></p>
  `;
  document.body.appendChild(form);
  const closeButton = form.querySelector('.close-button');
  closeButton.addEventListener('click', function() {
    form.remove();
  });
  const submitButton = form.querySelector('.submit-button');
  submitButton.addEventListener('click', function() {
    const usernameInput = form.querySelector('#username');
    const passwordInput = form.querySelector('#password');
    const errorMessage = form.querySelector('#error-message');
    if (usernameInput.value === username && passwordInput.value === password) {
      errorMessage.textContent = `Access granted for ${teamName}!`;
      setTimeout(() => {
        form.remove();
        window.location.href = page;
      }, 1000);
    } else {
      errorMessage.textContent = 'Incorrect username or password. Access denied.';
    }
  });
}

function initializeAdminLogin() {
  const adminLink = document.querySelector('a[href="#admin"]');
  if (adminLink) {
    adminLink.addEventListener('click', function(event) {
      event.preventDefault();
      displayAdminLoginForm();
    });
  }
}

function displayAdminLoginForm() {
  closeAllLoginForms();
  const adminUsername = '1';
  const adminPassword = '1';
  const adminPage = 'admin.html';

  let adminForm = document.getElementById('admin-form');
  
  if (!adminForm) {
    adminForm = document.createElement('div');
    adminForm.id = 'admin-form';
    adminForm.className = 'admin-form';
    adminForm.innerHTML = `
      <button id="close-admin" class="close-button">X</button>
      <h2>Admin Login</h2>
      <input type="text" id="admin-username" placeholder="Username">
      <input type="password" id="admin-password" placeholder="Password">
      <button id="admin-submit" class="submit-button">Submit</button>
      <p id="admin-error-message"></p>
    `;
    document.body.appendChild(adminForm);
  }

  adminForm.style.display = 'block';

  const closeAdminButton = adminForm.querySelector('#close-admin');
  closeAdminButton.addEventListener('click', function() {
    adminForm.style.display = 'none';
  });

  const adminSubmitButton = adminForm.querySelector('#admin-submit');
  adminSubmitButton.addEventListener('click', function() {
    const adminUsernameInput = adminForm.querySelector('#admin-username');
    const adminPasswordInput = adminForm.querySelector('#admin-password');
    const adminErrorMessage = adminForm.querySelector('#admin-error-message');
    if (adminUsernameInput.value === adminUsername && adminPasswordInput.value === adminPassword) {
      adminErrorMessage.textContent = `Access granted for Admin!`;
      adminErrorMessage.style.color = 'green';
      setTimeout(() => {
        adminForm.style.display = 'none';
        window.location.href = adminPage;
      }, 1000);
    } else {
      adminErrorMessage.textContent = 'Incorrect username or password. Access denied.';
      adminErrorMessage.style.color = 'red';
    }
  });
}

function closeAllLoginForms() {
  const teamLoginForms = document.querySelectorAll('.team-login-form');
  teamLoginForms.forEach(form => form.remove());

  const adminForm = document.getElementById('admin-form');
  if (adminForm) {
    adminForm.style.display = 'none';
  }
}

let formSubmitted = false;
let listenerAttached = false;

function initializeReservationSystem() {
  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm && !listenerAttached) {
    reservationForm.addEventListener('submit', handleReservationSubmit);
    listenerAttached = true;
  }

  const toggleButton = document.getElementById('reservation-toggle');
  const dropdown = document.getElementById('reservation-dropdown');
  if (toggleButton && dropdown) {
    toggleButton.addEventListener('click', function() {
      dropdown.classList.toggle('active');
      toggleButton.textContent = dropdown.classList.contains('active') ? 'إغلاق' : 'طلب حجز الملعب';
    });
  }
}

function handleReservationSubmit(event) {
  event.preventDefault();
  
  if (formSubmitted) {
    console.log('Form already submitted. Ignoring this submission.');
    return;
  }
  
  console.log('Handling form submission');
  formSubmitted = true;

  const name = document.querySelector('#name').value;
  const familyName = document.querySelector('#family-name').value;
  const phone = document.querySelector('#phone').value;
  const day = document.querySelector('#day').value;
  const startTime = document.querySelector('#start-time').value;
  const endTime = document.querySelector('#end-time').value;

  const reservationData = {
    name, familyName, phone, day, startTime, endTime
  };

  const price = calculatePrice(startTime, endTime);
  reservationData.price = price;

  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  reservations.push(reservationData);
  localStorage.setItem('reservations', JSON.stringify(reservations));

  const formattedStartTime = formatTimeAsDayNight(startTime);
  const formattedEndTime = formatTimeAsDayNight(endTime);

  const reservationMessage = document.getElementById('reservation-message');
  if (reservationMessage) {
    reservationMessage.innerHTML = `
      <p>!تم تقديم طلب الحجز بنجاح</p>
      <p>شكرًا لحجزك. السعر الإجمالي هو ₪${price}</p>
      <p>وقت الحجز: من ${formattedStartTime} إلى ${formattedEndTime}</p>
    `;

    if (window.innerWidth <= 768) {
      setTimeout(() => {
        const dropdown = document.getElementById('reservation-dropdown');
        const toggleButton = document.getElementById('reservation-toggle');
        if (dropdown && toggleButton) {
          dropdown.classList.remove('active');
          toggleButton.textContent = 'طلب حجز الملعب';
        }
      }, 3000);
    }

    setTimeout(() => {
      formSubmitted = false;
      reservationMessage.innerHTML = '';
    }, 5000);
  }
}


function calculatePrice(startTime, endTime) {
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  const durationInMinutes = (end - start) / (1000 * 60);
  const price = Math.ceil(durationInMinutes) * (100 / 60);
  return price.toFixed(2);
}

function formatTimeAsDayNight(time) {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  
  if (hour >= 6 && hour < 18) {
    return `${time} نهارًا`;
  } else {
    return `${time} ليلاً`;
  }
}

function initializeNavigation() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navbarLinks = document.querySelector('.navbar-links');
  const dropdowns = document.querySelectorAll('.dropdown');
  const navAnchors = navbarLinks ? navbarLinks.querySelectorAll('a') : [];

  function closeMenu() {
    navbarLinks.classList.remove('active');
    hamburger.classList.remove('active');
    dropdowns.forEach(dropdown => {
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      if (dropdownContent) {
        dropdownContent.classList.remove('active');
      }
    });
  }

  if (hamburger && navbarLinks) {
    hamburger.addEventListener('click', function() {
      navbarLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  dropdowns.forEach(dropdown => {
    const dropdownBtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (dropdownBtn && dropdownContent) {
      dropdownBtn.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdownContent.classList.toggle('active');
        }
      });
    }
  });

  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (navbarLinks && !navbarLinks.contains(e.target) && (!hamburger || !hamburger.contains(e.target))) {
        closeMenu();
      }
    }
  });

  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
  }, false);

  document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
  }, false);

  function handleSwipeGesture() {
    if (window.innerWidth <= 768 && navbarLinks.classList.contains('active')) {
      const swipeDistance = touchStartY - touchEndY;
      if (swipeDistance > 50) {
        closeMenu();
      }
    }
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

window.addEventListener('load', function() {
  updateReservationTable();
  if (window.location.href.includes('admin.html')) {
    const reservationData = JSON.parse(localStorage.getItem('reservationData'));
    if (reservationData) {
      displayReservationApproval(reservationData);
    }
  }
});

function updateReservationTable() {
  const approvedReservations = JSON.parse(localStorage.getItem('approvedReservations') || '[]');
  const table = document.querySelector('#reservation-table');
  
  if (table) {
    approvedReservations.forEach(reservation => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${reservation.day}</td>
        <td>${reservation.startTime} - ${reservation.endTime}</td>
        <td>${reservation.name} ${reservation.familyName}</td>
      `;
      table.appendChild(tr);
    });
  }
}

function displayReservationApproval(reservationData) {
  const reservationContainer = document.createElement('div');
  reservationContainer.innerHTML = `
    <h2>Reservation Approval</h2>
    <p>Name: ${reservationData.name}</p>
    <p>Family Name: ${reservationData.familyName}</p>
    <p>Phone: ${reservationData.phone}</p>
    <p>Day: ${reservationData.day}</p>
    <p>Start Time: ${reservationData.startTime}</p>
    <p>End Time: ${reservationData.endTime}</p>
    <button id="approve-reservation">Approve</button>
    <button id="reject-reservation">Reject</button>
  `;
  document.body.appendChild(reservationContainer);

  document.querySelector('#approve-reservation').addEventListener('click', function() {
    alert('Reservation approved!');
    localStorage.setItem('approvedReservationData', JSON.stringify(reservationData));
    localStorage.removeItem('reservationData');
    reservationContainer.remove();

    const table = window.opener.document.querySelector('#schedule table tbody');
    if (table) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${reservationData.day}</td>
        <td>${reservationData.startTime} - ${reservationData.endTime}</td>
        <td>${reservationData.name} ${reservationData.familyName}</td>
      `;
      table.appendChild(tr);
    }

    const reservationSection = window.opener.document.querySelector('#reservation-message');
    if (reservationSection) {
      reservationSection.innerHTML = `
        <p>Reservation Details:</p>
        <p>Name: ${reservationData.name}</p>
        <p>Family Name: ${reservationData.familyName}</p>
        <p>Phone: ${reservationData.phone}</p>
        <p>Day: ${reservationData.day}</p>
        <p>Start Time: ${reservationData.startTime}</p>
        <p>End Time: ${reservationData.endTime}</p>
      `;
    }
  });

  document.querySelector('#reject-reservation').addEventListener('click', function() {
    alert('Reservation rejected!');
    localStorage.removeItem('reservationData');
    reservationContainer.remove();
  });
}
document.getElementById('phone').addEventListener('input', function(e) {
  var phone = e.target.value.replace(/\D/g, '');
  var isValid = /^(05[0-9]{8}|9[0-9]{8})$/.test(phone);
  
  if (isValid) {
      e.target.setCustomValidity('');
  } else {
      e.target.setCustomValidity('الرجاء إدخال رقم هاتف فلسطيني أو إسرائيلي صحيح');
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const startTimeInput = document.getElementById('start-time');
  const endTimeInput = document.getElementById('end-time');

  function updateEndTime() {
      if (startTimeInput.value) {
          const startTime = new Date(`2000-01-01T${startTimeInput.value}`);
          let endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
          endTimeInput.min = endTime.toTimeString().slice(0, 5);
          
          if (endTimeInput.value) {
              const selectedEndTime = new Date(`2000-01-01T${endTimeInput.value}`);
              if (selectedEndTime <= startTime) {
                  endTimeInput.value = endTime.toTimeString().slice(0, 5);
              }
          } else {
              endTimeInput.value = endTime.toTimeString().slice(0, 5);
          }
      } else {
          endTimeInput.value = '';
          endTimeInput.min = '';
      }
  }

  startTimeInput.addEventListener('change', updateEndTime);
  endTimeInput.addEventListener('change', function() {
      const startTime = new Date(`2000-01-01T${startTimeInput.value}`);
      const endTime = new Date(`2000-01-01T${endTimeInput.value}`);
      
      if (endTime <= startTime || (endTime - startTime) < 60 * 60 * 1000) {
          updateEndTime();
      }
  });
});

  
