$content = Get-Content 'colleges.html' -Raw

# Replace images
$content = $content -replace '486315870_1073522748125162_6999492349873762032_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.11 PM.jpeg'
$content = $content -replace '485667367_1071129378364499_1310311816415714189_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.11 PM (1).jpeg'
$content = $content -replace '502570426_1130285395782230_2673895550082559893_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.11 PM (2).jpeg'
$content = $content -replace '137662476_110758180929680_6247427091638184118_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.21 PM.jpeg'
$content = $content -replace '146174675_121194719886026_5905175561164045588_n.jpg', 'WhatsApp Image 2026-03-14 at 5.09.11 PM (3).jpeg'

# Replace buttons with unique data-college attributes
# Use context lines to ensure uniqueness
$content = $content -replace '(BBA Public Administration</li>\s+</ul>\s+)<a href="#" class="btn-primary">View Full Details</a>', '$1<a href="javascript:void(0)" class="btn-primary openCollegeModal" data-college="business">View Full Details</a>'
$content = $content -replace '(BEd Secondary Education</li>\s+</ul>\s+)<a href="#" class="btn-primary">View Full Details</a>', '$1<a href="javascript:void(0)" class="btn-primary openCollegeModal" data-college="education">View Full Details</a>'
$content = $content -replace '(BA Criminal Justice</li>\s+</ul>\s+)<a href="#" class="btn-primary">View Full Details</a>', '$1<a href="javascript:void(0)" class="btn-primary openCollegeModal" data-college="liberal-arts">View Full Details</a>'
$content = $content -replace '(BSc Information Technology</li>\s+</ul>\s+)<a href="#" class="btn-primary">View Full Details</a>', '$1<a href="javascript:void(0)" class="btn-primary openCollegeModal" data-college="it">View Full Details</a>'
$content = $content -replace '(BSc Public Health</li>\s+</ul>\s+)<a href="#" class="btn-primary">View Full Details</a>', '$1<a href="javascript:void(0)" class="btn-primary openCollegeModal" data-college="health-science">View Full Details</a>'

# Add Modal CSS before </style>
$css = @"
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
"@
$content = $content -replace '\s+</style>', "$css`n    </style>"

# Add Modal HTML before script.js
$modalHtml = @"
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
"@
$content = $content -replace '\s+<script src="script.js"></script>', "$modalHtml`n`n    <script src=`"script.js`"></script>"

$content | Set-Content 'colleges.html' -NoNewline
