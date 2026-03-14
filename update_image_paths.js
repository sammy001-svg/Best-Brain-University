const fs = require('fs');
const path = require('path');

const collegesPath = path.join(__dirname, 'colleges.html');

let collegesHtml = fs.readFileSync(collegesPath, 'utf8');

const replacements = [
    { old: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.11%20PM.jpeg', new: 'assets/college_business.jpg' },
    { old: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.11%20PM%20(1).jpeg', new: 'assets/college_education.jpg' },
    { old: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.11%20PM%20(2).jpeg', new: 'assets/college_liberal_arts.jpg' },
    { old: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.21%20PM.jpeg', new: 'assets/college_it.jpg' },
    { old: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.11%20PM%20(3).jpeg', new: 'assets/college_health_science.jpg' }
];

replacements.forEach(r => {
    collegesHtml = collegesHtml.split(r.old).join(r.new);
});

fs.writeFileSync(collegesPath, collegesHtml);
console.log('Successfully updated image paths in colleges.html');
