// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {

  if (license.toLowerCase() === 'none') {
    return ''
  }

  switch (license.toLowerCase(license)) {
    case "mit":
      return '(https://img.shields.io/apm/l/atomic-design-ui.svg?)'
      break;

    case "gplv3":
      return '(https://img.shields.io/badge/License-GPL%20v3-yellow.svg)'
      break;

    case "agpl":
      return '(https://img.shields.io/badge/license-AGPL-blue.svg)'
      break;

    default:
      console.log(`No matched License found for  ${license}.`);
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {

  if (license.toLowerCase() === 'none') {
    return ''
  }

  switch (license.toLowerCase(license)) {
    case "mit":
      return '(https://choosealicense.com/licenses/mit/)'
      break;

    case "gplv3":
      return '(https://choosealicense.com/licenses/gpl-3.0/)'
      break;

    case "agpl":
      return '(https://choosealicense.com/licenses/agpl-3.0/)'
      break;

    default:
      console.log(`No matched License found for  ${license}.`);
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license.toLowerCase() === 'none') {
    return ''
  }

  return `[![${license} License]${renderLicenseBadge(license)}]${renderLicenseLink(license)}`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  console.log(data);

  return ` 
# ${data.Title}

## ${Object.keys(data)[6]}
${renderLicenseSection(data.License)}

## ${Object.keys(data)[1]}
  ### ${data.Description} 

## Table Of Content
${generateTableOfContent(data)}
    
## ${Object.keys(data)[2]}
${formatEditorData(data.Installation)}

## ${Object.keys(data)[3]}
${data.Usage}

## ${Object.keys(data)[4]}
${data.Contribution}
    
## ${Object.keys(data)[5]}
${formatEditorData(data.TestCase)}    
`
}

// Function to generate the Table of Content
function generateTableOfContent(content) {

  let tableContent = "";

  for (key in content) {
    if (key.toLowerCase() !== "title") {
      tableContent += (` * [${key}](#${key.toLowerCase()})\n`);
    }
  };

  return tableContent;
}

// Function to format the editor data
function formatEditorData(data) {
  let content = "";
  return content.concat("```bash\n" + `${data}` + " \n ```");
}

module.exports = formatEditorData;
module.exports = generateTableOfContent;
module.exports = generateMarkdown;


