const fs = require('fs');
const path = require('path');

const collegesPath = path.join(__dirname, 'colleges.html');

let collegesHtml = fs.readFileSync(collegesPath, 'utf8');

const replacements = [
    { old: 'assets/WhatsApp Image 2026-03-14 at 5.09.11 PM.jpeg', new: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.11%20PM.jpeg' },
    { old: 'assets/WhatsApp Image 2026-03-14 at 5.09.11 PM (1).jpeg', new: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.11%20PM%20(1).jpeg' },
    { old: 'assets/WhatsApp Image 2026-03-14 at 5.09.11 PM (2).jpeg', new: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.11%20PM%20(2).jpeg' },
    { old: 'assets/WhatsApp Image 2026-03-14 at 5.09.21 PM.jpeg', new: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.21%20PM.jpeg' },
    { old: 'assets/WhatsApp Image 2026-03-14 at 5.09.11 PM (3).jpeg', new: 'assets/WhatsApp%20Image%202026-03-14%20at%205.09.11%20PM%20(3).jpeg' }
];

replacements.forEach(r => {
    collegesHtml = collegesHtml.split(r.old).join(r.new);
});

fs.writeFileSync(collegesPath, collegesHtml);
console.log('Successfully encoded image URLs in colleges.html');
