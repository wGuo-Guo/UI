// Interactive functionality for Delta Force Game UI

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const askButton = document.getElementById('ask-question');
    const answerDisplay = document.getElementById('answer-display');
    
    // Additional game information for interactive responses
    const gameInfo = {
        chinese: [
            "Delta Force系列游戏以其大规模开放世界和远程狙击而著称。",
            "游戏采用了先进的Voxel技术来渲染地形，提供了前所未有的视觉体验。",
            "最新的Delta Force: Hawk Ops结合了经典玩法和现代图形技术。",
            "该系列游戏历史悠久，影响了许多后来的军事射击游戏。",
            "游戏支持多人合作模式，玩家可以组队完成任务。"
        ],
        english: [
            "The Delta Force series is renowned for its large-scale open worlds and long-range sniping gameplay.",
            "The games utilized advanced Voxel technology for terrain rendering, providing unprecedented visual experiences.",
            "The latest Delta Force: Hawk Ops combines classic gameplay with modern graphics technology.",
            "This game series has a long history and has influenced many subsequent military shooter games.",
            "The games support multiplayer cooperative modes where players can team up to complete missions."
        ]
    };
    
    let currentInfoIndex = 0;
    let isAnswerVisible = false;
    
    // Button click handler
    askButton.addEventListener('click', function() {
        if (!isAnswerVisible) {
            showAnswer();
        } else {
            showNextInfo();
        }
    });
    
    // Function to show the answer
    function showAnswer() {
        answerDisplay.classList.remove('hidden');
        answerDisplay.style.opacity = '0';
        
        // Animate the appearance
        setTimeout(() => {
            answerDisplay.style.opacity = '1';
        }, 100);
        
        askButton.textContent = '了解更多 / Learn More';
        isAnswerVisible = true;
    }
    
    // Function to show next information
    function showNextInfo() {
        if (currentInfoIndex < gameInfo.chinese.length) {
            // Create new content
            const newContent = `
                <p>${gameInfo.chinese[currentInfoIndex]}</p>
                <p>${gameInfo.english[currentInfoIndex]}</p>
            `;
            
            // Fade out current content
            answerDisplay.style.opacity = '0';
            
            // Update content after fade out
            setTimeout(() => {
                answerDisplay.innerHTML = newContent;
                answerDisplay.style.opacity = '1';
                currentInfoIndex++;
                
                // Check if we've shown all info
                if (currentInfoIndex >= gameInfo.chinese.length) {
                    askButton.textContent = '重新开始 / Start Over';
                    currentInfoIndex = 0;
                }
            }, 300);
        }
    }
    
    // Add smooth scroll behavior for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.info-card, .feature-item, .series-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero description
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing effect on page load
    const heroDescriptions = document.querySelectorAll('.hero-description');
    if (heroDescriptions.length > 0) {
        setTimeout(() => {
            heroDescriptions.forEach((desc, index) => {
                const originalText = desc.textContent;
                setTimeout(() => {
                    typeWriter(desc, originalText, 30);
                }, index * 2000);
            });
        }, 1000);
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Add fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all main sections
    const sections = document.querySelectorAll('.main-content section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    console.log('Delta Force Game UI loaded successfully! 三角洲行动游戏界面加载完成！');
});