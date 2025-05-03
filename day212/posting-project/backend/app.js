// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { body, validationResult } = require('express-validator');
// require('dotenv').config();

// const app = express();

// // Enhanced Middleware
// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB with enhanced settings
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// // User Model with validation
// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: 3,
//     maxlength: 30,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 8,
//   },
// });

// // Post Model with validation
// const PostSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     maxlength: 100,
//   },
//   content: {
//     type: String,
//     required: true,
//     maxlength: 2000,
//   },
//   image: String,
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model('User', UserSchema);
// const Post = mongoose.model('Post', PostSchema);

// // Enhanced Multer configuration
// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error('Only JPG, PNG, and GIF images are allowed'));
//     }
//     cb(null, true);
//   },
// });

// // Enhanced Auth Middleware
// const auth = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
  
//   if (!token) {
//     return res.status(401).json({ error: 'Authentication required' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);
    
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // Routes with Validation
// app.post('/api/register',
//   body('username').isLength({ min: 3 }).trim().escape(),
//   body('password').isLength({ min: 8 }),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { username, password } = req.body;
//       const existingUser = await User.findOne({ username });
      
//       if (existingUser) {
//         return res.status(400).json({ error: 'Username already exists' });
//       }

//       const hashedPassword = await bcrypt.hash(password, 12);
//       const user = new User({ username, password: hashedPassword });
//       await user.save();
      
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//       res.status(201).json({ token, userId: user._id });
//     } catch (err) {
//       res.status(500).json({ error: 'Registration failed' });
//     }
//   }
// );

// app.post('/api/login',
//   body('username').exists(),
//   body('password').exists(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { username, password } = req.body;
//       const user = await User.findOne({ username });
      
//       if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }

//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//       res.json({ token, userId: user._id });
//     } catch (err) {
//       res.status(500).json({ error: 'Login failed' });
//     }
//   }
// );

// // Post Routes
// app.get('/api/posts', auth, async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const posts = await Post.find()
//       .populate('author', 'username')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const totalPosts = await Post.countDocuments();
    
//     res.json({
//       posts,
//       currentPage: page,
//       totalPages: Math.ceil(totalPosts / limit),
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch posts' });
//   }
// });

// app.delete('/api/posts/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
    
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     if (post.author.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ error: 'Unauthorized action' });
//     }

//     await post.remove();
//     res.json({ message: 'Post deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete post' });
//   }
// });

// // User Profile Endpoint
// app.get('/api/users/me', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch user data' });
//   }
// });

// // Logout (Token Blacklist - simple implementation)
// const tokenBlacklist = new Set();
// app.post('/api/logout', auth, (req, res) => {
//   const token = req.header('Authorization').replace('Bearer ', '');
//   tokenBlacklist.add(token);
//   res.json({ message: 'Logged out successfully' });
// });

// // Updated Auth Middleware to check blacklist
// const enhancedAuth = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
  
//   if (!token || tokenBlacklist.has(token)) {
//     return res.status(401).json({ error: 'Authentication required' });
//   }
  
//   // Rest of original auth logic...
// };

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Add to server.js

// // 2.1. Refresh Tokens
// const generateTokens = (userId) => ({
//     accessToken: jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' }),
//     refreshToken: jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' })
//   });
  
//   // 2.2. Rate Limiting
//   const rateLimit = require('express-rate-limit');
//   app.use('/api/', rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   }));
  
//   // 2.3. Security Headers
//   const helmet = require('helmet');
//   app.use(helmet());
  
//   // 2.4. Database Indexes (Add to models)
//   UserSchema.index({ username: 1 }, { unique: true });
//   PostSchema.index({ author: 1, createdAt: -1 });
  
//   // 2.5. Environment Validation
//   const envalid = require('envalid');
//   const { cleanEnv, str, num } = envalid;
//   cleanEnv(process.env, {
//     MONGODB_URI: str(),
//     JWT_SECRET: str(),
//     REFRESH_SECRET: str(),
//     PORT: num({ default: 5000 })
//   });
  
//   // 2.6. Image Cleanup Middleware
//   const fs = require('fs');
//   PostSchema.post('findOneAndDelete', async (doc) => {
//     if (doc.image) {
//       fs.unlink(doc.image, (err) => {
//         if (err) console.error('Error deleting image:', err);
//       });
//     }
//   });


//   // Enhanced Registration Route with Validation
// app.post('/api/register',
//   [
//     body('username')
//       .isLength({ min: 3 })
//       .withMessage('Username must be at least 3 characters')
//       .trim()
//       .escape(),
//     body('password')
//       .isLength({ min: 8 })
//       .withMessage('Password must be at least 8 characters')
//       .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
//       .withMessage('Password must contain uppercase, lowercase, and number')
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { username, password } = req.body;
      
//       // Check if user exists
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ error: 'Username already taken' });
//       }

//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 12);
      
//       // Create user
//       const user = new User({
//         username,
//         password: hashedPassword
//       });

//       await user.save();

//       // Generate JWT
//       const token = jwt.sign(
//         { userId: user._id },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );

//       res.status(201).json({
//         message: 'User registered successfully',
//         token,
//         userId: user._id
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error during registration' });
//     }
//   }
// );

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Models
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  password: { type: String, required: true, minlength: 8 }
}));

const Post = mongoose.model('Post', new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true, maxlength: 2000 },
  image: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
}));

// Image upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
  }
});

// Auth middleware
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/api/register',
  body('username').isLength({ min: 3 }),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { username, password } = req.body;
      if (await User.findOne({ username })) return res.status(400).json({ error: 'Username taken' });

      const user = new User({
        username,
        password: await bcrypt.hash(password, 12)
      });
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token, userId: user._id });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

app.post('/api/login',
  body('username').exists(),
  body('password').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, userId: user._id });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

app.post('/api/posts', auth, upload.single('image'), async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.file?.path,
      author: req.user._id
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Post creation failed' });
  }
});

app.get('/api/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.delete('/api/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));