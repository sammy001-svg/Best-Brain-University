const fs = require('fs');
const path = require('path');

const collegesPath = path.join(__dirname, 'colleges.html');
const scriptPath = path.join(__dirname, 'script.js');

// --- Update colleges.html ---
let collegesHtml = fs.readFileSync(collegesPath, 'utf8');

// Replace Images
collegesHtml = collegesHtml.replace('486315870_1073522748125162_6999492349873762032_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.11 PM.jpeg');
collegesHtml = collegesHtml.replace('485667367_1071129378364499_1310311816415714189_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.11 PM (1).jpeg');
collegesHtml = collegesHtml.replace('502570426_1130285395782230_2673895550082559893_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.11 PM (2).jpeg');
collegesHtml = collegesHtml.replace('137662476_110758180929680_6247427091638184118_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.21 PM.jpeg');
collegesHtml = collegesHtml.replace('146174675_121194719886026_5905175561164045588_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.11 PM (3).jpeg');

// Replace Buttons (Sequential)
const colleges = ['business', 'education', 'liberal-arts', 'it', 'health-science'];
let collegeIdx = 0;
while (collegesHtml.includes('<a href="#" class="btn-primary">View Full Details</a>')) {
    collegesHtml = collegesHtml.replace('<a href="#" class="btn-primary">View Full Details</a>', `<a href="javascript:void(0)" class="btn-primary openCollegeModal" data-college="${colleges[collegeIdx++]}">View Full Details</a>`);
}

// Add CSS
const css = `
      /* Modal Styles */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(53, 6, 62, 0.85);
        backdrop-filter: blur(8px);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      .modal-overlay.active {
        display: flex;
        opacity: 1;
      }
      .college-modal-container {
        background: white;
        width: 100%;
        max-width: 600px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        position: relative;
        transform: translateY(30px);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        margin: 20px;
      }
      .modal-overlay.active .college-modal-container {
        transform: translateY(0);
      }
      .modal-header {
        background: #be2ed6;
        padding: 30px;
        color: white;
        position: relative;
      }
      .modal-header h3 {
        font-family: 'Playfair Display', serif;
        font-size: 28px;
        margin-bottom: 5px;
      }
      .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s;
      }
      .modal-close:hover {
        background: rgba(255, 255, 255, 0.4);
      }
      .modal-body {
        padding: 40px;
      }
      .modal-body h4 {
        color: #be2ed6;
        margin-bottom: 15px;
        font-family: 'Playfair Display', serif;
      }
      .modal-body p {
        color: #666;
        line-height: 1.7;
        margin-bottom: 20px;
      }
      .btn-close-modal {
        display: block;
        width: 100%;
        padding: 12px;
        background: #f7a800;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        text-align: center;
        transition: background 0.3s;
      }
    </style>`;
collegesHtml = collegesHtml.replace('</style>', css);

// Add Modal HTML
const modalHtml = `
    <!-- College Detail Modal -->
    <div class="modal-overlay" id="collegeDetailModal">
      <div class="college-modal-container">
        <div class="modal-header">
          <h3 id="modalCollegeTitle">College Details</h3>
          <p id="modalCollegeSubtitle">Academic Excellence at BBIU</p>
          <button class="modal-close" id="closeCollegeModal"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <h4 id="modalDetailHeader">Program Overview</h4>
          <p id="modalDetailText">Loading details...</p>
          <button type="button" class="btn-close-modal" id="modalDoneBtn">Close Details</button>
        </div>
      </div>
    </div>

    <script src="script.js"></script>`;
collegesHtml = collegesHtml.replace('<script src="script.js"></script>', modalHtml);

fs.writeFileSync(collegesPath, collegesHtml);

// --- Update script.js ---
let scriptJs = fs.readFileSync(scriptPath, 'utf8');

const collegeJsLogic = `
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
            content: 'BBIU\\'s School of Information Technology is at the forefront of tech education, preparing students for success in a rapidly evolving digital world through advanced technical training and hands-on projects.'
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
});`;

// Replace the last closing }); of the main DOMContentLoaded function
scriptJs = scriptJs.replace(/}\);\s*$/, collegeJsLogic);

fs.writeFileSync(scriptPath, scriptJs);

console.log('Successfully updated colleges.html and script.js');
