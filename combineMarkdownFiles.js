const fs = require('fs').promises;
const path = require('path');

async function combineMarkdownFiles(folderPath, outputFilePath) {
  try {
    // Read all files in the directory
    const files = await fs.readdir(folderPath);

    // Filter only .md files
    const mdFiles = files.filter(
      file => path.extname(file).toLowerCase() === '.md'
    );

    let combinedContent = '';

    // Process each markdown file
    for (const file of mdFiles) {
      const filePath = path.join(folderPath, file);
      const content = await fs.readFile(filePath, 'utf8');
      const fileName = path.basename(file, '.md');

      // Add content in the specified format
      combinedContent += '---\n'; // horizontal line
      combinedContent += `${fileName}\n`; // file name without extension
      combinedContent += '---\n'; // horizontal line
      combinedContent += `${content}\n\n`; // file content with extra newlines for separation
    }

    // Write the combined content to the output file
    await fs.writeFile(outputFilePath, combinedContent);
    console.log(
      `Successfully combined ${mdFiles.length} markdown files into ${outputFilePath}`
    );
  } catch (error) {
    console.error('Error combining markdown files:', error);
  }
}

// Example usage:
combineMarkdownFiles('./javascript/theory', './javascript-theory-combined.md');
