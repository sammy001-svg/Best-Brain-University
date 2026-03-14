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

    // Blog Modal Logic
    const blogModal = document.getElementById('blogModal');
    const closeBlogBtn = document.querySelector('.closeBlogModal');
    
    const blogData = {
        'ai-research': {
            title: 'Pioneering Research in AI and Sustainable Energy',
            category: 'Academics',
            date: 'March 15, 2026',
            image: 'assets/blog_success.jpg',
            content: `<p>Our engineering department is proud to announce a significant breakthrough in renewable energy integration. Using advanced AI-driven smart grids, our researchers have developed a system that optimizes energy distribution with 95% efficiency.</p>
                      <p>This project, led by Dr. Sarah Mensah, represents a collaborative effort between our Computer Science and Engineering faculties. "This is just the beginning," says Dr. Mensah. "Our goal is to create sustainable energy solutions that are accessible to communities across the continent."</p>
                      <p>The research has already gained international attention, with several global energy partners expressing interest in pilot programs. Students involved in the research gain hands-on experience with cutting-edge technology, preparing them for the future of green tech.</p>`
        },
        'cultural-fest': {
            title: 'Annual Cultural Festival: A Celebration of Diversity',
            category: 'Campus Life',
            date: 'March 12, 2026',
            image: 'assets/blog_event.jpg',
            content: `<p>Celebrating the rich tapestry of cultures that make BBIU unique, this year's Annual Cultural Festival saw record participation from over 20 different countries. The campus was transformed into a vibrant global village, showcasing traditional music, dance, and culinary delights.</p>
                      <p>The event kicked off with a Parade of Nations, followed by a series of workshops and performances. "Diversity is our greatest strength," remarked Vice-Chancellor during the opening ceremony. "Seeing our students come together to celebrate their heritage is truly inspiring."</p>
                      <p>The festival concluded with a grand concert featuring international artists and student talent. It serves as a reminder of the inclusive and multicultural environment we strive to maintain at Best Brain International University.</p>`
        },
        'leadership-empowerment': {
            title: 'Empowering the Next Generation of Global Leaders',
            category: 'Leadership',
            date: 'March 10, 2026',
            image: 'assets/blog_leadership.jpg',
            content: `<p>A look into how BBIU's leadership programs are preparing students for impactful careers on the international stage. Our "Emerging Leaders" forum recently hosted a panel of successful alumni who shared their journeys from campus to global boardrooms.</p>
                      <p>The program emphasizes critical thinking, ethical decision-making, and effective communication. Through mentorship and real-world projects, students are encouraged to take initiative and lead with purpose.</p>
                      <p>Many of our graduates are now holding prominent positions in NGOs, government agencies, and multinational corporations, proving the value of the holistic education provided at BBIU.</p>`
        }
    };

    document.querySelectorAll('.read-more[data-blog]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const blogId = btn.getAttribute('data-blog');
            const data = blogData[blogId];

            if (data) {
                document.getElementById('modalBlogImage').src = data.image;
                document.getElementById('modalBlogCategory').textContent = data.category;
                document.getElementById('modalBlogTitle').textContent = data.title;
                document.getElementById('modalBlogDate').innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${data.date}`;
                document.getElementById('modalBlogContent').innerHTML = data.content;

                if (blogModal) {
                    blogModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    if (closeBlogBtn) {
        closeBlogBtn.addEventListener('click', () => {
            if (blogModal) {
                blogModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close on overlay click
    if (blogModal) {
        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                blogModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
