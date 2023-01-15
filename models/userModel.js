const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/419/180/png-transparent-tiktok-icon-white-hd-logo.png",
  },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
