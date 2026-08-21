const fs = require('fs');
const dir = 'C:/Users/muhammed faris k/.gemini/antigravity-ide/brain/7a835616-6f9e-4e42-8db4-499ac4d994e5/.user_uploaded';
const files = fs.readdirSync(dir).filter(f => f.match(/\.(png|jpg|jpeg|webp)$/i));
const sorted = files.map(f => ({f, mtime: fs.statSync(dir + '/' + f).mtime})).sort((a,b) => b.mtime - a.mtime);
console.log(sorted[0].f);
