document.addEventListener('DOMContentLoaded', function() {
  initializeLogo();
  initializeTeamLogin();
  initializeAdminLogin();
  initializeModeratorLogin();
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
      const loginStatus = localStorage.getItem('isLoggedIn');
      if (loginStatus === 'admin') {
        window.location.href = 'admin.html'; // Redirect if already logged in
      } else {
        displayAdminLoginForm();
      }
    });
  }
}

function displayAdminLoginForm() {
  closeAllLoginForms();
  const adminUsers = [
    { username: '1', password: '1' },
    { username: '2', password: '2' }
  ];
  const adminPage = 'admin.html';

  let adminForm = document.getElementById('admin-form');
  
  if (!adminForm) {
    adminForm = document.createElement('div');
    adminForm.id = 'admin-form';
    adminForm.className = 'admin-form';
    adminForm.innerHTML = `
      <button id="close-admin" class="close-button">X</button>
      <h2>Admin Login</h2>
      <input type="text" id="admin-username" placeholder="Username" autocomplete="new-password">
      <input type="password" id="admin-password" placeholder="Password" autocomplete="new-password">
      <button id="admin-submit" class="submit-button">Submit</button>
      <p id="admin-error-message"></p>
    `;
    document.body.appendChild(adminForm);
  }

  adminForm.style.display = 'block';

  // Clear input fields immediately
  const adminUsernameInput = adminForm.querySelector('#admin-username');
  const adminPasswordInput = adminForm.querySelector('#admin-password');
  adminUsernameInput.value = '';
  adminPasswordInput.value = '';

  // Clear input fields again after a short delay
  setTimeout(() => {
    adminUsernameInput.value = '';
    adminPasswordInput.value = '';
  }, 100);

  const closeAdminButton = adminForm.querySelector('#close-admin');
  closeAdminButton.addEventListener('click', function() {
    adminForm.style.display = 'none';
  });

  const adminSubmitButton = adminForm.querySelector('#admin-submit');
  adminSubmitButton.addEventListener('click', function() {
    const adminUsernameInput = adminForm.querySelector('#admin-username');
    const adminPasswordInput = adminForm.querySelector('#admin-password');
    const adminErrorMessage = adminForm.querySelector('#admin-error-message');
    let isValid = false;
    for (let i = 0; i < adminUsers.length; i++) {
      if (adminUsernameInput.value === adminUsers[i].username && adminPasswordInput.value === adminUsers[i].password) {
        isValid = true;
        break;
      }
    }
    if (isValid) {
      localStorage.setItem('isLoggedIn', 'admin'); // Store login status
      showAcademyMembersLink(); // Show the link after successful login
      adminErrorMessage.textContent = `Access granted for Admin!`;
      adminErrorMessage.style.color = 'green';
      setTimeout(() => {
        adminForm.style.display = 'none';
        window.location.href = 'admin.html';
      }, 1000);
    } else {
      adminErrorMessage.textContent = 'Incorrect username or password. Access denied.';
      adminErrorMessage.style.color = 'red';
    }
  });
}

function initializeModeratorLogin() {
  const moderatorLink = document.querySelector('a[href="#moderator"]');
  if (moderatorLink) {
    moderatorLink.addEventListener('click', function(event) {
      event.preventDefault();
      const loginStatus = localStorage.getItem('isLoggedIn');
      if (loginStatus === 'moderator') {
        window.location.href = 'moderator.html'; // Redirect if already logged in
      } else {
        displayModeratorLoginForm();
      }
    });
  }
}

