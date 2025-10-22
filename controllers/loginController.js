export async function login(req, res) {
  try {
    const { email, password } = req.body; // Get email and password from client
    console.log('Login request for:', email);
    const reader = await prisma.reader.findUnique({
      where: { email: email },
      select: { id: true, password: true, email: true, isAdmin: true },
    });

    if (!reader) {
      console.log('User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcryptjs.compare(password, reader.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    // Create the JWT token
    const token = jwt.sign(
      { readerId: reader.id, email: reader.email, isAdmin: reader.isAdmin },
      'bomba', // Use a strong secret in production!
      { expiresIn: '1h' }
    );

    console.log('JWT created successfully');

    // Respond with the JWT token and user info
    res.json({
      success: true,
      token: token,
      userId: reader.id,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login',
    });
  }
}
export async function signup(req, res, next) {
  try {
    // Hash the password using bcryptjs
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    // Check if the email already exists
    const existingReader = await prisma.reader.findUnique({
      where: { email: req.body.email },
    });

    if (existingReader) {
      // Email already registered
      console.error('Email or Username already registered');
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // If the email is not registered, create a new reader
    await prisma.reader.create({
      data: {
        password: hashedPassword,
        email: req.body.email,
        username: req.body.username,
        isAdmin: false,
      },
    });

    // Send a success response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (err) {
    // Handle any unexpected errors
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred during signup',
    });
    return next(err); // Pass the error to the next middleware
  }
}
