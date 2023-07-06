import mongoose from "mongoose";

export function mongooseConnect() {
  // if (mongoose.connection.readyState === 1) {
  //   return mongoose.connection.asPromise();
  // } else {
  const uri = process.env.MONGODB_URI;
  return mongoose.connect(uri);
  // }
}

// ! DELETE A schema in the database - Use as needed
// delete mongoose.connection.models["User"];
// delete mongoose.connection.models["UserData"];
// delete mongoose.connection.models["MealData"];
// delete mongoose.connection.models["NutritionData"];
