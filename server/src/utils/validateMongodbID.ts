import mongoose from "mongoose";

export const validateMongodbID = (id: string | undefined) => {
  if (id) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error("This is not a valid MongoDB ID! 💥");
  } else {
    throw new Error("ID not found! 💥");
  }
};
