/*import { createIcons, icons } from 'lucide';*/

// State Management
window.currentFlow = ''; // 'register' or 'signin'

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Function
    window.navigateTo = (screenId) => {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            targetScreen.scrollTop = 0;
        }
        // Set flow context
        if (screenId === 'screen-register') window.currentFlow = 'register';
        if (screenId === 'screen-signin') window.currentFlow = 'signin';
    };

    // Modal Functions
    window.showModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    };

    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    };

    // OTP Input Logic
    const otpInputs = document.querySelectorAll('.otp-box');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0) {
                if (index > 0) {
                    otpInputs[index - 1].focus();
                }
            }
        });
    });

    // Mock Keyboard Logic (Visual only for this demo)
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            // Find first empty OTP box
            const emptyBox = Array.from(otpInputs).find(input => input.value === '');
            if (emptyBox && !key.classList.contains('special')) {
                emptyBox.value = key.innerText;
                // Trigger input event manually if needed or focus next
                const index = Array.from(otpInputs).indexOf(emptyBox);
                if (index < otpInputs.length - 1) otpInputs[index + 1].focus();
            }
        });
    });

    // Initialize icons
    createIcons({ icons });
});