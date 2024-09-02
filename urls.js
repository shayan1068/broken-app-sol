const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Function to fetch URLs from the file and save the content
async function fetchUrls(filename) {
  try {
    // Read the file content
    const urls = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);

    // Iterate over each URL
    for (const url of urls) {
      try {
        // Make a GET request to the URL
        const response = await axios.get(url);

        // Extract the hostname from the URL
        const hostname = new URL(url).hostname;

        // Save the HTML content to a file named after the hostname
        const filePath = path.join(__dirname, `${hostname}.txt`);
        fs.writeFileSync(filePath, response.data);

        console.log(`Wrote to ${hostname}`);
      } catch (error) {
        console.error(`Couldn't download ${url}`);
      }
    }
  } catch (err) {
    console.error(`Error reading the file: ${filename}`);
    process.exit(1); // Exit if the input file cannot be read
  }
}

// Main function to execute the script
if (process.argv.length !== 3) {
  console.error('Usage: node urls.js <filename>');
  process.exit(1);
}

const filename = process.argv[2];
fetchUrls(filename);
