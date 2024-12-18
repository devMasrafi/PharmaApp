const generateUserName = (email) => {
  // Step 1: Extract the part before '@'
  const emailName = email.split("@")[0];

  // Step 2: Remove unwanted characters (dot, special characters, hyphen, underscore, numbers)
  const cleanedEmailName = emailName.replace(/[^\a-zA-Z]/g, "");

  // Step 3: Generate a random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  // Return the cleaned email name with the random number
  return cleanedEmailName + randomNum;
};

module.exports = generateUserName;
