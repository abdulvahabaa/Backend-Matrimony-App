import collecion from "../connection/collecion.mjs";
import connectToDatabase from "../connection/db.mjs";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const db = await connectToDatabase(process.env.DATABASE);
    const result = await db
      .collection(collecion.USERS_COLLECTIION)
      .find({ userId: id })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
