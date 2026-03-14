const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');

const replacements = [
    { old: 'assets/course_bus.png', new: 'assets/home_faculty_bus.jpg' },
    { old: 'assets/course_tech.png', new: 'assets/home_faculty_tech.jpg' },
    { old: 'assets/course_arts.png', new: 'assets/home_faculty_arts.jpg' }
];

replacements.forEach(r => {
    html = html.split(r.old).join(r.new);
});

fs.writeFileSync(indexPath, html);
console.log('Successfully updated image paths in index.html');
