import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Heart, X, MapPin, Briefcase, School, Sparkles } from "lucide-react";

type UserCard = {
  id: number;
  name: string;
  age: number;
  location: string;
  distance: string;
  occupation: string;
  education: string;
  bio: string;
  image: string;
  interests: string[];
};

const initialUsers: UserCard[] = [
  {
    id: 1,
    name: "Sophia",
    age: 23,
    location: "Brooklyn, NY",
    distance: "2 miles",
    occupation: "Product Designer",
    education: "NYU",
    bio: "Creating beautiful things • Coffee addict",
    image: "https://images.unsplash.com/photo-1494790108777-766fd36f7b41?w=600&h=800&fit=crop",
    interests: ["Design", "Travel"]
  },
  {
    id: 2,
    name: "James",
    age: 24,
    location: "SoHo, NYC",
    distance: "1.5 miles",
    occupation: "Software Engineer",
    education: "Columbia",
    bio: "Building cool stuff • Guitar player",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
    interests: ["Coding", "Music"]
  },
  {
    id: 3,
    name: "Emma",
    age: 22,
    location: "Williamsburg",
    distance: "3 miles",
    occupation: "Marketing Intern",
    education: "Parsons",
    bio: "Art enthusiast • Plant mom",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
    interests: ["Art", "Fashion"]
  }
];

export default function UserCards() {
  const [users, setUsers] = useState<UserCard[]>(initialUsers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [exitX, setExitX] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    setDirection(direction === 'right' ? 1 : -1);
    setExitX(direction === 'right' ? 300 : -300);
    
    setTimeout(() => {
      if (currentIndex < users.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
      setDirection(0);
      setExitX(0);
    }, 200);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 80) {
      handleSwipe('right');
    } else if (info.offset.x < -80) {
      handleSwipe('left');
    }
  };

  const currentUser = users[currentIndex];

  if (!currentUser) return null;

  return (
    <motion.div 
      style={container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Animation */}
      <motion.div 
        style={header}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      >
        <motion.h1 
          style={headerTitle}
          whileHover={{ scale: 1.05 }}
        >
          discover
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles style={headerIcon} size={16} />
          </motion.div>
        </motion.h1>
      </motion.div>

      {/* Card Container */}
      <div style={cardContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentUser.id}
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 50,
              rotate: direction === 1 ? 10 : -10 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotate: 0,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }
            }}
            exit={{ 
              opacity: 0, 
              x: exitX,
              rotate: direction === 1 ? 10 : -10,
              scale: 0.8,
              transition: { duration: 0.2 }
            }}
            style={cardWrapper}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            whileTap={{ cursor: "grabbing" }}
          >
            {/* Card Image with Parallax Effect */}
            <motion.div 
              style={cardImageContainer}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={currentUser.image} 
                alt={currentUser.name}
                style={cardImage}
              />
              <motion.div 
                style={imageGradient}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              />
            </motion.div>

            {/* Card Content with Staggered Animation */}
            <motion.div 
              style={cardContent}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {/* Name and Age */}
              <motion.div 
                style={nameSection}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <motion.h2 
                  style={userName}
                  whileHover={{ scale: 1.05, originX: 0 }}
                >
                  {currentUser.name}
                </motion.h2>
                <span style={userAge}>{currentUser.age}</span>
              </motion.div>

              {/* Location */}
              <motion.div 
                style={infoRow}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <MapPin style={infoIcon} size={12} />
                <span style={infoText}>{currentUser.location}</span>
                <span style={infoDot}>•</span>
                <span style={infoText}>{currentUser.distance}</span>
              </motion.div>

              {/* Bio */}
              <motion.p 
                style={bio}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                {currentUser.bio}
              </motion.p>

              {/* Quick Info Tags */}
              <motion.div 
                style={tagsContainer}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.span 
                  style={tag}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                >
                  <Briefcase size={10} style={{ marginRight: '4px' }} />
                  {currentUser.occupation.split(' ')[0]}
                </motion.span>
                <motion.span 
                  style={tag}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                >
                  <School size={10} style={{ marginRight: '4px' }} />
                  {currentUser.education}
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Swipe Indicators */}
            <motion.div 
              style={swipeIndicatorLeft}
              animate={{ 
                opacity: exitX < 0 ? 1 : 0,
                scale: exitX < 0 ? 1.2 : 1
              }}
            >
              <X size={20} />
            </motion.div>
            
            <motion.div 
              style={swipeIndicatorRight}
              animate={{ 
                opacity: exitX > 0 ? 1 : 0,
                scale: exitX > 0 ? 1.2 : 1
              }}
            >
              <Heart size={20} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons with Hover Animations */}
      <motion.div 
        style={actionsContainer}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          style={{ ...actionButton, ...actionButtonNope }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 20px -5px rgba(239, 68, 68, 0.3)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('left')}
        >
          <X size={20} />
        </motion.button>
        
        <motion.button
          style={{ ...actionButton, ...actionButtonLike }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 20px -5px rgba(16, 185, 129, 0.3)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe('right')}
        >
          <Heart size={20} />
        </motion.button>
      </motion.div>

      {/* Counter with Animation */}
      <motion.p 
        style={counter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        key={currentIndex}
      >
        <motion.span
          key={currentIndex}
          initial={{ scale: 1.5, color: "#6366f1" }}
          animate={{ scale: 1, color: "#6b7280" }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {currentIndex + 1}
        </motion.span> / {users.length}
      </motion.p>
    </motion.div>
  );
}

