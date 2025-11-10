import mongoose from "mongoose";

// Lecture Subdocument Schema
const LectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Lecture title is required"],
    trim: true,
  },
  
  videoUrl: {
    type: String,
    required: [true, "Video URL is required"],
    match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid video URL"],
  },
  public_id: {
    type: String,
    required: [true, "Video public_id is required"],
  },
  freePreview: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

// Course Schema
const CourseSchema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Instructor ID is required"],
  },
  instructorName: {
    type: String,
    required: [true, "Instructor name is required"],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: [true, "Course title is required"],
    minlength: [3, "Title must be at least 3 characters"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: [true, "Level is required"],
  },
  primaryLanguage: {
    type: String,
    required: [true, "Primary language is required"],
  },
  subtitle: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Course image URL is required"],
  },
  welcomeMessage: {
    type: String,
    default: "",
  },
  pricing: {
    type: Number,
    required: [true, "Pricing is required"],
    min: [0, "Pricing must be 0 or more"],
  },
  objectives: {
    type: String,
    default: "",
  },
  students: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      studentName: {
        type: String,
        required: true,
      },
      studentEmail: {
        type: String,
        required: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
      },
      paidAmount: {
        type: Number,
        required: true,
        min: [0, "Paid amount must be at least 0"],
      },
    }
  ],
  curriculum: {
    type: [LectureSchema],
    default: [],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  versionKey: false,
});

// Indexing title and instructor for search optimization
CourseSchema.index({ title: "text", instructorName: "text" });

const Course = mongoose.model("Course", CourseSchema);
export default Course;