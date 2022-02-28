const fs = require("fs");
const path = require("path");

const lib = {
  baseDir: path.join(__dirname, "/../.data"),
  create: function (dir, file, data, callback) {
    const path = `${this.baseDir}/${dir}/${file}.json`;
    fs.open(path, "wx", function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, function (err) {
          if (!err) {
            fs.close(fileDescriptor, function (err) {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing new file");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("Could not create new file, it may already exist");
      }
    });
  },
  read: function (dir, file, callback) {
    const path = `${this.baseDir}/${dir}/${file}.json`;
    fs.readFile(path, "utf8", function (err, data) {
      callback(err, data);
    });
  },
  update: function (dir, file, data, callback) {
    const path = `${this.baseDir}/${dir}/${file}.json`;
    fs.open(path, "r+", function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        fs.ftruncate(fileDescriptor, function (err) {
          if (!err) {
            fs.writeFile(fileDescriptor, stringData, function (err) {
              if (!err) {
                fs.close(fileDescriptor, function (err) {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Error closing the file");
                  }
                });
              } else {
                callback("Error writing to new file");
              }
            });
          } else {
            callback("Error truncating file");
          }
        });
      } else {
        callback("Could not open file for updating, it may not exist yet'");
      }
    });
  },
  delete: function (dir, file, callback) {
    const path = `${this.baseDir}/${dir}/${file}.json`;
    fs.unlink(path, function (err){
      if(!err){
        callback(false);
      }
      else {
        callback('Error deleting file');
      }
    })
  },
};

module.exports = lib;
