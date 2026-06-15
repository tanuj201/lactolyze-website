document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation & Smooth Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Interactive Parameters Simulator
    const paramData = {
        fat: {
            name: 'Fat Content',
            value: '3.82',
            unit: '%',
            progress: '76%',
            color: 'var(--accent-teal)',
            desc: 'Highly accurate measurement for fair pricing. Current sample is within optimal premium range.',
            tags: ['Premium Grade', 'Sample #4902'],
            statusClass: 'badge-success',
            statusColor: '#10B981'
        },
        snf: {
            name: 'Solids-Not-Fat (SNF)',
            value: '8.65',
            unit: '%',
            progress: '85%',
            color: '#3B82F6',
            desc: 'Instant calculation for quality grading. Normal SNF range detected.',
            tags: ['Grade A', 'Optimal Density'],
            statusClass: 'badge-success',
            statusColor: '#10B981'
        },
        protein: {
            name: 'Protein',
            value: '3.21',
            unit: '%',
            progress: '64%',
            color: '#8B5CF6',
            desc: 'Precise protein tracking for nutritional evaluation. Sample meets standard requirements.',
            tags: ['Standard', 'High Nutrition'],
            statusClass: 'badge-success',
            statusColor: '#10B981'
        },
        ph: {
            name: 'pH Level',
            value: '6.72',
            unit: 'pH',
            progress: '50%',
            color: '#F59E0B',
            desc: 'Real-time acidity monitoring to detect spoilage. Slight acidity, but within safe processing limits.',
            tags: ['Monitor', 'Freshness: OK'],
            statusClass: 'badge-warning',
            statusColor: '#F59E0B'
        },
        urea: {
            name: 'Urea (MUN)',
            value: '12.4',
            unit: 'mg/dL',
            progress: '40%',
            color: '#EC4899',
            desc: 'Crucial detection for herd health and feeding efficiency. Balanced nutrition indicated.',
            tags: ['Healthy Herd', 'Normal Range'],
            statusClass: 'badge-success',
            statusColor: '#10B981'
        },
        conductivity: {
            name: 'Conductivity',
            value: '4.8',
            unit: 'mS/cm',
            progress: '30%',
            color: '#F59E0B',
            desc: 'Advanced mastitis screening. Conductivity slightly elevated, potential early-stage warning.',
            tags: ['Review Needed', 'Health Alert'],
            statusClass: 'badge-warning',
            statusColor: '#F59E0B'
        },
        water: {
            name: 'Added Water',
            value: '0.00',
            unit: '%',
            progress: '0%',
            color: '#10B981',
            desc: 'Exact percentage detection of dilution. No added water detected in the current sample.',
            tags: ['Pure Sample', 'No Dilution'],
            statusClass: 'badge-success',
            statusColor: '#10B981'
        },
        adulteration: {
            name: 'Adulterants',
            value: 'DETECTED',
            unit: '',
            progress: '100%',
            color: '#EF4444',
            desc: 'Rapid screening for synthetic contaminants. ALERT: Trace amounts of starch or maltodextrin found.',
            tags: ['REJECT SAMPLE', 'Contamination'],
            statusClass: 'badge-danger',
            statusColor: '#EF4444'
        }
    };

    const paramBtns = document.querySelectorAll('.param-btn');
    const simName = document.getElementById('sim-metric-name');
    const simValue = document.getElementById('sim-metric-value');
    const simUnit = document.getElementById('sim-metric-unit');
    const simProgress = document.getElementById('sim-progress');
    const simDesc = document.getElementById('sim-metric-desc');
    const simBadge = document.getElementById('sim-badge');
    
    // Update live clock
    setInterval(() => {
        const now = new Date();
        document.getElementById('sim-time').textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }, 1000);

    paramBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            paramBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const paramId = btn.getAttribute('data-param');
            const data = paramData[paramId];

            // Animate transition out
            simValue.style.opacity = 0;
            simProgress.style.width = '0%';
            
            setTimeout(() => {
                simName.textContent = data.name;
                simValue.textContent = data.value;
                simUnit.textContent = data.unit;
                simDesc.textContent = data.desc;
                
                simBadge.className = `badge ${data.statusClass}`;
                simBadge.textContent = data.tags[0];
                
                simProgress.style.background = data.color;
                
                // Animate transition in
                simValue.style.opacity = 1;
                simProgress.style.width = data.progress;
            }, 300);
        });
    });

    // 3. Form Validation & Submission
    const form = document.getElementById('leadForm');
    const successMsg = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate API call
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Request a Demo';
                submitBtn.disabled = false;
                successMsg.classList.remove('hidden');
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
});
