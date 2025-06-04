const mongoose = require("mongoose");

const taskLogSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  oldStatus: String,
  newStatus: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TaskLog", taskLogSchema);