function displayModeratorLoginForm() {
  closeAllLoginForms();
  const moderatorUsers = [
    { username: '10', password: '10' }
  ];
  const moderatorPage = 'moderator.html';

  let moderatorForm = document.getElementById('moderator-form');
  
  if (!moderatorForm) {
    moderatorForm = document.createElement('div');
    moderatorForm.id = 'moderator-form';
    moderatorForm.className = 'moderator-form';
    moderatorForm.innerHTML = `
      <button id="close-moderator" class="close-button">X</button>
      <h2>Moderator Login</h2>
      <input type="text" id="moderator-username" placeholder="Username" autocomplete="new-password">
      <input type="password" id="moderator-password" placeholder="Password" autocomplete="new-password">
      <button id="moderator-submit" class="submit-button">Submit</button>
      <p id="moderator-error-message"></p>
    `;
    document.body.appendChild(moderatorForm);
  }

  moderatorForm.style.display = 'block';

  // Clear input fields immediately
  const moderatorUsernameInput = moderatorForm.querySelector('#moderator-username');
  const moderatorPasswordInput = moderatorForm.querySelector('#moderator-password');
  moderatorUsernameInput.value = '';
  moderatorPasswordInput.value = '';

  // Clear input fields again after a short delay
  setTimeout(() => {
    moderatorUsernameInput.value = '';
    moderatorPasswordInput.value = '';
  }, 100);

  const closeModeratorButton = moderatorForm.querySelector('#close-moderator');
  closeModeratorButton.addEventListener('click', function() {
    moderatorForm.style.display = 'none';
  });

  const moderatorSubmitButton = moderatorForm.querySelector('#moderator-submit');
  moderatorSubmitButton.addEventListener('click', function() {
    const moderatorUsernameInput = moderatorForm.querySelector('#moderator-username');
    const moderatorPasswordInput = moderatorForm.querySelector('#moderator-password');
    const moderatorErrorMessage = moderatorForm.querySelector('#moderator-error-message');
    let isValid = false;
    for (let i = 0; i < moderatorUsers.length; i++) {
      if (moderatorUsernameInput.value === moderatorUsers[i].username && moderatorPasswordInput.value === moderatorUsers[i].password) {
        isValid = true;
        break;
      }
    }
    if (isValid) {
      localStorage.setItem('isLoggedIn', 'moderator'); // Store login status
      showAcademyMembersLink(); // Show the link after successful login
      moderatorErrorMessage.textContent = `Access granted for Moderator!`;
      moderatorErrorMessage.style.color = 'green';
      setTimeout(() => {
        moderatorForm.style.display = 'none';
        window.location.href = 'moderator.html';
      }, 1000);
    } else {
      moderatorErrorMessage.textContent = 'Incorrect username or password. Access denied.';
      moderatorErrorMessage.style.color = 'red';
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

  const moderatorForm = document.getElementById('moderator-form');
  if (moderatorForm) {
    moderatorForm.style.display = 'none';
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

  setupTimeInputs();
  setupDatePicker();
}

function setupTimeInputs() {
  const startTimeInput = document.getElementById('start-time');
  const endTimeInput = document.getElementById('end-time');

  if (startTimeInput && endTimeInput) {
    startTimeInput.step = 3600; // 1 hour in seconds
    endTimeInput.step = 3600;

    startTimeInput.addEventListener('change', function() {
      this.value = roundToNearestHour(this.value);
      updateEndTime();
    });

    endTimeInput.addEventListener('change', function() {
      this.value = roundToNearestHour(this.value);
    });
  }
}

function roundToNearestHour(time) {
  const [hours, minutes] = time.split(':');
  return `${hours}:00`;
}

function updateEndTime() {
  const startTimeInput = document.getElementById('start-time');
  const endTimeInput = document.getElementById('end-time');

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

    // Check if the time slot is already reserved
    const selectedDate = document.getElementById('reservation-date').value;
    if (isTimeSlotReserved(selectedDate, startTimeInput.value, endTimeInput.value)) {
      alert('This time slot is already reserved. Please choose a different time.');
      startTimeInput.value = '';
      endTimeInput.value = '';
    }
  } else {
    endTimeInput.value = '';
    endTimeInput.min = '';
  }
}

function setupDatePicker() {
  const dateInput = document.getElementById('day');
  if (dateInput) {
    dateInput.type = 'date';
    dateInput.id = 'reservation-date';
    dateInput.min = new Date().toISOString().split('T')[0]; // Set min date to today
  }
}

function isTimeSlotReserved(date, startTime, endTime) {
  const approvedReservations = JSON.parse(localStorage.getItem('approvedReservations') || '[]');
  return approvedReservations.some(reservation => 
    reservation.day === date &&
    ((startTime >= reservation.startTime && startTime < reservation.endTime) ||
     (endTime > reservation.startTime && endTime <= reservation.endTime) ||
     (startTime <= reservation.startTime && endTime >= reservation.endTime))
  );
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
  const day = document.querySelector('#reservation-date').value;
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
    
    // Update localStorage
    const approvedReservations = JSON.parse(localStorage.getItem('approvedReservations') || '[]');
    approvedReservations.push(reservationData);
    localStorage.setItem('approvedReservations', JSON.stringify(approvedReservations));
    localStorage.removeItem('reservationData');
    
    reservationContainer.remove();

    // Update the opener window (main page)
    if (window.opener) {
      // Add the reservation to the table in the opener window
      const table = window.opener.document.querySelector('#reservation-table');
      if (table) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${reservationData.day}</td>
          <td>${reservationData.startTime} - ${reservationData.endTime}</td>
          <td>${reservationData.name} ${reservationData.familyName}</td>
        `;
        table.appendChild(tr);
      }

      // Refresh the opener window
      window.opener.location.reload();
    }

    // Close the admin window
    window.close();
  });

  document.querySelector('#reject-reservation').addEventListener('click', function() {
    alert('Reservation rejected!');
    localStorage.removeItem('reservationData');
    reservationContainer.remove();
    window.close();
  });
}

function showAcademyMembersLink() {
  const academyMembersLink = document.getElementById('academy-members-link');
  if (academyMembersLink) {
    academyMembersLink.style.display = 'block'; // Show the link
  }
}

function signOut() {
  localStorage.removeItem('isLoggedIn'); // Clear login status
  localStorage.removeItem('approvedReservations'); // Clear approved reservations
  localStorage.removeItem('reservationData'); // Clear reservation data
  localStorage.removeItem('members'); // Clear members data
  localStorage.removeItem('moderators'); // Clear moderators data
  const academyMembersLink = document.getElementById('academy-members-link');
  if (academyMembersLink) {
    academyMembersLink.style.display = 'none'; // Hide the link
  }
  // Remove sign-out button from the navbar
  const signOutButton = document.querySelector('.navbar-links a[href="#"]');
  if (signOutButton) {
    signOutButton.remove(); // Remove the button from the navbar
  }
  // Auto refresh the page
  setTimeout(function() {
    location.reload();
  }, 1000);
}

// Check login status on page load and add sign-out button if admin or moderator are signed in
window.addEventListener('load', function() {
  const loginStatus = localStorage.getItem('isLoggedIn');
  if (loginStatus) {
    showAcademyMembersLink(); // Show the link if logged in
    // Add sign-out button functionality to the navbar if not already added
    const signOutButton = document.querySelector('.navbar-links a[href="#"]');
    if (!signOutButton) {
      const newSignOutButton = document.createElement('a');
      newSignOutButton.textContent = 'Sign Out';
      newSignOutButton.href = '#';
      newSignOutButton.className = 'sign-out-button'; // Add a different CSS class to the sign-out button
      newSignOutButton.style.background = '#ff4d4d'; // Background color
      newSignOutButton.style.color = '#fff'; // Text color
      newSignOutButton.style.padding = '2px 5px'; // Further reduced padding for an even smaller button
      newSignOutButton.style.borderRadius = '5px'; // Border radius
      newSignOutButton.style.cursor = 'pointer'; // Cursor style
      newSignOutButton.style.transition = 'background 0.3s ease-in-out'; // Transition effect
      newSignOutButton.addEventListener('click', function(e) {
        e.preventDefault();
        signOut();
      });
      newSignOutButton.addEventListener('mouseover', function() {
        newSignOutButton.style.background = '#ff8080'; // Hover background color
      });
      newSignOutButton.addEventListener('mouseout', function() {
        newSignOutButton.style.background = '#ff4d4d'; // Default background color
      });
      document.querySelector('.navbar-links').appendChild(newSignOutButton); // Add the button to the navbar
    }
  }
});

document.getElementById('phone').addEventListener('input', function(e) {
  var phone = e.target.value.replace(/\D/g, '');
  var isValid = /^(05[0-9]{8}|9[0-9]{8})$/.test(phone);
  
  if (isValid) {
      e.target.setCustomValidity('');
  } else {
      e.target.setCustomValidity('الرجاء إدخال رقم هاتف فلسطيني أو إسرائيلي صحيح');
  }
});