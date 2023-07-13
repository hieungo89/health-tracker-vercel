import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { QuestionMark } from "../../components/Icons";
import { Popover, Button, Text } from "@nextui-org/react";
import FoodCategory from "../../components/FoodCategory";

const AddMealData = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDataInput = async (e) => {
    e.preventDefault();

    const data = {
      email: session.user.email,
      date: e.target.date.value,
      exercise: {
        exercise_hr: e.target.exercise_hr.value,
        exercise_min: e.target.exercise_min.value,
      },
      sleep: {
        sleep_hr: e.target.sleep_hr.value,
        sleep_min: e.target.sleep_min.value,
      },
      weight: {
        weightData: e.target.weight.value,
        weightTime: time12hr,
      },
    };

    // await axios.post("/api/wellnessData", data);
    // router.push("/profile");
  };

  const handleSearchIngredients = async (e) => {
    e.preventDefault();
    const ingredients = e.target.foodName.value;

    console.log("ingredients ~~ ", ingredients);

    // await axios
    //   .get(
    //     `https://api.edamam.com/api/food-database/v2/parser?app_id=c68c9a1d&app_key=4ce474a24202f7f68e0308435ed057c4&ingr=${ingredients}`
    //   )
    //   .then((result) => console.log("data ~ ", result));
  };

  if (status === "loading") {
    return <Layout>...Loading</Layout>;
  }

  if (status === "unauthenticated") router.push("/");

  return (
    <>
      <Head>
        <title>Health Tracker - Meals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="flex flex-col items-center">
        <div>
          <h4>You must complete the following in order to record your meal:</h4>
          <li>Select Date</li>
          <li>Choose a meal type</li>
          <li>Search and add foods that you've eaten</li>
          Click "ADD MEAL" to input your data.
          <form>
            <input
              className="border-2 p-2 rounded mr-2"
              type="submit"
              value="ADD MEAL"
            />
            {/* <button
              className=""
              // onClick={() => handleReturnBtn()}
            >
              RETURN
            </button> */}

            {/* Date */}
            <div className="py-8">
              <label>Select Date: </label>
              <input
                type="date"
                name="date"
                max={new Date().toISOString().slice(0, 10)}
                required
              />
            </div>
            {/* Meal Type */}
            <div className="py-8">
              <label>Meal Type:</label>
              <select name="meal-type" required>
                <option disabled hidden></option>
                <option value="Breakfast">Breakfast</option>
                <option value="Brunch">Brunch</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
                <option value="TeaTime">TeaTime</option>
                <option value="Other">Other</option>
              </select>
              <label>
                <em>
                  *Warning: choosing the same Meal Type for the same date will
                  override your previous data.
                </em>
              </label>
            </div>
          </form>
          {/* Food Added: {!foodData.length && 0} */}
          <br />
          {/* {foodData.map((food) => {
            return (
              <Food
                food={food}
                key={food._id}
                handleRemove={handleRemoveIngredient}
              />
            );
          })} */}
          {/* Search Food */}
          <form onSubmit={(e) => handleSearchIngredients(e)}>
            <div className="flex flex-col py-8">
              <div>
                <label>Amount:</label>
                <input
                  className="text-end ml-2"
                  type="number"
                  name="amount"
                  placeholder="1"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div>
                <label>Measurement:</label>
                <select name="measurement" className="mx-2 text-center">
                  <option value="" disabled hidden></option>
                  <option value="Ounce">Ounce</option>
                  <option value="Gram">Gram</option>
                  <option value="Pound">Pound</option>
                  <option value="Kilogram">Kilogram</option>
                  <option value="Pinch">Pinch</option>
                  <option value="Liter">Liter</option>
                  <option value="Fluid ounce">Fluid ounce</option>
                  <option value="Gallon">Gallon</option>
                  <option value="Pint">Pint</option>
                  <option value="Quart">Quart</option>
                  <option value="Milliliter">Milliliter</option>
                  <option value="Drop">Drop</option>
                  <option value="Cup">Cup</option>
                  <option value="Tablespoon">Tablespoon</option>
                  <option value="Teaspoon">Teaspoon</option>
                </select>
              </div>

              <div>
                <label>Food/Ingredients:</label>
                <input
                  className="text-center mx-2"
                  type="text"
                  name="foodName"
                  placeholder="spaghetti"
                  required
                />
              </div>

              <div>
                <label>Health Labels:</label>
                <select name="health-label" className="mx-2 text-center">
                  <option value="" disabled hidden></option>
                  <option value="alcohol-free">alcohol-free</option>
                  <option value="celery-free">celery-free</option>
                  <option value="crustacean-free">crustacean-free</option>
                  <option value="dairy-free">dairy-free</option>
                  <option value="egg-free">egg-free</option>
                  <option value="fish-free">fish-free</option>
                  <option value="gluten-free">gluten-free</option>
                  <option value="immuno-supporive">immuno-supporive</option>
                  <option value="keto-friendly">keto-friendly</option>
                  <option value="kosher">kosher</option>
                  <option value="low-fat-abs">low-fat-abs</option>
                  <option value="low-potassium">low-potassium</option>
                  <option value="low-sugar">low-sugar</option>
                  <option value="no-oil-added">no-oil-added</option>
                  <option value="paleo">paleo</option>
                  <option value="peanut-free">peanut-free</option>
                  <option value="pork-free">pork-free</option>
                  <option value="red-meat-free">red-meat-free</option>
                  <option value="sesame-free">sesame-free</option>
                  <option value="shellfish-free">shellfish-free</option>
                  <option value="soy-free">soy-free</option>
                  <option value="tree-nut-free">tree-nut-free</option>
                  <option value="vegan">vegan</option>
                  <option value="vegetarian">vegetarian</option>
                  <option value="wheat-free">wheat-free</option>
                </select>
                <label className="italic text-gray-700">
                  &#40;optional&#41;
                </label>
              </div>

              {/* Category */}
              <div className="flex">
                <label className="flex">
                  Category
                  <Popover>
                    <Popover.Trigger>
                      <Text>
                        <QuestionMark className="mx-2 text-red-600" />
                      </Text>
                    </Popover.Trigger>
                    <Popover.Content>
                      <FoodCategory />
                    </Popover.Content>
                  </Popover>
                  :
                </label>
                <select name="category" className="mx-2 text-center">
                  <option value="" disabled hidden></option>
                  <option value="generic-foods">generic-foods</option>
                  <option value="generic-meals">generic-meals</option>
                  <option value="packaged-foods">packaged-foods</option>
                  <option value="fast-foods">fast-foods</option>
                </select>
                <label className="italic text-gray-700">
                  &#40;optional&#41;
                </label>
              </div>

              {/* Brand */}
              <div>
                <label>Brand:</label>
                <input
                  className="text-center mx-2"
                  type="text"
                  name="brand"
                  placeholder="Cheerios"
                />
                <label className="italic text-gray-700">
                  &#40;optional&#41;
                </label>
              </div>

              <div>
                <input
                  className="border-2 mr-2 px-2"
                  type="submit"
                  value="SEARCH"
                />
              </div>
            </div>
          </form>
          {/* {ingredientData && (
            <div>
              <br />
              Based on your search of {ingredientData.searchString}:
              <ul>
                {ingredientData.calories && (
                  <li>
                    Calories: {ingredientData.calories.quantity}
                    {ingredientData.calories.unit}
                  </li>
                )}
                {ingredientData.fat && (
                  <li>
                    Fat: {ingredientData.fat.quantity}
                    {ingredientData.fat.unit}
                  </li>
                )}
                {ingredientData.carbohydrate && (
                  <li>
                    Carbohydrate: {ingredientData.carbohydrate.quantity}
                    {ingredientData.carbohydrate.unit}
                  </li>
                )}
                {ingredientData.protein && (
                  <li>
                    Protein: {ingredientData.protein.quantity}
                    {ingredientData.protein.unit}
                  </li>
                )}
                {ingredientData.cholesterol && (
                  <li>
                    Cholesterol: {ingredientData.cholesterol.quantity}
                    {ingredientData.cholesterol.unit}
                  </li>
                )}
                {ingredientData.fiber && (
                  <li>
                    Fiber: {ingredientData.fiber.quantity}
                    {ingredientData.fiber.unit}
                  </li>
                )}
                {ingredientData.sodium && (
                  <li>
                    Sodium: {ingredientData.sodium.quantity}
                    {ingredientData.sodium.unit}
                  </li>
                )}
                {ingredientData.sugar && (
                  <li>
                    Sugar: {ingredientData.sugar.quantity}
                    {ingredientData.sugar.unit}
                  </li>
                )}
              </ul>
              <button className="">ADD</button>
            </div>
          )} */}
        </div>
      </Layout>
    </>
  );
};

export default AddMealData;
