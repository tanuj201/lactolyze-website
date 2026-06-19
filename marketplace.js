// marketplace.js
document.addEventListener('DOMContentLoaded', () => {
    const buyBtns = document.querySelectorAll('.buy-btn');
    const modal = document.getElementById('buy-modal');
    const modalDesc = document.getElementById('modal-desc');

    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (requireAuth('login.html')) {
                // User is logged in, show success modal
                const product = btn.getAttribute('data-product');
                modalDesc.textContent = `Thank you for ordering the ${product}. We will process your order shortly.`;
                modal.classList.remove('hidden');
            }
        });
    });

    window.closeModal = function() {
        modal.classList.add('hidden');
    }
});
