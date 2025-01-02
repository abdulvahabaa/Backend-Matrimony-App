import collecion from "../connection/collecion.mjs";
import connectToDatabase from "../connection/db.mjs";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const db = await connectToDatabase(process.env.DATABASE);
    const result = await db
      .collection(collecion.USERS_COLLECTION)
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

export const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const db = await connectToDatabase(process.env.DATABASE);

    const result = await db
      .collection(collecion.USERS_COLLECTION)
      .updateOne({ userId: id }, { $set: updatedData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const db = await connectToDatabase(process.env.DATABASE);
    const result = await db
      .collection(collecion.USERS_COLLECTION)
      .deleteOne({ userId: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const reportProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const reportData = req.body;

    if (!reportData.reason) {
      return res.status(400).json({ message: "Report reason is required" });
    }

    const db = await connectToDatabase(process.env.DATABASE);
    const result = await db.collection("reported_profiles").insertOne({
      userId: id,
      ...reportData,
      reportedAt: new Date(),
    });

    res.status(201).json({
      message: "Profile reported successfully",
      reportId: result.insertedId,
    });
  } catch (error) {
    console.error("Error reporting profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
