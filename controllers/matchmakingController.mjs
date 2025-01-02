export const createMatchmakingPost = async (req, res) => {
  try {
    const { id } = req.params;
    const postData = req.body;

    if (!postData.bio || !postData.preferences) {
      return res
        .status(400)
        .json({ message: "Bio and preferences are required to create a post" });
    }
    const db = await connectToDatabase(process.env.DATABASE);

    const existingPost = await db
      .collection("matchmaking_posts")
      .findOne({ userId: id });
    if (existingPost) {
      return res
        .status(400)
        .json({ message: "A matchmaking post already exists for this user" });
    }

    const newPost = {
      userId: id,
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isLookingForMatch: true,
    };

    const result = await db
      .collection(collection.MATCHMAKING_COLLECTION)
      .insertOne(newPost);

    res.status(201).json({
      message: "Matchmaking post created successfully",
      postId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating matchmaking post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
