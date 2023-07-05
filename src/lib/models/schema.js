import { model, Schema, models } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  age: Number,
  height: {
    foot: Number,
    inch: Number,
  },
  dietaryGoals: { type: String },
  dietaryRestrictions: { type: String, default: null },
  healthComplications: { type: String, default: "None" },
});
export const User = models.User || model("User", userSchema);

const userDataSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  date: String,
  weight: {
    weightData: Number,
    weightTime: String,
  },
  sleep: {
    sleep_hr: Number,
    sleep_min: Number,
  },
  exercise: {
    exercise_hr: Number,
    exercise_min: Number,
  },
});
export const UserData = models.UserData || model("UserData", userDataSchema);

const mealDataSchema = new Schema({
  username: String,
  date: String,
  mealType: String,
  mealId: Number,
  foodsEaten: String,
  nutrientCount: {
    calories: { quantity: Number, unit: String },
    fat: { quantity: Number, unit: String },
    carbohydrate: { quantity: Number, unit: String },
    fiber: { quantity: Number, unit: String },
    sugar: { quantity: Number, unit: String },
    protein: { quantity: Number, unit: String },
    cholesterol: { quantity: Number, unit: String },
    sodium: { quantity: Number, unit: String },
  },
});
export const MealData = models.MealData || model("MealData", mealDataSchema);

const nutritionDataSchema = new Schema({
  searchString: String,
  food: String,
  quantity: Number,
  measure: String,
  calories: { label: String, quantity: Number, unit: String },
  fat: { label: String, quantity: Number, unit: String },
  carbohydrate: { label: String, quantity: Number, unit: String },
  fiber: { label: String, quantity: Number, unit: String },
  sugar: { label: String, quantity: Number, unit: String },
  protein: { label: String, quantity: Number, unit: String },
  cholesterol: { label: String, quantity: Number, unit: String },
  sodium: { label: String, quantity: Number, unit: String },
});
export const NutritionData =
  models.NutritionData || model("NutritionData", nutritionDataSchema);
