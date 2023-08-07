import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { Grid, Card, Modal, Button, Text } from "@nextui-org/react";
import { useState } from "react";
import FoodDisplayCard from "../../components/FoodDisplayCard";
import Popup from "../../components/Popup";
import Link from "next/link";

const AddMealData = () => {
  const [foodItems, setFoodItems] = useState({});
  const [foodItemModal, setFoodItemModal] = useState(false);
  const [chosenFood, setChosenFood] = useState({});
  const [itemsQuantity, setItemsQuantity] = useState(1);
  const [chosenItems, setChosenItems] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  //! Search API for specific food ingredients & setFoodItems
  const handleSearchIngredients = async (e) => {
    e.preventDefault();
    const data = { ingredients: e.target.ingredients.value };
    console.log("Search ingredients ~~ ", data);

    axios
      .get(
        `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_KEY}&query=${data.ingredients}&number=100`
      )
      .then((result) => setFoodItems(result.data))
      .catch((err) => console.log("Error searching ingredient in API : ", err));
  };

  //! Add ingredient to the list
  const handleAddIngredient = (e) => {
    e.preventDefault();

    //! Edit Mode
    if (chosenFood.unit) removeItem(chosenFood);

    //! Regular Adding
    axios
      .get(
        `https://api.spoonacular.com/food/ingredients/${
          chosenFood.id
        }/information?apiKey=${
          process.env.NEXT_PUBLIC_SPOONACULAR_KEY
        }&amount=${e.target.amount.value}&unit=${
          e.target.measurement.value || e.target.unit.value
        }`
      )
      .then((result) => {
        setChosenItems((prev) => [...prev, result.data]);
        setFoodItemModal(false);
        setEditMode(false);
      });
  };

  //! Add ALL chosen food items to the DB
  const handleMealInput = async (e) => {
    e.preventDefault();

    if (!chosenItems.length) {
      alert(
        `\nPlease add food that you've eaten using the SEARCH Ingredients on top.`
      );
      return;
    }

    const foodsEaten = chosenItems.map((item) => {
      return item.amount + " " + item.unit + " " + item.name;
    });
    const foodsId = chosenItems.map((item) => {
      return item.id;
    });

    const totalNutrientData = {
      Calories: { quantity: 0, unit: "kcal", perOfDailyNeeds: 0 },
      Carbohydrates: { quantity: 0, unit: "g", perOfDailyNeeds: 0 },
      Cholesterol: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      Fat: { quantity: 0, unit: "g", perOfDailyNeeds: 0 },
      Fiber: { quantity: 0, unit: "g", perOfDailyNeeds: 0 },
      Protein: { quantity: 0, unit: "g", perOfDailyNeeds: 0 },
      "Saturated Fat": { quantity: 0, unit: "g", perOfDailyNeeds: 0 },
      Sodium: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      Sugar: { quantity: 0, unit: "g", perOfDailyNeeds: 0 },
      Calcium: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      Choline: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      Copper: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      Fluoride: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      Folate: { quantity: 0, unit: "µg", perOfDailyNeeds: 0 },
      "Folic Acid": { quantity: 0, unit: "µg", perOfDailyNeeds: 0 },
      Iron: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      Lycopene: { quantity: 0, unit: "µg", perOfDailyNeeds: 0 },
      Magnesium: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      Manganese: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      "Mono Unsaturated Fat": { quantity: 0, unit: "g", perOfDailyNeeds: 0 },
      Phosphorus: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      "Poly Unsaturated Fat": { quantity: 0, unit: "g", perOfDailyNeeds: 0 },
      Potassium: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      Selenium: { quantity: 0, unit: "µg", perOfDailyNeeds: 0 },
      "Vitamin A": { quantity: 0, unit: "IU", perOfDailyNeeds: 0 },
      "Vitamin B1": { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      "Vitamin B12": { quantity: 0, unit: "µg", perOfDailyNeeds: 0 },
      "Vitamin B2": { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      "Vitamin B3": { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      "Vitamin B5": { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      "Vitamin B6": { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      "Vitamin C": { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      "Vitamin D": { quantity: 0, unit: "µg", perOfDailyNeeds: 0 },
      "Vitamin E": { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
      "Vitamin K": { quantity: 0, unit: "µg", perOfDailyNeeds: 0 },
      Zinc: { quantity: 0, unit: "mg", perOfDailyNeeds: 0 },
    };

    await chosenItems.forEach((item) => {
      item.nutrition.nutrients.forEach((nutrient) => {
        if (totalNutrientData[nutrient.name]) {
          totalNutrientData[nutrient.name].quantity += nutrient.amount;
          totalNutrientData[nutrient.name].perOfDailyNeeds +=
            nutrient.percentOfDailyNeeds;
        }
      });
    });

    const data = {
      email: session.user.email,
      date: e.target.date.value,
      mealType: e.target.mealType.value,
      foodsEaten: foodsEaten,
      foodsId: foodsId,
      totalNutrientCount: totalNutrientData,
    };

    if (data.mealType && data.date && data.foodsEaten.length) {
      await axios.post("/api/mealData", data).then(() => setChosenItems([]));
      router.push("/profile");
    }
  };

  const editItem = (item) => {
    setFoodItemModal(true);
    setChosenFood(item);
    setItemsQuantity(item.amount);
    setEditMode(true);
  };

  const removeItem = (item) => {
    const pickedFoodItems = chosenItems.filter(
      (singleItem) => singleItem.id !== item.id
    );
    setChosenItems(pickedFoodItems);
    setFoodItemModal(false);
    setEditMode(false);
  };

  if (status === "loading") return <Layout>...Loading</Layout>;
  if (status === "unauthenticated") router.push("/");

  return (
    <>
      <Head>
        <title>Health Tracker - Meals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className="text-center underline">Meal Input</h1>
        <div className="flex">
          <div className="flex flex-col">
            {/* Instructions */}
            <div className="flex flex-col">
              <div>
                <button className="text-lg bg-white/70 text-gray-900 p-2 mb-4 border rounded font hover:border-black hover:bg-green-400">
                  <Link href="/profile" className="text-black">
                    Return to Profile
                  </Link>
                </button>
              </div>

              <h3>Instructions:</h3>
              <ol>
                <li>Search and add foods that you&apos;ve eaten</li>
                <li>Select Date</li>
                <li>Choose a meal type</li>
                <li>
                  Click <b className="text-red-600">&quot;ADD MEAL&quot;</b> to
                  save your data.
                </li>
              </ol>
            </div>

            {/* Search Food */}
            <form
              onSubmit={(e) => handleSearchIngredients(e)}
              className="flex flex-col max-w-7xl mt-12"
            >
              <p className="text-lg font-semibold pb-2">
                This search feature is specifically for searching food
                ingredients only. Specific foods may be added in the future.
              </p>
              <div className="flex">
                <div className="flex justify-start items-center border rounded px-4">
                  {/* Ingredients */}
                  <label htmlFor="ingredients" className="flex">
                    Food Ingredients
                    <Popup
                      text="Enter simple ingredient name to begin searching for food. Specific food dish will not show any results."
                      card={true}
                      placement="top"
                    />
                    :
                  </label>
                  <input
                    className="text-center mx-2"
                    type="text"
                    name="ingredients"
                    placeholder="spaghetti"
                  />
                </div>
                <input
                  className="text-lg bg-white/70 border-2 rounded-xl py-2 px-4 ml-8 hover:bg-green-400 hover:border-black"
                  type="submit"
                  value="Search"
                />
              </div>
            </form>

            {/* Input Data to DB */}
            <form
              onSubmit={(e) => handleMealInput(e)}
              className="flex flex-col"
            >
              <div className="pt-8">
                <label htmlFor="selectDate">Select Date: </label>
                <input
                  className="p-1 mx-2"
                  type="date"
                  name="date"
                  max={new Date().toISOString().slice(0, 10)}
                  required
                />
              </div>
              {/* Meal Type */}
              <div className="flex flex-col py-4">
                <div className="flex">
                  <label htmlFor="mealType" className="flex">
                    Meal Type
                    <Popup
                      text="Choose OTHER if you have want to add additional meals data."
                      placement="top"
                      card={true}
                    />
                    :
                  </label>
                  <select name="mealType" className="ml-2" required>
                    <option hidden></option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Brunch">Brunch</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="TeaTime">TeaTime</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <label htmlFor="warning" className="italic">
                  <b className="text-red-600">*Warning:</b> choosing the same
                  Meal Type for the same date will override your previous data.
                </label>
              </div>

              <input
                className="text-2xl bg-white/70 border-2 p-2 my-4 rounded hover:bg-green-400 hover:border-black"
                type="submit"
                value="ADD MEAL"
              />

              {/* My chosen food items */}
              {chosenItems.length ? (
                <>
                  <h3 className="self-center underline">
                    CLICK on the card to EDIT.
                  </h3>
                  <Grid.Container
                    gap={2}
                    justify="flex-start"
                    name="chosenFoodItems"
                  >
                    {chosenItems.map((item) => (
                      <Grid key={item.id + item.amount + item.unit}>
                        <FoodDisplayCard
                          item={item}
                          clicked={() => editItem(item)}
                        />
                      </Grid>
                    ))}
                  </Grid.Container>
                </>
              ) : null}
            </form>
          </div>

          {/* Right Side - Display Food Cards */}
          {foodItems.results?.length ? (
            <div className="p-2 border rounded-lg mx-4">
              <Grid.Container gap={1} justify="center">
                <h4>
                  <span className="text-red-600">DISCLAIMER:</span> Due to usage
                  of the FREE API, there is a limited amount of API usage per
                  day. Once the limit is reached, this will NOT display any
                  results.
                </h4>
                {foodItems.results.map((item) => (
                  <Grid key={item.id}>
                    <FoodDisplayCard
                      item={item}
                      clicked={() => {
                        setFoodItemModal(true);
                        setChosenFood(item);
                        setItemsQuantity(1);
                      }}
                    />
                  </Grid>
                ))}
              </Grid.Container>
            </div>
          ) : null}
        </div>

        {/* Add/Edit Food eaten to Meals */}
        <Modal
          aria-labelledby="get-ingredient-info-modal"
          open={foodItemModal}
          onClose={() => setFoodItemModal(false)}
          css={{ cursor: "default" }}
        >
          <form onSubmit={(e) => handleAddIngredient(e)}>
            <Modal.Header>
              <Text id="get-ingredient-info-modal" size={32}>
                {chosenFood.name}
                {chosenFood.image ? (
                  <Card.Image
                    src={`${process.env.NEXT_PUBLIC_SPOONACULAR_IMAGE}/${chosenFood.image}`}
                    alt={chosenFood.image}
                  />
                ) : null}
              </Text>
            </Modal.Header>
            <Modal.Body css={{ display: "flex", width: "fit" }}>
              <Text>
                Amount:
                <input
                  className="text-end ml-2 border rounded"
                  type="number"
                  name="amount"
                  value={itemsQuantity}
                  min="1"
                  max="100"
                  onChange={(e) =>
                    setItemsQuantity((prev) => {
                      prev = e.target.value;
                      return prev;
                    })
                  }
                />
              </Text>
              {chosenFood.possibleUnits?.length ? (
                <Text>
                  Possible Measurements:
                  <select
                    name="measurement"
                    className="mx-2 text-center border rounded cursor-pointer"
                  >
                    <option value="">Select one</option>
                    {chosenFood.possibleUnits.map((unit) => {
                      return (
                        <option value={unit} key={unit}>
                          {unit}
                        </option>
                      );
                    })}
                  </select>
                </Text>
              ) : (
                <Text>
                  Measurements:
                  <select
                    name="measurement"
                    className="mx-2 text-center border rounded cursor-pointer"
                  >
                    <option value="">Select one</option>
                    <option value="Piece">Piece</option>
                    <option value="Slice">Slice</option>
                    <option value="Whole">Whole</option>
                    <option value="Serving">Serving</option>
                    <option value="Pinch">Pinch</option>
                    <option value="Ounce">Ounce</option>
                    <option value="Pound">Pound</option>
                    <option value="Gram">Gram</option>
                    <option value="Kilogram">Kilogram</option>
                    <option value="Cup">Cup</option>
                    <option value="Pint">Pint</option>
                    <option value="Quart">Quart</option>
                    <option value="Gallon">Gallon</option>
                    <option value="Teaspoon">Teaspoon</option>
                    <option value="Tablespoon">Tablespoon</option>
                    <option value="Fluid ounce">Fluid ounce</option>
                    <option value="Milliliter">Milliliter</option>
                    <option value="Liter">Liter</option>
                  </select>
                  or
                  <input
                    className="text-end ml-2 border rounded px-1"
                    size="10"
                    type="text"
                    name="unit"
                    placeholder="input unit"
                  />
                </Text>
              )}
            </Modal.Body>
            <Modal.Footer css={{ justifyContent: "space-between" }}>
              <Button
                auto
                flat
                color="error"
                onPress={() => {
                  setFoodItemModal(false);
                  setEditMode(false);
                }}
              >
                Close
              </Button>
              {editMode ? (
                <Button
                  auto
                  flat
                  color="error"
                  onPress={() => removeItem(chosenFood)}
                >
                  Remove
                </Button>
              ) : null}
              <Button auto>
                <input type="submit" value="Add" className="cursor-pointer" />
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Layout>
    </>
  );
};

export default AddMealData;
