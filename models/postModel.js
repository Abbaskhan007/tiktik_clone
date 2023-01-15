const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: {
    type: Array,
    default: [],
  },

  caption: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  comments: {
    type: [
      {
        comment: {
          type: String,
          required: true,
        },
        commentedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    default: [],
  },
});

export default mongoose.models.post || mongoose.model("post", postSchema);
