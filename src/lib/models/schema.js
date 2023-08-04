import { model, Schema, models } from "mongoose";

const userSchema = new Schema({
  googleName: { type: String },
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  image: String,
  birthday: Date,
  height: {
    height_ft: Number,
    height_in: Number,
  },
  dietaryGoals: [{ type: String, required: true }],
  dietaryRestrictions: { type: String, default: "None" },
  healthComplications: { type: String, default: "None" },
});
export const User = models.User || model("User", userSchema);

const userDataSchema = new Schema({
  email: String,
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
  email: String,
  date: String,
  mealType: String,
  foodsEaten: [String],
  foodsId: [String],
  totalNutrientCount: {
    //* Main Nutrients
    Calories: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Carbohydrates: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Cholesterol: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Fat: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Fiber: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Protein: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Saturated Fat": {
      quantity: Number,
      unit: String,
      perOfDailyNeeds: Number,
    },
    Sodium: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Sugar: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    //* Other Nutrients
    Calcium: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Choline: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Copper: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Fluoride: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Folate: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Folic Acid": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Iron: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Lycopene: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Magnesium: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Manganese: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Mono Unsaturated Fat": {
      quantity: Number,
      unit: String,
      perOfDailyNeeds: Number,
    },
    Phosphorus: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Poly Unsaturated Fat": {
      quantity: Number,
      unit: String,
      perOfDailyNeeds: Number,
    },
    Potassium: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Selenium: { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin A": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin B1": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin B12": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin B2": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin B3": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin B5": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin B6": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin C": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin D": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin E": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    "Vitamin K": { quantity: Number, unit: String, perOfDailyNeeds: Number },
    Zinc: { quantity: Number, unit: String, perOfDailyNeeds: Number },
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
