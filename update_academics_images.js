const fs = require('fs');
const path = require('path');

const academicsPath = path.join(__dirname, 'academics-overview.html');

let html = fs.readFileSync(academicsPath, 'utf8');

const replacements = [
    { old: 'assets/course_tech.png', new: 'assets/academics_lab.jpg' },
    { old: 'assets/course_bus.png', new: 'assets/academics_students.jpg' },
    { old: 'assets/college_education.png', new: 'assets/academics_banner.jpg' },
    { old: 'assets/hero_slide_2.png', new: 'assets/academics_forum.jpg' }
];

replacements.forEach(r => {
    html = html.split(r.old).join(r.new);
});

fs.writeFileSync(academicsPath, html);
console.log('Successfully updated image paths in academics-overview.html');
