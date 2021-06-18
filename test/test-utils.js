const describe = (message, callback) => {
  console.log(`* ${message}`);
  callback();
};

const it = (message, callback) => {
  console.log(`- ${message}`);
  callback(); // WTFFFFFFFFFF
};

module.exports = { describe, it };
