const express = require("express");
const app = express();
const adb = require("adbkit");
const client = adb.createClient();
app.post("/lock-device", (req, res) => {
  client
    .listDevices()
    .then((devices) => {
      if (devices.length > 0) {
        // Run adb shell command to lock the screen
        return client.shell(devices[0].id, "input keyevent 26"); // 26 is the ADB keyevent for locking the device
      } else {
        throw new Error("No devices connected");
      }
    })
    .then(adb.util.readAll)
    .then(() => {
      res.send("Device locked successfully");
    })
    .catch((err) => {
      res.status(500).send("Failed to lock device: " + err.message);
    });
});
const port = 3030;
app.listen(port, () => {
  console.log(`port listing  on ${port}`);
});
