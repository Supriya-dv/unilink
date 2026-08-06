import User from '../models/User.js';

export const seedUsers = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const usersToSeed = [
      {
        email: "priya.sharma@google.com",
        password: "password123", // required by model
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

    await User.create(usersToSeed);

    res.status(201).json({ message: "Mock profiles seeded successfully!" });
  } catch (error) {
    next(error);
  }
};
