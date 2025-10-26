const fs = require('fs');

function processHTML(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        const headerMatch = content.match(/<!-- ===============================================================================[\s\S]*?=============================================================================== -->/);
        const header = headerMatch ? headerMatch[0] : '';
        
        content = content.replace(/<!--[\s\S]*?-->/g, (match) => {
            if (match === header) {
                return match;
            }
            return '';
        });
        
        content = content.replace(/\n\s*\n\s*\n+/g, '\n\n');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Processed: ${filePath}`);
    } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
    }
}

console.log('Processing HTML file...\n');
processHTML('public/index.html');
console.log('\nHTML file processed!');

