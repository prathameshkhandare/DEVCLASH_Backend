const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./configs/dbconfig');

const AuthRoute = require('./routes/AuthRoutes')
const TestRoute = require('./routes/TestRoutes');
const ResourceRoute = require('./routes/ResourceRoutes')
const ModuleRoute = require('./routes/ModuleRoutes');
const SubjectRoute= require('./routes/SubjectRoutes');
const StudentProfileRoutes = require('./routes/studentprofileRoutes')
const ProfileRoute = require('./routes/ProfileRoutes')
const AdminRoute = require('./routes/AdminRoutes');

const YtVideoRoutes = require('./routes/YtVideoRoutes')
const TestFeedbackRoute = require('./routes/AiRoutes')

const instructorAuthRoutes = require('./routes/InstructorAuthRoutes')
const qpaperRoutes = require('./routes/InstructorQpaperRoutes')
const QuestionPaperSolnRoutes = require('./routes/QuestionPaperSolnRoutes')
// Load environment variables from .env fi
dotenv.config();
const ChatRoutes = require('./routes/ChatRoutes');

const app = express();
connectDB(); // Connect to MongoDB

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api',ChatRoutes)
app.use('/api',TestFeedbackRoute)
app.use('/api/test',TestRoute);
app.use('/api/subject',SubjectRoute);
app.use('/api',AuthRoute)
app.use('/api/resource', ResourceRoute);
app.use('/api/module', ModuleRoute);
app.use('/api',StudentProfileRoutes)
app.use('/api/profile', ProfileRoute);
app.use('/api/admin', AdminRoute);
app.use('/api/qpaper',qpaperRoutes)
app.use('/api/testsoln',QuestionPaperSolnRoutes)
app.use('/api',YtVideoRoutes)

app.use("/api/auth", instructorAuthRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
