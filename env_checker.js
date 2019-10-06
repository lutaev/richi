/**
 * Checks that environmental variables are present
 *
 * @param envVars
 */
function envChecker(envVars) {
  const invalidKeys = [];
  Object.keys(envVars).forEach((key) => {
    if (envVars[key] === undefined || envVars[key] === '') {
      invalidKeys.push(key);
    }
  });

  if (invalidKeys.length) {
    const separator = ', \n';
    throw new Error(`Environmental variables:\n${invalidKeys.join(separator)}\ncontains no value!`);
  }
}

module.exports = { envChecker };
