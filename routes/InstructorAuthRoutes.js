const  express =  require ("express");
const { registerInstructor, loginInstructor } =require( "../controller/InstructorAuthController");

const router = express.Router();

// POST /api/instructors/signup
router.post("/instructor-signup", registerInstructor);

// POST /api/instructors/login
router.post("/instructor-login", loginInstructor);

module.exports= router;
