document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;

  // Initialize
  if (totalSlides > 0) {
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
    slides.forEach((slide) => {
      slide.classList.remove("active");
      // reset animations
      const elements = slide.querySelectorAll(
        ".hero-subtitle, .hero-title, .btn-primary",
      );
      elements.forEach((el) => (el.style.animation = "none"));
    });

    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    // Trigger animations for current slide
    setTimeout(() => {
      const activeSlide = slides[currentSlide];
      const elements = activeSlide.querySelectorAll(
        ".hero-subtitle, .hero-title, .btn-primary",
      );
      elements.forEach((el) => (el.style.animation = ""));
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
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetSlideShow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetSlideShow();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      resetSlideShow();
    });
  });

  // Student Application Form Logic
  const openAppBtns = document.querySelectorAll(".openAppForm");
  const closeAppBtn = document.getElementById("closeAppForm");
  const modalOverlay = document.getElementById("appFormModal");
  const appForm = document.getElementById("studentAppForm");
  const steps = document.querySelectorAll(".form-step");
  const indicators = document.querySelectorAll(".indicator-dot");
  let currentStep = 1;

  if (openAppBtns.length > 0 && modalOverlay) {
    openAppBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scroll
      });
    });
  }

  if (closeAppBtn && modalOverlay) {
    closeAppBtn.addEventListener("click", closeModal);
  }

  document.querySelectorAll(".closeModalBtn").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
      // Reset form after a delay
      setTimeout(resetForm, 400);
    }
  }

  function resetForm() {
    currentStep = 1;
    updateStepDisplay();
    if (appForm) appForm.reset();
  }

  // Step Navigation
  document.querySelectorAll(".btn-next").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        currentStep++;
        updateStepDisplay();
      }
    });
  });

  document.querySelectorAll(".btn-prev").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentStep--;
      updateStepDisplay();
    });
  });

  function updateStepDisplay() {
    if (steps.length === 0) return;

    steps.forEach((step) => {
      step.classList.remove("active");
      if (parseInt(step.dataset.step) === currentStep) {
        step.classList.add("active");
      }
    });

    // Update indicators
    indicators.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index < currentStep && currentStep <= 3) {
        dot.classList.add("active");
      }
    });

    // Hide indicator on success state
    const indicatorContainer = document.querySelector(".step-indicator");
    if (indicatorContainer) {
      if (currentStep > 3) {
        indicatorContainer.style.display = "none";
      } else {
        indicatorContainer.style.display = "flex";
      }
    }
  }

  function validateStep(step) {
    const currentStepEl = document.querySelector(
      `.form-step[data-step="${step}"]`,
    );
    if (!currentStepEl) return true;

    const inputs = currentStepEl.querySelectorAll(
      "input[required], select[required]",
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value || (input.type === "checkbox" && !input.checked)) {
        input.style.borderColor = "red";
        isValid = false;
      } else {
        input.style.borderColor = "#eee";
      }
    });

    return isValid;
  }

  if (appForm) {
    appForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Show Success State (Step 4)
      currentStep = 4;
      updateStepDisplay();
    });

    // Handle File Upload Display
    appForm.querySelectorAll(".file-input-hidden").forEach(input => {
      input.addEventListener("change", (e) => {
        const fileName = e.target.files[0] ? e.target.files[0].name : "No file chosen";
        const statusSpan = e.target.parentElement.querySelector(".file-status");
        if (statusSpan) {
            statusSpan.textContent = fileName;
            statusSpan.style.color = "#37a246";
            statusSpan.style.fontWeight = "600";
        }
      });
    });
  }

  // Advisor Inquiry Form Logic (Transfer Students Page)
  const openAdvisorBtn = document.getElementById("openAdvisorForm");
  const closeAdvisorBtn = document.getElementById("closeAdvisorForm");
  const advisorModal = document.getElementById("advisorFormModal");
  const advisorForm = document.getElementById("advisorInquiryForm");
  const formContent = document.getElementById("formContent");
  const successState = document.getElementById("advisorSuccess");

  if (openAdvisorBtn && advisorModal) {
    openAdvisorBtn.addEventListener("click", () => {
      advisorModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeAdvisorBtn && advisorModal) {
    closeAdvisorBtn.addEventListener("click", closeAdvisorModal);
  }

  document.querySelectorAll(".closeAdvisorBtn").forEach((btn) => {
    btn.addEventListener("click", closeAdvisorModal);
  });

  function closeAdvisorModal() {
    if (advisorModal) {
      advisorModal.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (formContent) formContent.style.display = "block";
        if (successState) successState.style.display = "none";
        if (advisorForm) advisorForm.reset();
      }, 400);
    }
  }

  if (advisorForm && formContent && successState) {
    advisorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formContent.style.display = "none";
      successState.style.display = "block";
    });
  }

  // College Detail Modal Logic (Colleges Page)
  const collegeModal = document.getElementById("collegeDetailModal");
  const closeCollegeBtn = document.getElementById("closeCollegeModal");
  const modalCollegeTitle = document.getElementById("modalCollegeTitle");
  const modalDetailText = document.getElementById("modalDetailText");
  const modalDoneBtn = document.getElementById("modalDoneBtn");

  const collegeData = {
    business: {
      title: "School of Business",
      content:
        "The School of Business at BBIU is dedicated to fostering innovation and excellence in business education. Our programs are designed to provide students with a strong foundation in core business disciplines while offering opportunities for specialization in areas such as Accounting, Management, and Public Administration.",
    },
    education: {
      title: "School of Education",
      content:
        "Our School of Education is committed to preparing high-quality educators who are ready to make a significant impact in the classroom and beyond. We offer undergraduate programs that combine rigorous academic study with extensive field experience.",
    },
    "liberal-arts": {
      title: "School of Liberal Arts & Social Sciences",
      content:
        "The School of Liberal Arts & Social Sciences provides a diverse and enriching academic environment where students explore the complexities of human society and culture through programs in Sociology, Mass Communications, and Social Work.",
    },
    it: {
      title: "School of Information Technology",
      content:
        "BBIU's School of Information Technology is at the forefront of tech education, preparing students for success in a rapidly evolving digital world through advanced technical training and hands-on projects.",
    },
    "health-science": {
      title: "School of Health Science",
      content:
        "The School of Health Science is dedicated to improving community well-being through programs in Public Health and Environmental Science, equipping students with scientific knowledge and practical skills.",
    },
  };

  document.querySelectorAll(".openCollegeModal").forEach((btn) => {
    btn.addEventListener("click", () => {
      const college = btn.dataset.college;
      const data = collegeData[college];
      if (data) {
        modalCollegeTitle.textContent = data.title;
        modalDetailText.textContent = data.content;
        collegeModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (closeCollegeBtn) {
    closeCollegeBtn.addEventListener("click", closeCollegeModal);
  }

  if (modalDoneBtn) {
    modalDoneBtn.addEventListener("click", closeCollegeModal);
  }

  function closeCollegeModal() {
    if (collegeModal) {
      collegeModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Program Detail Modal Logic
  const programModal = document.getElementById("programDetailsModal");
  const closeProgramBtn = document.getElementById("closeProgramModal");
  const modalProgramTitle = document.getElementById("modalProgramTitle");
  const modalProgramSchool = document.getElementById("modalProgramSchool");
  const modalProgramDuration = document.getElementById("modalProgramDuration");
  const modalProgramLocation = document.getElementById("modalProgramLocation");
  const modalProgramDetails = document.getElementById("modalProgramDetails");
  const modalProgramRequirements = document.getElementById("modalProgramRequirements");

  const programData = {
    "accounting-bba": {
      title: "Accounting (BBA)",
      school: "School of Business",
      duration: "4 Years",
      location: "On-Campus",
      details: "The BBA in Accounting provides students with a solid foundation in financial accounting, managerial accounting, auditing, and taxation. Graduates are prepared for careers in public accounting, corporate finance, and government agencies.",
      requirements: ["High School Diploma or equivalent", "Minimum GPA of 2.5", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate with 5 credits including English & Math"]
    },
    "economics-bsc": {
      title: "Economics (BSc)",
      school: "School of Business",
      duration: "4 Years",
      location: "On-Campus",
      details: "This program explores the production, distribution, and consumption of goods and services. Students develop strong analytical skills to understand market trends, economic policy, and global financial systems.",
      requirements: ["High School Diploma or equivalent", "Strong background in Mathematics", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate with 5 credits"]
    },
    "management-bba": {
      title: "Management (BBA)",
      school: "School of Business",
      duration: "4 Years",
      location: "On-Campus",
      details: "Focuses on the skills needed to lead organizations effectively. Curriculum covers strategic planning, human resources, organizational behavior, and operations management.",
      requirements: ["High School Diploma or equivalent", "Minimum GPA of 2.5", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate"]
    },
    "public-admin-bba": {
      title: "Public Administration (BBA)",
      school: "School of Business",
      duration: "4 Years",
      location: "On-Campus",
      details: "Prepares students for leadership roles in the public sector and non-profit organizations. Emphasis on public policy, governance, and community development.",
      requirements: ["High School Diploma or equivalent", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate with 5 credits"]
    },
    "primary-education-bed": {
      title: "Primary Education (BEd)",
      school: "School of Education",
      duration: "4 Years",
      location: "On-Campus",
      details: "Equips future teachers with the pedagogical skills and subject knowledge necessary to inspire and educate primary school students (Grades 1-6).",
      requirements: ["High School Diploma or equivalent", "Minimum GPA of 2.0", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate"]
    },
    "guidance-counseling": {
      title: "Education (Guidance & Counseling)",
      school: "School of Education",
      duration: "4 Years",
      location: "On-Campus",
      details: "Focuses on supporting the psychological and educational development of students. Prepares graduates for roles in school counseling and student services.",
      requirements: ["High School Diploma or equivalent", "Minimum GPA of 2.5", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate"]
    },
    "secondary-education-bed": {
      title: "Secondary Education (BEd)",
      school: "School of Education",
      duration: "4 Years",
      location: "On-Campus",
      details: "Prepares specialized teachers for secondary schools (Junior & Senior High). Students choose a subject major such as Math, Science, or Social Studies.",
      requirements: ["High School Diploma or equivalent", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate with 5 credits"]
    },
    "sociology-ba": {
      title: "Sociology (BA)",
      school: "School of Liberal Arts & Social Sciences",
      duration: "4 Years",
      location: "On-Campus",
      details: "The study of social life, social change, and the social causes and consequences of human behavior. Students examine the structure of groups, organizations, and societies.",
      requirements: ["High School Diploma or equivalent", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate"]
    },
    "mass-comm-ba": {
      title: "Mass Communications (BA)",
      school: "School of Liberal Arts & Social Sciences",
      duration: "4 Years",
      location: "On-Campus",
      details: "Prepares students for careers in journalism, broadcasting, public relations, and advertising. Focus on media ethics, storytelling, and digital communication.",
      requirements: ["High School Diploma or equivalent", "Strong writing and communication skills", "BBIU Entrance Exam Pass"]
    },
    "history-relations-ba": {
      title: "History & International Relations (BA)",
      school: "School of Liberal Arts & Social Sciences",
      duration: "4 Years",
      location: "On-Campus",
      details: "Explores historical events and their impact on modern international relations. Students analyze global conflicts, diplomacy, and international organizations.",
      requirements: ["High School Diploma or equivalent", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate"]
    },
    "english-literature-ba": {
      title: "English and Literature (BA)",
      school: "School of Liberal Arts & Social Sciences",
      duration: "4 Years",
      location: "On-Campus",
      details: "Develops advanced skills in critical analysis, writing, and appreciation of global literature. Ideal for careers in education, editing, and creative writing.",
      requirements: ["High School Diploma or equivalent", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate with credit in English"]
    },
    "social-works-ba": {
      title: "Social Works (BA)",
      school: "School of Liberal Arts & Social Sciences",
      duration: "4 Years",
      location: "On-Campus",
      details: "Focuses on helping individuals, families, and communities overcome challenges. Prepares graduates for roles in social service agencies and community development.",
      requirements: ["High School Diploma or equivalent", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate"]
    },
    "criminal-justice-ba": {
      title: "Criminal Justice (BA)",
      school: "School of Liberal Arts & Social Sciences",
      duration: "4 Years",
      location: "On-Campus",
      details: "Examines the systems and practices of law enforcement, courts, and corrections. Students study criminology, criminal law, and ethics.",
      requirements: ["High School Diploma or equivalent", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate"]
    },
    "it-bsc": {
      title: "Information Technology (BSc)",
      school: "School of Information Technology",
      duration: "4 Years",
      location: "On-Campus",
      details: "Provides comprehensive training in software development, networking, database management, and information security. Prepares students for the modern tech industry.",
      requirements: ["High School Diploma or equivalent", "Credit in Mathematics", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate"]
    },
    "env-science-bsc": {
      title: "Environmental Science (BSc)",
      school: "School of Health Science",
      duration: "4 Years",
      location: "On-Campus",
      details: "Explores the interaction between human activity and the environment. Focus on sustainability, ecology, and environmental policy.",
      requirements: ["High School Diploma or equivalent", "Minimum 2 credits in Science subjects", "BBIU Entrance Exam Pass"]
    },
    "public-health-bsc": {
      title: "Public Health (BSc)",
      school: "School of Health Science",
      duration: "4 Years",
      location: "On-Campus",
      details: "Focuses on protecting and improving the health of communities through education, policy making, and research for disease and injury prevention.",
      requirements: ["High School Diploma or equivalent", "Minimum GPA 2.5", "BBIU Entrance Exam Pass", "WASSCE/WAEC Certificate"]
    },
    "cybersecurity-cert": {
      title: "Cybersecurity Fundamentals",
      school: "School of Information Technology",
      duration: "6 Months",
      location: "Hybrid (Online/On-Campus)",
      details: "An intensive certificate course covering the essentials of digital security, threat detection, and risk management. Perfect for professionals looking to upskill.",
      requirements: ["Basic computer literacy", "Interest in information security", "High School Certificate or Professional experience"]
    },
    "edu-leadership-cert": {
      title: "Educational Leadership",
      school: "School of Education",
      duration: "1 Year",
      location: "Online",
      details: "Designed for educators aspiring to administrative and leadership roles. Focuses on school management, educational policy, and ethical leadership.",
      requirements: ["Bachelor's Degree in Education or related field", "Minimum 2 years teaching experience", "Letter of intent"]
    }
  };

  document.querySelectorAll(".program-link[data-program]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const progId = btn.getAttribute("data-program");
      const data = programData[progId];

      if (data) {
        modalProgramTitle.textContent = data.title;
        modalProgramSchool.innerHTML = `<i class="fa-solid fa-building-columns"></i> ${data.school}`;
        modalProgramDuration.textContent = data.duration;
        modalProgramLocation.textContent = data.location;
        modalProgramDetails.textContent = data.details;

        // Clear and populate requirements
        modalProgramRequirements.innerHTML = "";
        data.requirements.forEach((req) => {
          const li = document.createElement("li");
          li.style.display = "flex";
          li.style.alignItems = "center";
          li.style.gap = "10px";
          li.style.marginBottom = "8px";
          li.style.color = "#555";
          li.style.fontSize = "15px";
          li.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #37a246; font-size: 14px;"></i> ${req}`;
          modalProgramRequirements.appendChild(li);
        });

        if (programModal) {
          programModal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      }
    });
  });

  if (closeProgramBtn) {
    closeProgramBtn.addEventListener("click", () => {
      if (programModal) {
        programModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Close Program Modal on overlay click
  if (programModal) {
    programModal.addEventListener("click", (e) => {
      if (e.target === programModal) {
        programModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Blog Modal Logic
  const blogModal = document.getElementById("blogModal");
  const closeBlogBtn = document.querySelector(".closeBlogModal");

  const blogData = {
    "ai-research": {
      title: "Pioneering Research in AI and Sustainable Energy",
      category: "Academics",
      date: "March 15, 2026",
      image: "assets/blog_success.jpg",
      content: `<p>Our engineering department is proud to announce a significant breakthrough in renewable energy integration. Using advanced AI-driven smart grids, our researchers have developed a system that optimizes energy distribution with 95% efficiency.</p>
                      <p>This project, led by Dr. Sarah Mensah, represents a collaborative effort between our Computer Science and Engineering faculties. "This is just the beginning," says Dr. Mensah. "Our goal is to create sustainable energy solutions that are accessible to communities across the continent."</p>
                      <p>The research has already gained international attention, with several global energy partners expressing interest in pilot programs. Students involved in the research gain hands-on experience with cutting-edge technology, preparing them for the future of green tech.</p>`,
    },
    "cultural-fest": {
      title: "Annual Cultural Festival: A Celebration of Diversity",
      category: "Campus Life",
      date: "March 12, 2026",
      image: "assets/blog_event.jpg",
      content: `<p>Celebrating the rich tapestry of cultures that make BBIU unique, this year's Annual Cultural Festival saw record participation from over 20 different countries. The campus was transformed into a vibrant global village, showcasing traditional music, dance, and culinary delights.</p>
                      <p>The event kicked off with a Parade of Nations, followed by a series of workshops and performances. "Diversity is our greatest strength," remarked Vice-Chancellor during the opening ceremony. "Seeing our students come together to celebrate their heritage is truly inspiring."</p>
                      <p>The festival concluded with a grand concert featuring international artists and student talent. It serves as a reminder of the inclusive and multicultural environment we strive to maintain at Best Brains International University.</p>`,
    },
    "leadership-empowerment": {
      title: "Empowering the Next Generation of Global Leaders",
      category: "Leadership",
      date: "March 10, 2026",
      image: "assets/blog_leadership.jpg",
      content: `<p>A look into how BBIU's leadership programs are preparing students for impactful careers on the international stage. Our "Emerging Leaders" forum recently hosted a panel of successful alumni who shared their journeys from campus to global boardrooms.</p>
                      <p>The program emphasizes critical thinking, ethical decision-making, and effective communication. Through mentorship and real-world projects, students are encouraged to take initiative and lead with purpose.</p>
                      <p>Many of our graduates are now holding prominent positions in NGOs, government agencies, and multinational corporations, proving the value of the holistic education provided at BBIU.</p>`,
    },
  };

  document.querySelectorAll(".read-more[data-blog]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const blogId = btn.getAttribute("data-blog");
      const data = blogData[blogId];

      if (data) {
        document.getElementById("modalBlogImage").src = data.image;
        document.getElementById("modalBlogCategory").textContent =
          data.category;
        document.getElementById("modalBlogTitle").textContent = data.title;
        document.getElementById("modalBlogDate").innerHTML =
          `<i class="fa-solid fa-calendar-days"></i> ${data.date}`;
        document.getElementById("modalBlogContent").innerHTML = data.content;

        if (blogModal) {
          blogModal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      }
    });
  });

  if (closeBlogBtn) {
    closeBlogBtn.addEventListener("click", () => {
      if (blogModal) {
        blogModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Close on overlay click
  if (blogModal) {
    blogModal.addEventListener("click", (e) => {
      if (e.target === blogModal) {
        blogModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const mobileIcon = mobileToggle ? mobileToggle.querySelector("i") : null;

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mainNav.classList.toggle("active");
      if (mainNav.classList.contains("active")) {
        mobileIcon.classList.remove("fa-bars");
        mobileIcon.classList.add("fa-xmark");
      } else {
        mobileIcon.classList.remove("fa-xmark");
        mobileIcon.classList.add("fa-bars");
      }
    });
  }

  // Handle Mega Menu on Mobile
  const hasMegaMenu = document.querySelectorAll(".has-mega-menu");
  hasMegaMenu.forEach((item) => {
    const link = item.querySelector("a");
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        item.classList.toggle("active");
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mainNav &&
      mainNav.classList.contains("active") &&
      !mainNav.contains(e.target) &&
      !mobileToggle.contains(e.target)
    ) {
      mainNav.classList.remove("active");
      if (mobileIcon) {
        mobileIcon.classList.remove("fa-xmark");
        mobileIcon.classList.add("fa-bars");
      }
    }
  });
});
