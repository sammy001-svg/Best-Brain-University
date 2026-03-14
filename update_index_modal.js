const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Add CSS to Head
const modalCSS = `
    /* Blog Modal Styles */
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
        max-width: 700px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        position: relative;
        transform: translateY(30px);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        margin: 20px;
        max-height: 90vh;
        overflow-y: auto;
    }
    .modal-overlay.active .college-modal-container {
        transform: translateY(0);
    }
    .modal-header {
        position: relative;
        height: 300px;
    }
    .modal-banner {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .modal-badge {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background: #f7a800;
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
    }
    .close-modal {
        position: absolute;
        top: 20px;
        right: 20px;
        background: white;
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 10;
        font-size: 20px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    .close-modal:hover {
        background: #f7a800;
        color: white;
        transform: rotate(90deg);
    }
    .modal-body {
        padding: 30px;
    }
    .modal-title {
        font-family: 'Playfair Display', serif;
        font-size: 28px;
        color: #35063e;
        margin-bottom: 20px;
    }
    .modal-description {
        color: #4a5568;
        line-height: 1.8;
        font-size: 16px;
    }
`;

if (!html.includes('/* Blog Modal Styles */')) {
    html = html.replace('</head>', `<style>${modalCSS}</style>\n</head>`);
}

// 2. Add data-blog attributes to Read More buttons
html = html.replace(
    'data-blog="ai-research">Read More',
    'data-blog="ai-research">Read More'
); // Just checking if I already added it manually (unlikely)

// Let's do a more robust replacement for the buttons
const blogReplacements = [
    { title: 'Pioneering Research in AI', id: 'ai-research' },
    { title: 'Annual Cultural Festival', id: 'cultural-fest' },
    { title: 'Empowering the Next Generation', id: 'leadership-empowerment' }
];

blogReplacements.forEach(b => {
    const regex = new RegExp(`(<h3 class="blog-title">.*?${b.title}.*?</h3>[\\s\\S]*?class="read-more")`, 'g');
    html = html.replace(regex, `$1 data-blog="${b.id}"`);
});

// 3. Add Modal HTML before body end
const modalHTML = `
    <!-- Blog Detail Modal -->
    <div id="blogModal" class="modal-overlay">
        <div class="college-modal-container">
            <button class="close-modal closeBlogModal">&times;</button>
            <div class="modal-header">
                <img id="modalBlogImage" src="" alt="" class="modal-banner">
                <div class="modal-badge" id="modalBlogCategory">Category</div>
            </div>
            <div class="modal-body">
                <h2 id="modalBlogTitle" class="modal-title">Blog Title</h2>
                <div class="modal-meta" style="margin-bottom: 20px; color: #64748b; font-size: 14px;">
                    <span id="modalBlogDate"><i class="fa-solid fa-calendar-days"></i> Date</span>
                </div>
                <div id="modalBlogContent" class="modal-description">
                    <!-- Full content goes here -->
                </div>
            </div>
        </div>
    </div>
`;

if (!html.includes('id="blogModal"')) {
    html = html.replace('</body>', `${modalHTML}\n</body>`);
}

fs.writeFileSync(indexPath, html);
console.log('Successfully updated index.html with blog modal structure and styles.');
