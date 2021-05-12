const express = require("express");
const socket = require("socket.io");
const chokidar = require('chokidar');
const readLastLines = require('read-last-lines');

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

// Chokidar setup
const file = '../track.csv';
var watcher = chokidar.watch(file, { persistent: true });

io.on("connection", function (socket) {
  console.log("Made socket connection");

  watcher.on('change', async filePath => {
    console.log(
      `[${new Date().toLocaleString()}] ${filePath} has been updated.`
    );

    // Get update content of file, in this case is one line
    var updateContent = await readLastLines.read(filePath, 1);

    // emit an event when the file has been updated
    io.emit('file-updated', { message: updateContent });
  });
});