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
});
