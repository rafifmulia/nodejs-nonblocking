const fs = require("fs");

let c = 0;
async function blockingCode() {
  return new Promise((resolve, reject) => {
    // BLOCKING
    // ++c;
    // console.log('start number - ' + c);
    // for (let i = 0; i<6000000000; i++) {}
    // console.log('is BLOCKING code ? number - ' + c);
    // resolve(c);

    // reference: https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/ (accessed: 230119)
    const thePath = './user_db.json';
    // BLOCKING
    const data = fs.readFileSync(thePath); // blocks here until file is read
    console.log(data);
    // NONBLOCKING
    // fs.readFile(thePath, (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    // });
  });
}

async function blocking() {
  c = blockingCode();
  c = await blockingCode();
  console.log(c);
}

blocking();

/**
 * Why blocking code ?, even you do async function
 * ref: https://stackoverflow.com/questions/53876344/correct-way-to-write-a-non-blocking-function-in-node-js
 * more details :
 * - https://bytearcher.com/articles/blocking-vs-non-blocking-in-node.js/
 * - https://bytearcher.com/articles/not-everything-goes-to-worker-threads/
 */
