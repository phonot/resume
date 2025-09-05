// Terminal-themed Resume Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Password protection
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const correctPassword = 'hoysala';
    
    // Theme toggle elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Password input event listener
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Focus on password input when page loads
    passwordInput.focus();
    
    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === correctPassword) {
            // Correct password - show main content
            errorMessage.textContent = '';
            passwordInput.value = '';
            
            // Add typing effect
            typeWriter('ACCESS_GRANTED...', function() {
                setTimeout(() => {
                    passwordScreen.style.opacity = '0';
                    setTimeout(() => {
                        passwordScreen.style.display = 'none';
                        mainContent.classList.remove('hidden');
                        mainContent.style.opacity = '1';
                        
                        // Add terminal boot effect
                        bootTerminal();
                    }, 500);
                }, 1000);
            });
        } else {
            // Wrong password
            errorMessage.textContent = 'ERROR: Invalid access key. Access denied.';
            passwordInput.value = '';
            passwordInput.style.borderColor = 'var(--error-color)';
            
            setTimeout(() => {
                passwordInput.style.borderColor = 'var(--terminal-border)';
            }, 2000);
        }
    }
    
    function typeWriter(text, callback) {
        const prompt = document.querySelector('.login-prompt .prompt');
        const cursor = document.querySelector('.login-prompt .cursor');
        let i = 0;
        
        cursor.style.display = 'none';
        
        function type() {
            if (i < text.length) {
                prompt.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(callback, 500);
            }
        }
        
        type();
    }
    
    function bootTerminal() {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save theme preference
        localStorage.setItem('theme', newTheme);
        
        // Update theme icon
        updateThemeIcon(newTheme);
        
        // Add terminal effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.textContent = '[DARK]';
        } else {
            themeIcon.textContent = '[LIGHT]';
        }
    }
    
    // Add terminal typing effect to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const command = header.querySelector('.command');
        if (command) {
            const originalText = command.textContent;
            command.textContent = '';
            
            setTimeout(() => {
                typeText(command, originalText, 50);
            }, Math.random() * 1000);
        }
    });
    
    function typeText(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Add hover effects to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(0, 255, 0, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add click effect to project links
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add terminal effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Add ripple effect
            addRippleEffect(this, e);
        });
    });
    
    // Add ripple effect function
    function addRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add terminal cursor blinking effect
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    });
    
    // Add matrix rain effect (subtle)
    createMatrixRain();
});

// Certificate modal functions
function openCertificate(certId) {
    const modal = document.getElementById('certificate-modal');
    const image = document.getElementById('certificate-image');
    
    // Map certificate IDs to image paths
    const certificateImages = {
        'cert1': '1.jpg',
        'cert2': '2.jpg',
        'cert3': '3.jpg',
        'cert4': '4.jpg',
        'cert5': '5.jpg',
        'cert6': '6.jpg'
    };
    
    image.src = certificateImages[certId] || certificateImages['cert1'];
    modal.classList.add('show');
    
    // Add terminal effect
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
}

function closeCertificate() {
    const modal = document.getElementById('certificate-modal');
    
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.remove('show');
        modal.style.transition = 'none';
    }, 300);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('certificate-modal');
    if (e.target === modal) {
        closeCertificate();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCertificate();
    }
});

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const font_size = 10;
    const columns = canvas.width / font_size;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff00';
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000000';
        }
        
        ctx.font = font_size + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);
            
            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .project-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 0, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .certificate-modal {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);