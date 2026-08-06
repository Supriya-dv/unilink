import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    role: {
      type: String,
      enum: ['student', 'alumni'],
      required: true,
    },
    department: String,
    university: String,
    location: String,
    occupationTitle: String,
    company: String,
    graduationYear: Number,
    bio: {
      type: String,
      maxLength: 500,
    },
    interests: [String],
    skills: [String],
    avatarUrl: {
      type: String,
      default: '',
    },
    coverUrl: {
      type: String,
      default: '',
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.toProfileJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);
export default User;