// Styles
const container = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(145deg, #f5f0ff 0%, #f0e7ff 100%)",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  padding: "16px",
};

const header = {
  marginBottom: "20px",
  textAlign: "center" as const,
};

const headerTitle = {
  fontSize: "24px",
  fontWeight: 500,
  color: "#1e1b4b",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "6px",
  letterSpacing: "-0.5px",
};

const headerIcon = {
  color: "#8b5cf6",
};

const cardContainer = {
  width: "280px",
  height: "360px",
  position: "relative" as const,
  marginBottom: "16px",
};

const cardWrapper = {
  width: "100%",
  height: "100%",
  borderRadius: "24px",
  overflow: "hidden",
  position: "relative" as const,
  cursor: "grab",
  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)",
};

const cardImageContainer = {
  width: "100%",
  height: "100%",
  position: "relative" as const,
};

const cardImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const imageGradient = {
  position: "absolute" as const,
  bottom: 0,
  left: 0,
  right: 0,
  height: "60%",
  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
};

const cardContent = {
  position: "absolute" as const,
  bottom: 0,
  left: 0,
  right: 0,
  padding: "20px 16px",
  color: "white",
  zIndex: 2,
};

const nameSection = {
  display: "flex",
  alignItems: "baseline",
  gap: "6px",
  marginBottom: "4px",
};

const userName = {
  fontSize: "22px",
  fontWeight: 600,
  margin: 0,
  lineHeight: 1,
};

const userAge = {
  fontSize: "18px",
  fontWeight: 400,
  opacity: 0.9,
};

const infoRow = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginBottom: "8px",
  fontSize: "11px",
};

const infoIcon = {
  opacity: 0.8,
};

const infoText = {
  opacity: 0.9,
  fontSize: "11px",
};

const infoDot = {
  opacity: 0.5,
  fontSize: "11px",
};

const bio = {
  fontSize: "12px",
  lineHeight: 1.4,
  marginBottom: "10px",
  opacity: 0.9,
  maxWidth: "90%",
};

const tagsContainer = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap" as const,
};

const tag = {
  fontSize: "10px",
  backgroundColor: "rgba(255,255,255,0.2)",
  padding: "4px 8px",
  borderRadius: "30px",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(255,255,255,0.2)",
  display: "inline-flex",
  alignItems: "center",
};

const swipeIndicatorLeft = {
  position: "absolute" as const,
  top: "50%",
  left: "20px",
  transform: "translateY(-50%)",
  backgroundColor: "white",
  color: "#ef4444",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  zIndex: 10,
};

const swipeIndicatorRight = {
  position: "absolute" as const,
  top: "50%",
  right: "20px",
  transform: "translateY(-50%)",
  backgroundColor: "white",
  color: "#10b981",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  zIndex: 10,
};

const actionsContainer = {
  display: "flex",
  gap: "12px",
  marginBottom: "12px",
};

const actionButton = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 6px 12px -3px rgba(0,0,0,0.15)",
  transition: "all 0.2s",
};

const actionButtonNope = {
  backgroundColor: "white",
  color: "#ef4444",
  border: "2px solid #fee2e2",
};

const actionButtonLike = {
  backgroundColor: "white",
  color: "#10b981",
  border: "2px solid #d1fae5",
};

const counter = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "4px 0 0",
  fontWeight: 500,
};