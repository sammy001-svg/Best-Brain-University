const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'transfer-admissions.html',
    'student-life.html',
    'mission-vision.html',
    'leadership.html',
    'index.html',
    'history.html',
    'admissions-overview.html',
    'about-overview.html',
    'colleges.html'
];

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Match src="..." or url('...') containing WhatsApp Image
        // Use a function to encode only the path part
        const regex = /(src="|url\(')(assets\/WhatsApp Image [^"']+\.jpe?g)("|'\))/g;
        
        const newContent = content.replace(regex, (match, p1, p2, p3) => {
            const encodedPath = p2.split(' ').join('%20');
            console.log(`Updating ${file}: ${p2} -> ${encodedPath}`);
            return p1 + encodedPath + p3;
        });
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Successfully updated ${file}`);
        }
    }
});
