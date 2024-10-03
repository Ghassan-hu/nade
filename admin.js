function getAdminName() {
    let adminName = localStorage.getItem('adminName');
    if (!adminName) {
        adminName = prompt('Please enter your name:');
        localStorage.setItem('adminName', adminName);
    }
    return adminName;
}

function updateReservationTable() {
    // ... (implementation of updateReservationTable function)
}
function sendWhatsAppMessage(recipientPhone, name, day, startTime, endTime, price) {
    const senderPhone = '0543923782';
    const countryCode = recipientPhone.startsWith('05') ? '972' : '970';
    const formattedRecipientPhone = `${countryCode}${recipientPhone.slice(1)}`;
    const message = encodeURIComponent(`مرحبًا ${name}، تمت الموافقة على حجزك!\n\nالتفاصيل:\nاليوم: ${day}\nوقت البدء: ${startTime}\nوقت الانتهاء: ${endTime}\nالسعر الإجمالي: ${price} شيكل\n\nشكرًا لحجزك!`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedRecipientPhone}&text=${message}`;
    window.open(whatsappUrl, '_blank');
}
function sendRejectionMessage(recipientPhone, name, day, startTime, endTime) {
    const senderPhone = '0543923782';
    const countryCode = recipientPhone.startsWith('05') ? '972' : '970';
    const formattedRecipientPhone = `${countryCode}${recipientPhone.slice(1)}`;
    const message = encodeURIComponent(`مرحبًا ${name}،\n\nنأسف لإبلاغك أنه تم رفض طلب حجزك للتاريخ والوقت التاليين:\n\nاليوم: ${day}\nوقت البدء: ${startTime}\nوقت الانتهاء: ${endTime}\n\nنشكرك على تفهمك. إذا كان لديك أي استفسارات، يرجى التواصل معنا.`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedRecipientPhone}&text=${message}`;
    window.open(whatsappUrl, '_blank');
}
function saveReservationStatus(reservationData, status) {
    const savedReservations = JSON.parse(localStorage.getItem('savedReservations') || '[]');
    reservationData.status = status;
    reservationData.adminName = getAdminName();
    reservationData.actionDate = new Date().toLocaleString();
    
    // Add user number
    const userNumber = savedReservations.length + 1;
    reservationData.userNumber = `User ${userNumber}`;

    savedReservations.unshift(reservationData);
    localStorage.setItem('savedReservations', JSON.stringify(savedReservations));

    // Update the appropriate localStorage array
    if (status === 'تمت الموافقة') {
        const approvedReservations = JSON.parse(localStorage.getItem('approvedReservations') || '[]');
        approvedReservations.push(reservationData);
        localStorage.setItem('approvedReservations', JSON.stringify(approvedReservations));
    } else if (status === 'مرفوض') {
        const rejectedReservations = JSON.parse(localStorage.getItem('rejectedReservations') || '[]');
        rejectedReservations.push(reservationData);
        localStorage.setItem('rejectedReservations', JSON.stringify(rejectedReservations));
    }

    updateSavedReservationsDisplay();
}

function updateSavedReservationsDisplay(searchTerm = '') {
    const approvedContainer = document.querySelector('#approved-reservations .saved-reservations-grid');
    const rejectedContainer = document.querySelector('#rejected-reservations .saved-reservations-grid');
    approvedContainer.innerHTML = '';
    rejectedContainer.innerHTML = '';
    const savedReservations = JSON.parse(localStorage.getItem('savedReservations') || '[]');

    let firstMatchFound = false;

    savedReservations.forEach((reservationData, index) => {
        const reservationElement = document.createElement('div');
        reservationElement.className = 'saved-reservation';
        const isMatch = searchTerm && reservationData.phone.includes(searchTerm);

        if (isMatch) {
            reservationElement.classList.add('search-result');
            reservationElement.classList.add(`status-${reservationData.status === 'تمت الموافقة' ? 'approved' : 'rejected'}`);
            if (!firstMatchFound) {
                reservationElement.classList.add('first-match');
                firstMatchFound = true;
            }
        }

        reservationElement.innerHTML = `
        <p><strong>رقم المستخدم:</strong> ${reservationData.userNumber || `User ${savedReservations.length - index}`}</p>
        <p><strong>الاسم:</strong> ${reservationData.name} ${reservationData.familyName}</p>
        <p><strong>الهاتف:</strong> ${reservationData.phone}</p>
        <p><strong>اليوم:</strong> ${reservationData.day}</p>
        <p><strong>الوقت:</strong> ${reservationData.startTime} - ${reservationData.endTime}</p>
        <p><strong>الحالة:</strong> <span class="status-${reservationData.status === 'تمت الموافقة' ? 'approved' : 'rejected'}">${reservationData.status}</span></p>
        <p><strong>تاريخ الإجراء:</strong> ${reservationData.actionDate}</p>
    `;

        if (reservationData.status === 'تمت الموافقة') {
            approvedContainer.appendChild(reservationElement);
        } else if (reservationData.status === 'مرفوض') {
            rejectedContainer.appendChild(reservationElement);
        }
    });

    const firstMatch = document.querySelector('.first-match');
    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showPopupMessage(message) {
    const popup = document.getElementById('popup-message');
    popup.textContent = message;
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 1000);
}

function fetchAndDisplayReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const reservationContainer = document.querySelector('#reservation-container');
    reservationContainer.innerHTML = ''; // Clear existing cards

    reservations.forEach((reservationData, index) => {
        const reservationCard = document.createElement('div');
        reservationCard.className = 'reservation-card';
        reservationCard.innerHTML = `
        <p><strong>رقم المستخدم:</strong> User ${index + 1}</p>
        <p>الاسم: ${reservationData.name}</p>
        <p>اسم العائلة: ${reservationData.familyName}</p>
        <p>الهاتف: ${reservationData.phone}</p>
        <p>اليوم: ${reservationData.day}</p>
        <p>وقت البدء: ${reservationData.startTime}</p>
        <p>وقت الانتهاء: ${reservationData.endTime}</p>
        <button class="approve-reservation" data-index="${index}">موافقة</button>
        <button class="reject-reservation" data-index="${index}" style="background-color: red;">رفض</button>
    `;
        reservationContainer.appendChild(reservationCard);
    });
}

window.addEventListener('load', function () {
    // Initial fetch and display
    fetchAndDisplayReservations();

    // Disable auto-refresh
    // setInterval(fetchAndDisplayReservations, 5000); // Commented out to disable auto-refresh

    // Prevent screen resizing on input focus
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('focus', function () {
        this.blur(); // Remove focus to prevent resizing
    });

    document.getElementById('clear-table').addEventListener('click', function () {
        document.getElementById('confirmation-popup').style.display = 'flex';
    });

    document.getElementById('confirm-clear').addEventListener('click', function () {
        localStorage.removeItem('reservations');
        localStorage.removeItem('approvedReservations');
        document.getElementById('reservation-container').innerHTML = '';
        localStorage.setItem('clearReservationTable', 'true');
        document.getElementById('confirmation-popup').style.display = 'none';
        showPopupMessage('تم حذف جميع الحجوزات.');
    });

    document.getElementById('cancel-clear').addEventListener('click', function () {
        document.getElementById('confirmation-popup').style.display = 'none';
    });

    document.getElementById('clear-saved-reservations').addEventListener('click', function () {
        localStorage.removeItem('savedReservations');
        updateSavedReservationsDisplay();
        showPopupMessage('تم مسح جميع الحجوزات المحفوظة.');
    });

    updateSavedReservationsDisplay();

    const reservationContainer = document.getElementById('reservation-container');
    reservationContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('approve-reservation') ||
            event.target.classList.contains('reject-reservation')) {
            const index = event.target.getAttribute('data-index');
            const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
            const reservationData = reservations[index];

            if (event.target.classList.contains('approve-reservation')) {
                sendWhatsAppMessage(
                    reservationData.phone,
                    reservationData.name,
                    reservationData.day,
                    reservationData.startTime,
                    reservationData.endTime,
                    reservationData.price
                );

                saveReservationStatus(reservationData, 'تمت الموافقة');
            } else {
                sendRejectionMessage(
                    reservationData.phone,
                    reservationData.name,
                    reservationData.day,
                    reservationData.startTime,
                    reservationData.endTime
                );

                saveReservationStatus(reservationData, 'مرفوض');
            }

            reservations.splice(index, 1);
            localStorage.setItem('reservations', JSON.stringify(reservations));
            // Refresh the display immediately after approval/rejection
            fetchAndDisplayReservations();
            updateSavedReservationsDisplay();
        }
    });
});

function addMember() {
    // Gather input values
    const name = document.getElementById('member-name').value;
    const phone = document.getElementById('member-phone').value;
    const nationalId = document.getElementById('member-national-id').value;
    const status = document.getElementById('member-status').value;
    const paymentAmount = document.getElementById('member-payment-amount').value;
    const paymentDate = document.getElementById('member-payment-date').value;
    const paymentEndDate = document.getElementById('member-payment-end-date').value;
    const photoInput = document.getElementById('member-photo');
    let photo = null;

    // Check if a photo is selected
    if (photoInput.files.length > 0) {
        photo = photoInput.files[0];
    }

    // Check if all fields are complete
    if (!name || !phone || !nationalId || !status || !paymentAmount || !paymentDate || !paymentEndDate || !photo) {
        alert('يرجى إكمال جميع الحقول');
        return;
    }

    // Create an object to hold the new member data
    const newMember = {
        name,
        phone,
        nationalId,
        status,
        paymentAmount,
        paymentDate,
        paymentEndDate,
        photo: photo ? URL.createObjectURL(photo) : null // Create a URL for the photo
    };

    // Retrieve existing members from localStorage or initialize an empty array
    const existingMembers = JSON.parse(localStorage.getItem('members')) || [];

    // Add the new member to the existing members array
    existingMembers.push(newMember);

    // Store the updated members array back in localStorage
    localStorage.setItem('members', JSON.stringify(existingMembers));

    // Show a success message
    const successMessage = document.createElement('div');
    successMessage.style.position = 'fixed';
    successMessage.style.top = '50%';
    successMessage.style.left = '50%';
    successMessage.style.transform = 'translate(-50%, -50%)';
    successMessage.style.backgroundColor = 'green';
    successMessage.style.color = 'white';
    successMessage.style.padding = '20px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.zIndex = '1000';
    successMessage.innerText = 'تم إضافة العضو بنجاح!';
    document.body.appendChild(successMessage);
    setTimeout(() => document.body.removeChild(successMessage), 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbarLinks = document.querySelector('.navbar-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const welcomeMessage = document.getElementById('welcome-message');

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        navbarLinks.classList.toggle('show');
    });

    // Handle navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
            navbarLinks.classList.remove('show');
        });
    });

    // Show welcome message
    function showWelcomeMessage(adminName) {
        welcomeMessage.textContent = `مرحبًا ${adminName}`;
        welcomeMessage.style.display = 'block';
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
        }, 2000);
    }

    // Example: Show welcome message when page loads
    // Replace 'Admin Name' with the actual admin name from your authentication system
    showWelcomeMessage('Admin Name');

    // Show the reservations section by default
    document.getElementById('reservations').classList.add('active');
});