// feedback.js
document.addEventListener('DOMContentLoaded', () => {
    const feedbackList = document.getElementById('feedback-list');
    const feedbackFormSection = document.getElementById('feedback-form-section');
    const loginPrompt = document.getElementById('login-prompt');
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackText = document.getElementById('feedback-text');

    const currentUser = getCurrentUser();

    if (currentUser) {
        feedbackFormSection.classList.remove('hidden');
    } else {
        loginPrompt.classList.remove('hidden');
    }

    // Default mock data
    const defaultFeedback = [
        {
            author: 'Sarah Jenkins',
            date: 'Oct 12, 2026',
            text: 'The LactoCheck Pro has completely streamlined our collection center. Instant results mean shorter lines for our farmers.'
        },
        {
            author: 'Alpine Dairies',
            date: 'Oct 10, 2026',
            text: 'Incredible accuracy on the adulteration screening. It saved us from a contaminated batch just last week.'
        }
    ];

    function loadFeedback() {
        const stored = localStorage.getItem('lactolyze_feedback');
        if (stored) {
            return JSON.parse(stored);
        }
        return defaultFeedback;
    }

    function renderFeedback() {
        const data = loadFeedback();
        feedbackList.innerHTML = '';
        
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'feedback-item';
            div.innerHTML = `
                <div class="feedback-meta">
                    <span class="feedback-author">${item.author}</span>
                    <span>${item.date}</span>
                </div>
                <p>${item.text}</p>
            `;
            feedbackList.appendChild(div);
        });
    }

    if(feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = feedbackText.value.trim();
            if (!text) return;

            const data = loadFeedback();
            const newFeedback = {
                author: currentUser,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                text: text
            };

            // Add to top of list
            data.unshift(newFeedback);
            localStorage.setItem('lactolyze_feedback', JSON.stringify(data));
            
            feedbackText.value = '';
            renderFeedback();
        });
    }

    renderFeedback();
});
