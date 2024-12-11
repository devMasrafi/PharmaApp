router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.json({ message: "user not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch:", isMatch);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.json({ message: "invalid credentials" });
    }

    // JWT generate
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "login successful", token });
  } catch (error) {
    console.error("Error during login:", error); // Log the error
    res.status(500).json({ message: "login failed", error: error.message });
  }
});
