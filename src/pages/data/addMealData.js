import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

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
    const secret = process.env.EDAMAM_ID;
    console.log("process.env~ ", secret);
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
            <br />
            <br />
            <label>Select Date: </label> &nbsp;
            <input
              type="date"
              name="date"
              max={new Date().toISOString().slice(0, 10)}
              required
            />
            <br />
            <br />
            <label>Meal Type:</label> &nbsp;
            <select
              // value={mealType}
              // onChange={(e) => setMealType(e.target.value)}
              required
            >
              <option hidden>--</option>
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
            <br />
            <br />
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
          <br />
          <br />
          {/* Search Food */}
          <form onSubmit={(e) => handleSearchIngredients(e)}>
            <label>Add Description:</label>
            <input
              type="number"
              name="amount"
              placeholder="1"
              min="0"
              max="100"
              required
            />
            <input type="text" name="measurement" placeholder="cup" size="8" />
            of
            <input
              type="text"
              name="foodName"
              placeholder="spaghetti"
              size="10"
              required
            />
            <input
              className="border-2 ml-2 px-2"
              type="submit"
              value="SEARCH"
            />
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
