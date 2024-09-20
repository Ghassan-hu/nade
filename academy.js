const members = JSON.parse(localStorage.getItem('members')) || [];

const memberDetailsDiv = document.getElementById('member-details');

if (members.length > 0) {
    members.forEach(member => {
        // Save member photo to localStorage if it exists
        if (member.photo) {
            localStorage.setItem(`photo-${member.nationalId}`, member.photo);
        }
        memberDetailsDiv.innerHTML += `
            <div>
               ${member.photo ? `<img id="member-photo-${member.nationalId}" src="${localStorage.getItem(`photo-${member.nationalId}`) || member.photo}" alt="Member Photo" onerror="this.onerror=null; this.src='fallback-image.jpg';" />` : ''}
                <p><strong>الاسم:</strong> ${member.name}</p>
                <p><strong>الهاتف:</strong> ${member.phone}</p>
                <p><strong>رقم الهوية الوطنية:</strong> ${member.nationalId}</p>
                <p><strong>الحالة:</strong> ${member.status}</p>
                <p><strong>مبلغ الدفع:</strong> ${member.paymentAmount}</p>
                <p><strong>تاريخ الدفع:</strong> ${member.paymentDate}</p>
                <p><strong>تاريخ انتهاء الدفع:</strong> ${member.paymentEndDate}</p>
            </div>
            <hr />
        `;
    });
} else {
    memberDetailsDiv.innerText = 'No member data found.';
}

// Add a button to delete all member data
const deleteButton = document.createElement('button');
deleteButton.id = 'delete-button';
deleteButton.innerText = 'حذف الكل';
deleteButton.onclick = () => {
    localStorage.removeItem('members');
    memberDetailsDiv.innerHTML = ''; // Clear the displayed members
    memberDetailsDiv.innerText = 'No member data found.'; // Reset message
};
document.body.appendChild(deleteButton);