export const adminLogin = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    }
    return res.status(401).json({ message: "Invalid email or password." });
  } catch {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
