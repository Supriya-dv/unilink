import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, fullName, age, role, department, interests, bio } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    let parsedInterests = interests;
    if (typeof interests === 'string') {
      parsedInterests = interests.split(',').map((i) => i.trim());
    }

    const user = await User.create({
      email,
      password,
      fullName,
      age,
      role,
      department,
      interests: parsedInterests,
      bio,
    });

    // Automatically seed other mock users so the Discovery feed has users immediately
    const mockUsers = [
      {
        email: "priya.sharma@google.com",
        password: "password123",
        fullName: "Priya Sharma",
        age: 23,
        role: "alumni",
        department: "Computer Science",
        university: "IIT Bombay",
        location: "Silicon Valley, CA",
        occupationTitle: "Software Engineer",
        company: "Google",
        bio: "IIT Bombay alumni. Working on large-scale payments infrastructure at Google. Ask me about system design, DSA prep, or moving to the US! 🚀",
        interests: ["System Design", "DSA", "Open Source", "Coffee"],
        skills: ["Java", "Distributed Systems", "Go", "Kubernetes"],
        avatarUrl: "https://images.unsplash.com/photo-1494790108777-766fd36f7b41?w=600&h=800&fit=crop",
      },
      {
        email: "rahul.verma@stanford.edu",
        password: "password123",
        fullName: "Rahul Verma",
        age: 21,
        role: "student",
        department: "Electrical Engineering",
        university: "Stanford University",
        location: "Stanford, CA",
        occupationTitle: "Student Researcher",
        bio: "EE Senior at Stanford. Currently researching neuromorphic computing architectures. Looking for collaborators on AI hardware projects!",
        interests: ["AI Hardware", "Neural Networks", "Hardware Design"],
        skills: ["Python", "Verilog", "C++", "PyTorch"],
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
      },
      {
        email: "emma.watson@parsons.edu",
        password: "password123",
        fullName: "Emma Watson",
        age: 22,
        role: "student",
        department: "Communication Design",
        university: "Parsons School of Design",
        location: "New York, NY",
        occupationTitle: "Design Intern",
        bio: "Senior at Parsons. Passionate about minimalism, color theory, and glassmorphism UI design. Plant mom & art explorer. 🌿🎨",
        interests: ["UI/UX Design", "Fine Art", "Minimalism", "Photography"],
        skills: ["Figma", "Illustrator", "React", "Tailwind CSS"],
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
      },
      {
        email: "leo.nelson@nyu.edu",
        password: "password123",
        fullName: "Leo Nelson",
        age: 24,
        role: "alumni",
        department: "Philosophy",
        university: "NYU",
        location: "Brooklyn, NY",
        occupationTitle: "Content Creator",
        bio: "NYU Alumni. Writing essays at the intersection of technology, cognitive science, and human nature. Let's debate! ✍️🧠",
        interests: ["Philosophy", "Cognitive Science", "Writing", "Cycling"],
        skills: ["Creative Writing", "Research", "Public Speaking"],
        avatarUrl: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&h=800&fit=crop",
      }
    ];

    for (const mock of mockUsers) {
      const exists = await User.findOne({ email: mock.email });
      if (!exists) {
        await User.create(mock);
      }
    }

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: user.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: user.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res, next) => {
  res.status(200).json({
    user: req.user.toProfileJSON(),
  });
};

export const googleAuth = async (req, res, next) => {
  try {
    const { email, fullName, avatarUrl } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Google email is required' });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        email: email.toLowerCase(),
        password: "google_oauth_protected_password_123",
        fullName: fullName || "Google User",
        role: "student",
        department: "Computer Science",
        university: "Campus Community",
        avatarUrl: avatarUrl || "",
        bio: "Authenticated using Google Single Sign-On.",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: user.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const githubAuth = async (req, res, next) => {
  try {
    const { email, fullName, avatarUrl, githubUsername } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'GitHub email is required' });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        email: email.toLowerCase(),
        password: "github_oauth_protected_password_123",
        fullName: fullName || githubUsername || "GitHub User",
        role: "student",
        department: "Computer Science",
        university: "Campus Community",
        avatarUrl: avatarUrl || "",
        bio: "Authenticated using GitHub Single Sign-On.",
        socialLinks: { github: githubUsername || '' },
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: user.toProfileJSON(),
    });
  } catch (error) {
    next(error);
  }
};
