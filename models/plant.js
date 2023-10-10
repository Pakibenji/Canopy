import { Schema, models, model } from "mongoose";

const PlantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    plantImage: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    proprietary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Plant = models.Plant || model("Plant", PlantSchema);
export default Plant;
