const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'script.js');
let js = fs.readFileSync(scriptPath, 'utf8');

const blogLogic = `
    // Blog Modal Logic
    const blogModal = document.getElementById('blogModal');
    const closeBlogBtn = document.querySelector('.closeBlogModal');
    
    const blogData = {
        'ai-research': {
            title: 'Pioneering Research in AI and Sustainable Energy',
            category: 'Academics',
            date: 'March 15, 2026',
            image: 'assets/blog_success.jpg',
            content: \`<p>Our engineering department is proud to announce a significant breakthrough in renewable energy integration. Using advanced AI-driven smart grids, our researchers have developed a system that optimizes energy distribution with 95% efficiency.</p>
                      <p>This project, led by Dr. Sarah Mensah, represents a collaborative effort between our Computer Science and Engineering faculties. "This is just the beginning," says Dr. Mensah. "Our goal is to create sustainable energy solutions that are accessible to communities across the continent."</p>
                      <p>The research has already gained international attention, with several global energy partners expressing interest in pilot programs. Students involved in the research gain hands-on experience with cutting-edge technology, preparing them for the future of green tech.</p>\`
        },
        'cultural-fest': {
            title: 'Annual Cultural Festival: A Celebration of Diversity',
            category: 'Campus Life',
            date: 'March 12, 2026',
            image: 'assets/blog_event.jpg',
            content: \`<p>Celebrating the rich tapestry of cultures that make BBIU unique, this year's Annual Cultural Festival saw record participation from over 20 different countries. The campus was transformed into a vibrant global village, showcasing traditional music, dance, and culinary delights.</p>
                      <p>The event kicked off with a Parade of Nations, followed by a series of workshops and performances. "Diversity is our greatest strength," remarked Vice-Chancellor during the opening ceremony. "Seeing our students come together to celebrate their heritage is truly inspiring."</p>
                      <p>The festival concluded with a grand concert featuring international artists and student talent. It serves as a reminder of the inclusive and multicultural environment we strive to maintain at Best Brain International University.</p>\`
        },
        'leadership-empowerment': {
            title: 'Empowering the Next Generation of Global Leaders',
            category: 'Leadership',
            date: 'March 10, 2026',
            image: 'assets/blog_leadership.jpg',
            content: \`<p>A look into how BBIU's leadership programs are preparing students for impactful careers on the international stage. Our "Emerging Leaders" forum recently hosted a panel of successful alumni who shared their journeys from campus to global boardrooms.</p>
                      <p>The program emphasizes critical thinking, ethical decision-making, and effective communication. Through mentorship and real-world projects, students are encouraged to take initiative and lead with purpose.</p>
                      <p>Many of our graduates are now holding prominent positions in NGOs, government agencies, and multinational corporations, proving the value of the holistic education provided at BBIU.</p>\`
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
                document.getElementById('modalBlogDate').innerHTML = \`<i class="fa-solid fa-calendar-days"></i> \${data.date}\`;
                document.getElementById('modalBlogContent').innerHTML = data.content;

                blogModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeBlogBtn) {
        closeBlogBtn.addEventListener('click', () => {
            blogModal.classList.remove('active');
            document.body.style.overflow = '';
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
`;

if (!js.includes('// Blog Modal Logic')) {
    js += blogLogic;
    fs.writeFileSync(scriptPath, js);
    console.log('Successfully updated script.js with blog modal logic.');
} else {
    console.log('Blog modal logic already exists in script.js');
}
