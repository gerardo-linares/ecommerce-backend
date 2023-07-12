import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: {
      type: Number,
      index: true,
    },
    code: String,
    stock: Number,
    category: {
      type: String,
      index: true,
    },
    status: { type: Boolean, default: false },
    thumbnails: {
      type: [],
      default: [],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;
