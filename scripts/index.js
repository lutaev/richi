require('dotenv').config();
const script = require(`./${process.argv[2]}`);

script().catch(err => {
  console.log(err)
}).finally(() => process.exit())