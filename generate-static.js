const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

// Directories
const viewsDir = path.join(__dirname, 'views');
const layoutPath = path.join(viewsDir, 'layouts', 'main.hbs');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');
const outputDir = path.join(__dirname, 'docs');

// Pages to generate
const pages = [
  { template: 'home.hbs', output: 'index.html' },
  { template: 'about.hbs', output: 'about.html' },
  { template: 'contact.hbs', output: 'contact.html' },
  { template: 'portfolio.hbs', output: 'portfolio.html' },
  { template: 'services.hbs', output: 'services.html' },
  { template: 'thank-you.hbs', output: 'thank-you.html' }
];

// Register partials
fs.readdirSync(partialsDir).forEach(file => {
  const partialName = path.basename(file, '.hbs');
  const partialContent = fs.readFileSync(path.join(partialsDir, file), 'utf-8');
  Handlebars.registerPartial(partialName, partialContent);
});

// Register custom helpers
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });  

// Compile layout
const layoutTemplate = Handlebars.compile(fs.readFileSync(layoutPath, 'utf-8'));

// Generate HTML files
(async () => {
  await fs.emptyDir(outputDir);
  await fs.copy(publicDir, path.join(outputDir)); // Copy static assets

  pages.forEach(({ template, output }) => {
    const templatePath = path.join(viewsDir, template);
    const templateHtml = fs.readFileSync(templatePath, 'utf-8');
    const contentTemplate = Handlebars.compile(templateHtml);

    const body = contentTemplate(); // Add data here if needed
    const fullHtml = layoutTemplate({ body });

    fs.outputFileSync(path.join(outputDir, output), fullHtml);
    console.log(`✅ Generated: ${output}`);
  });

  console.log('✨ All pages generated and assets copied to /docs');
})();
