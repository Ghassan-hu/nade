document.addEventListener('DOMContentLoaded', function() {
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
    logo.style.transform = 'translateX(-3000%)';
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
});

document.addEventListener('DOMContentLoaded', function() {
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
});

function displayTeamLoginForm(teamName, username, password, page) {
  const form = document.createElement('div');
  form.style.position = 'fixed';
  form.style.top = '50%';
  form.style.left = '50%';
  form.style.transform = 'translate(-50%, -50%)';
  form.style.backgroundColor = 'white';
  form.style.padding = '50px';
  form.style.border = '4px solid black';
  form.style.borderRadius = '20px';
  form.style.boxShadow = '0px 0px 20px rgba(0,0,0,0.5)';
  form.style.fontSize = '24px';
  form.innerHTML = `
    <button id="close" style="position: absolute; top: 20px; right: 20px; background-color: transparent; border: none; font-size: 30px;">X</button>
    <h2 style="font-size: 36px;">Login for ${teamName}</h2>
    <input type="text" id="username" placeholder="Username" style="margin-bottom: 20px; font-size: 24px; padding: 10px;">
    <input type="password" id="password" placeholder="Password" style="margin-bottom: 30px; font-size: 24px; padding: 10px;">
    <button id="submit" style="padding: 20px 40px; font-size: 24px;">Submit</button>
    <p id="error-message" style="color: red; font-size: 24px;"></p>
  `;
  document.body.appendChild(form);
  const closeButton = form.querySelector('#close');
  closeButton.addEventListener('click', function() {
    form.remove();
  });
  const submitButton = form.querySelector('#submit');
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

const adminUsername = '1';
const adminPassword = '1';
const adminPage = 'admin.html';

document.querySelector('a[href="#admin"]').addEventListener('click', function(event) {
  event.preventDefault();
  displayAdminLoginForm();
});

function displayAdminLoginForm() {
  const adminForm = document.createElement('div');
  adminForm.style.position = 'fixed';
  adminForm.style.top = '50%';
  adminForm.style.left = '50%';
  adminForm.style.transform = 'translate(-50%, -50%)';
  adminForm.style.backgroundColor = 'white';
  adminForm.style.padding = '50px';
  adminForm.style.border = '4px solid black';
  adminForm.style.borderRadius = '20px';
  adminForm.style.boxShadow = '0px 0px 20px rgba(0,0,0,0.5)';
  adminForm.style.fontSize = '24px';
  adminForm.innerHTML = `
    <button id="close-admin" style="position: absolute; top: 20px; right: 20px; background-color: transparent; border: none; font-size: 30px;">X</button>
    <h2 style="font-size: 36px;">Admin Login</h2>
    <input type="text" id="admin-username" placeholder="Username" style="margin-bottom: 20px; font-size: 24px; padding: 10px;">
    <input type="password" id="admin-password" placeholder="Password" style="margin-bottom: 30px; font-size: 24px; padding: 10px;">
    <button id="admin-submit" style="padding: 20px 40px; font-size: 24px;">Submit</button>
    <p id="admin-error-message" style="color: red; font-size: 24px;"></p>
  `;
  document.body.appendChild(adminForm);
  const closeAdminButton = adminForm.querySelector('#close-admin');
  closeAdminButton.addEventListener('click', function() {
    adminForm.remove();
  });
  const adminSubmitButton = adminForm.querySelector('#admin-submit');
  adminSubmitButton.addEventListener('click', function() {
    const adminUsernameInput = adminForm.querySelector('#admin-username');
    const adminPasswordInput = adminForm.querySelector('#admin-password');
    const adminErrorMessage = adminForm.querySelector('#admin-error-message');
    if (adminUsernameInput.value === adminUsername && adminPasswordInput.value === adminPassword) {
      adminErrorMessage.textContent = `Access granted for Admin!`;
      setTimeout(() => {
        adminForm.remove();
        window.location.href = adminPage;
      }, 1000);
    } else {
      adminErrorMessage.textContent = 'Incorrect username or password. Access denied.';
    }
  });
}

let formSubmitted = false;
let listenerAttached = false;

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

  // Calculate price
  const price = calculatePrice(startTime, endTime);
  reservationData.price = price;

  // Get existing reservations or initialize an empty array
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

    // Reset the form submission flag after 5 seconds
    setTimeout(() => {
      formSubmitted = false;
      reservationMessage.innerHTML = '';
    }, 5000);
  }
}

function initializeReservationSystem() {
  console.log('Initializing reservation system');
  const reservationForm = document.getElementById('reservation-form');
  
  if (reservationForm && !listenerAttached) {
    console.log('Found reservation form, adding event listener');
    reservationForm.addEventListener('submit', handleReservationSubmit);
    listenerAttached = true;
    console.log('Event listener attached');
  } else if (listenerAttached) {
    console.log('Event listener already attached, skipping');
  } else {
    console.log('Reservation form not found');
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

// Use a self-executing function to ensure the initialization runs only once
(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeReservationSystem);
  } else {
    initializeReservationSystem();
  }
})();

// Remove any existing submit event listeners
window.addEventListener('load', function() {
  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    const clonedForm = reservationForm.cloneNode(true);
    reservationForm.parentNode.replaceChild(clonedForm, reservationForm);
    clonedForm.addEventListener('submit', handleReservationSubmit);
  }
});

window.addEventListener('load', function() {
  if (window.location.href.includes('admin.html')) {
    const reservationData = JSON.parse(localStorage.getItem('reservationData'));
    if (reservationData) {
      displayReservationApproval(reservationData);
    }
  }
});

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
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${reservationData.day}</td>
      <td>${reservationData.startTime} - ${reservationData.endTime}</td>
      <td>${reservationData.name} ${reservationData.familyName}</td>
    `;
    table.appendChild(tr);

    const reservationSection = window.opener.document.querySelector('#reservation-message');
    reservationSection.innerHTML = `
      <p>Reservation Details:</p>
      <p>Name: ${reservationData.name}</p>
      <p>Family Name: ${reservationData.familyName}</p>
      <p>Phone: ${reservationData.phone}</p>
      <p>Day: ${reservationData.day}</p>
      <p>Start Time: ${reservationData.startTime}</p>
      <p>End Time: ${reservationData.endTime}</p>
    `;
  });

  document.querySelector('#reject-reservation').addEventListener('click', function() {
    alert('Reservation rejected!');
    localStorage.removeItem('reservationData');
    reservationContainer.remove();
  });
}

function updateReservationTable() {
  const approvedReservations = JSON.parse(localStorage.getItem('approvedReservations') || '[]');
  const table = document.querySelector('#reservation-table');
  
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

// Run this function when the page loads
window.addEventListener('load', updateReservationTable);

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navbarLinks = document.querySelector('.navbar-links');
  const dropdowns = document.querySelectorAll('.dropdown');
  const navAnchors = navbarLinks.querySelectorAll('a');

  // Function to close the menu
  function closeMenu() {
    navbarLinks.classList.remove('active');
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

  // Close menu when clicking on any link
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navbarLinks && !navbarLinks.contains(e.target) && (!hamburger || !hamburger.contains(e.target))) {
      closeMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('reservation-toggle');
  const dropdown = document.getElementById('reservation-dropdown');
  const reservationForm = document.getElementById('reservation-form');
  const reservationMessage = document.getElementById('reservation-message');

  toggleButton.addEventListener('click', function() {
    dropdown.classList.toggle('active');
    toggleButton.textContent = dropdown.classList.contains('active') ? 'إغلاق' : 'طلب حجز الملعب';
  });

  reservationForm.addEventListener('submit', handleReservationSubmit);
});



