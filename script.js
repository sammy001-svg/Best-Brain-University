document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;
    
    // Initialize
    if(totalSlides > 0) {
        showSlide(currentSlide);
        startSlideShow();
    }
    
    function showSlide(index) {
        // Handle wrapping
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        // Remove active class from all
        slides.forEach(slide => {
            slide.classList.remove('active');
            // reset animations
            const elements = slide.querySelectorAll('.hero-subtitle, .hero-title, .btn-primary');
            elements.forEach(el => el.style.animation = 'none');
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Trigger animations for current slide
        setTimeout(() => {
            const activeSlide = slides[currentSlide];
            const elements = activeSlide.querySelectorAll('.hero-subtitle, .hero-title, .btn-primary');
            elements.forEach(el => el.style.animation = '');
        }, 50);
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 6000); // Change slide every 6s
    }
    
    function resetSlideShow() {
        clearInterval(slideInterval);
        startSlideShow();
    }
    
    // Event Listeners
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSlideShow();
        });
    }
    
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSlideShow();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlideShow();
        });
    });
    
    // Student Application Form Logic
    const openAppBtn = document.getElementById('openAppForm');
    const closeAppBtn = document.getElementById('closeAppForm');
    const modalOverlay = document.getElementById('appFormModal');
    const appForm = document.getElementById('studentAppForm');
    const steps = document.querySelectorAll('.form-step');
    const indicators = document.querySelectorAll('.indicator-dot');
    let currentStep = 1;

    if (openAppBtn) {
        openAppBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    }

    if (closeAppBtn) {
        closeAppBtn.addEventListener('click', closeModal);
    }

    document.querySelectorAll('.closeModalBtn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form after a delay
        setTimeout(resetForm, 400);
    }

    function resetForm() {
        currentStep = 1;
        updateStepDisplay();
        appForm.reset();
    }

    // Step Navigation
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateStepDisplay();
            }
        });
    });

    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateStepDisplay();
        });
    });

    function updateStepDisplay() {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });

        // Update indicators
        indicators.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index < currentStep && currentStep <= 3) {
                dot.classList.add('active');
            }
        });

        // Hide indicator on success state
        const indicatorContainer = document.querySelector('.step-indicator');
        if (currentStep > 3) {
            indicatorContainer.style.display = 'none';
        } else {
            indicatorContainer.style.display = 'flex';
        }
    }

    function validateStep(step) {
        const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value || (input.type === 'checkbox' && !input.checked)) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#eee';
            }
        });

        return isValid;
    }

    if (appForm) {
        appForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show Success State (Step 4)
            currentStep = 4;
            updateStepDisplay();
        });
    }

    // Advisor Inquiry Form Logic (Transfer Students Page)
    const openAdvisorBtn = document.getElementById('openAdvisorForm');
    const closeAdvisorBtn = document.getElementById('closeAdvisorForm');
    const advisorModal = document.getElementById('advisorFormModal');
    const advisorForm = document.getElementById('advisorInquiryForm');
    const formContent = document.getElementById('formContent');
    const successState = document.getElementById('advisorSuccess');

    if (openAdvisorBtn) {
        openAdvisorBtn.addEventListener('click', () => {
            advisorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeAdvisorBtn) {
        closeAdvisorBtn.addEventListener('click', closeAdvisorModal);
    }

    document.querySelectorAll('.closeAdvisorBtn').forEach(btn => {
        btn.addEventListener('click', closeAdvisorModal);
    });

    function closeAdvisorModal() {
        advisorModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (formContent) formContent.style.display = 'block';
            if (successState) successState.style.display = 'none';
            if (advisorForm) advisorForm.reset();
        }, 400);
    }

    if (advisorForm) {
        advisorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formContent.style.display = 'none';
            successState.style.display = 'block';
        });
    }

    // College Detail Modal Logic (Colleges Page)
    const collegeModal = document.getElementById('collegeDetailModal');
    const closeCollegeBtn = document.getElementById('closeCollegeModal');
    const modalCollegeTitle = document.getElementById('modalCollegeTitle');
    const modalDetailText = document.getElementById('modalDetailText');
    const modalDoneBtn = document.getElementById('modalDoneBtn');

    const collegeData = {
        'business': {
            title: 'School of Business',
            content: 'The School of Business at BBIU is dedicated to fostering innovation and excellence in business education. Our programs are designed to provide students with a strong foundation in core business disciplines while offering opportunities for specialization in areas such as Accounting, Management, and Public Administration.'
        },
        'education': {
            title: 'School of Education',
            content: 'Our School of Education is committed to preparing high-quality educators who are ready to make a significant impact in the classroom and beyond. We offer undergraduate programs that combine rigorous academic study with extensive field experience.'
        },
        'liberal-arts': {
            title: 'School of Liberal Arts & Social Sciences',
            content: 'The School of Liberal Arts & Social Sciences provides a diverse and enriching academic environment where students explore the complexities of human society and culture through programs in Sociology, Mass Communications, and Social Work.'
        },
        'it': {
            title: 'School of Information Technology',
            content: 'BBIU\'s School of Information Technology is at the forefront of tech education, preparing students for success in a rapidly evolving digital world through advanced technical training and hands-on projects.'
        },
        'health-science': {
            title: 'School of Health Science',
            content: 'The School of Health Science is dedicated to improving community well-being through programs in Public Health and Environmental Science, equipping students with scientific knowledge and practical skills.'
        }
    };

    document.querySelectorAll('.openCollegeModal').forEach(btn => {
        btn.addEventListener('click', () => {
            const college = btn.dataset.college;
            const data = collegeData[college];
            if (data) {
                modalCollegeTitle.textContent = data.title;
                modalDetailText.textContent = data.content;
                collegeModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeCollegeBtn) {
        closeCollegeBtn.addEventListener('click', closeCollegeModal);
    }

    if (modalDoneBtn) {
        modalDoneBtn.addEventListener('click', closeCollegeModal);
    }

    function closeCollegeModal() {
        if (collegeModal) {
            collegeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});