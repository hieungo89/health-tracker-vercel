import {
  CancelButton,
  FormSubmit,
  SubmitButton,
  LinkButton,
} from "@components/Button";
import {
  FoodDisplayCard,
  SearchedFoodCards,
} from "@components/FoodDisplayCard";
import Layout from "@components/Layout";
import { Popup, PopupErrorMessage } from "@components/Popup";
import { Card, Grid, Modal, Text } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddMealData = () => {
  const [foodItems, setFoodItems] = useState({}); // API results
  const [foodItemModal, setFoodItemModal] = useState(false);
  const [chosenFood, setChosenFood] = useState({});
  const [itemsQuantity, setItemsQuantity] = useState(1);
  const [measurement, setMeasurement] = useState("");
  const [chosenItems, setChosenItems] = useState([]); // Foods to be added to DB
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  //! Search API for specific food ingredients & setFoodItems
  const handleSearchIngredients = async (e) => {
    e.preventDefault();
    const data = { ingredients: e.target.ingredients.value };

    axios
      .get(
        `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_KEY}&query=${data.ingredients}&number=100`
      )
      .then((result) => setFoodItems(result.data))
      .catch((err) => console.log("Error searching ingredient in API : ", err));
  };

  useEffect(() => {
    console.log("foodItems ", foodItems);
  }, [foodItems]);

  //! Add ingredient to the list
  const handleAddIngredient = (e) => {
    e.preventDefault();
    //! Edit Mode
    if (chosenFood.unit) removeItem(chosenFood);
    //! Regular Adding
    const food = chosenFood.id;
    const amount = e.target.amount.value;
    const measurement = e.target.unit?.value || e.target.measurement?.value;

    if (!measurement || measurement === "other") {
      return alert("Please select or add a measurement");
    }

    axios
      .get(
        `https://api.spoonacular.com/food/ingredients/${food}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_KEY}&amount=${amount}&unit=${measurement}`
      )
      .then((result) => {
        setChosenItems((prev) => [...prev, result.data]);
        setFoodItemModal(false);
        setEditMode(false);
        console.log("result ", result);
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

    console.log("nutrition Data ~~ ", totalNutrientData);

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

  return (
    <>
      <Head>
        <title>Health.me - Meals</title>
        <meta
          name="Record meals data"
          content="User can record their meals data for each type of food ingredient that they consumed."
        />
      </Head>

      <Layout className="pt-2 pb-2">
        <h1 className="text-center underline font-trebuchet text-h1 md:text-h2">
          Meal Input
        </h1>
        <div className="flex justify-center md:flex-col">
          <div className="flex flex-col bg-light border rounded p-2 w-[30vw] lg:w-[40vw] md:h-auto md:w-auto">
            <div className="flex justify-between">
              <h4 className="md:text-lg">Instructions:</h4>
            </div>
            <ol>
              <li className="md:text-sm">
                Search and add foods that you&apos;ve eaten
              </li>
              <li className="md:text-sm">Select Date</li>
              <li className="sm:text-sm">Choose a meal type</li>
              <li className="sm:text-sm">
                Click <b className="text-red-600">&quot;ADD MEAL&quot;</b> to
                save your data.
              </li>
            </ol>

            {/* //! Input Data to DB */}
            <form
              onSubmit={(e) => handleMealInput(e)}
              className="flex flex-col"
            >
              <div className="pt-8 md:text-sm">
                <label htmlFor="selectDate">Select Date: </label>
                <input
                  className="p-1 mx-2 bg-grey-70"
                  type="date"
                  name="date"
                  id="selectDate"
                  max={new Date().toISOString().slice(0, 10)}
                  required
                />
              </div>
              {/* Meal Type */}
              <div className="flex flex-col py-4 md:text-sm">
                <div className="flex">
                  <label htmlFor="mealType" className="flex items-center">
                    Meal Type
                    <Popup
                      text="Choose OTHER if you have want to add additional meals data."
                      placement="top"
                      card={true}
                    />
                    :
                  </label>
                  <select id="mealType" className="ml-2 bg-grey-70" required>
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

              <div className="flex justify-between">
                <LinkButton text="Return" href="/profile" />
                <SubmitButton text="Add Meal" />
              </div>

              {/* //! My chosen food items */}
              {chosenItems.length ? (
                <>
                  <h4 className="text-center underline">
                    CLICK on the card to EDIT.
                  </h4>
                  <div className="flex flex-col items-center h-[50vh] overflow-scroll">
                    {chosenItems.map((item) => (
                      <FoodDisplayCard
                        key={item.id + item.amount + item.unit}
                        item={item}
                        clicked={() => editItem(item)}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </form>
          </div>

          {/* //! Right Side - Display Food Cards */}
          <div className="ml-4 border rounded bg-light w-[70vw] lg:w-[60vw] md:w-auto md:ml-0 md:mt-2">
            {/* Search Food */}
            <form
              onSubmit={(e) => handleSearchIngredients(e)}
              className="flex flex-col max-w-7xl p-2"
            >
              <p className="font-semibold pb-2 font-serif sm:text-sm">
                This search feature is specifically for searching food
                ingredients only. Specific foods will be added in the future.
              </p>
              <p className="md:pt-4 md:text-xl sm:text-base">
                <span className="text-red-600">*DISCLAIMER:</span> Due to usage
                of the FREE API, there is a limited amount of API usage per day.
                Once the limit is reached, this will NOT display any results.
              </p>
              <div className="flex justify-between xs:flex-col">
                {/* Ingredients */}
                <div className="flex w-fit items-center rounded xs:w-full">
                  <label
                    htmlFor="ingredients"
                    className="flex items-center md:text-sm"
                  >
                    <p>Food Lookup</p>
                    <Popup
                      text="Enter simple ingredient name to begin searching for food. Specific food dish will not show any results."
                      card={true}
                      placement="top"
                    />
                    <span className="self-center">:</span>
                  </label>
                  <input
                    className="text-center mx-2 bg-grey-70 md:mx-1 xs:ml-4 sm:text-sm xs:text-xs"
                    type="text"
                    name="ingredients"
                    id="ingredients"
                    placeholder="spaghetti"
                  />
                </div>
                <FormSubmit name="Search" />
              </div>
            </form>

            {foodItems.results && (
              <>
                {foodItems.results?.length && (
                  <div className="p-4 border rounded-lg">
                    <Grid.Container
                      gap={1}
                      justify="center"
                      css={{ maxHeight: "640px", overflow: "scroll" }}
                    >
                      {foodItems.results.map((item) => (
                        <Grid key={item.id}>
                          <SearchedFoodCards
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
                )}
              </>
            )}
          </div>
        </div>

        {/* //! Add/Edit Food eaten to Meals */}
        <Modal
          aria-labelledby="get-ingredient-info-modal"
          open={foodItemModal}
          onClose={() => {
            setFoodItemModal(false);
            setEditMode(false);
          }}
          css={{ cursor: "default" }}
        >
          <form onSubmit={(e) => handleAddIngredient(e)} id="addIngredients">
            <Modal.Header>
              <Text
                id="get-ingredient-info-modal"
                size={32}
                css={{ textAlign: "center" }}
              >
                {chosenFood.name}
                {chosenFood.image && (
                  <Card.Image
                    src={`${process.env.NEXT_PUBLIC_SPOONACULAR_IMAGE}/${chosenFood.image}`}
                    alt={chosenFood.image}
                  />
                )}
              </Text>
            </Modal.Header>
            <Modal.Body
              css={{
                display: "grid",
                justifyContent: "center",
                width: "fit",
                alignItems: "center",
              }}
            >
              <Text>
                <label htmlFor="amount">Amount:</label>
                <input
                  className="text-center ml-2 border rounded bg-grey-70"
                  type="number"
                  id="amount"
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
              {/* //! EDIT FOOD */}
              {chosenFood.possibleUnits?.length ? (
                <Text css={{ display: "flex" }}>
                  <label htmlFor="measurement" className="flex items-center">
                    Measurements
                    <Popup
                      text="Measurement not available in the Spoonacular database will not be shown here. Please select a different measurement."
                      placement="top"
                      card={true}
                    />
                    :
                  </label>
                  <select
                    id="measurement"
                    className="mx-2 text-center border rounded cursor-pointer bg-grey-70"
                    onChange={(e) => setMeasurement(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select one
                    </option>
                    {chosenFood.possibleUnits.map((unit) => {
                      console.log("possibleUnits ", unit, measurement);
                      return (
                        <option
                          value={unit}
                          key={unit}
                          selected={unit === measurement ? true : false}
                        >
                          {unit}
                        </option>
                      );
                    })}
                  </select>
                  {!chosenFood.possibleUnits.includes(chosenFood.unit) ? (
                    <PopupErrorMessage
                      text="Measurement not available in the Spoonacular database. Please select a different measurement."
                      placement="top"
                      card={true}
                    />
                  ) : null}
                </Text>
              ) : (
                <>
                  {/* //! ADD FOOD */}
                  <Text css={{ display: "flex" }}>
                    <label htmlFor="measurement" className="flex items-center">
                      Measurements
                      <Popup
                        text="Measurement might not match the Spoonacular database. Please look at the card again and verify the correct measurement afterward."
                        placement="top"
                        card={true}
                      />
                      :
                    </label>
                    <select
                      id="measurement"
                      className="mx-2 text-center border rounded cursor-pointer bg-grey-70"
                      onChange={(e) => setMeasurement(e.target.value)}
                    >
                      <option value="" hidden selected>
                        Select one
                      </option>
                      <MeasurementOptions
                        names={[
                          "pieces",
                          "slice",
                          "whole",
                          "serving",
                          "pinch",
                          "ounce",
                          "pound",
                          "gram",
                          "kilogram",
                          "cup",
                          "pint",
                          "quart",
                          "gallon",
                          "teaspoon",
                          "tablespoon",
                          "fluid ounce",
                          "milliliter",
                          "liter",
                          "other",
                        ]}
                      />
                    </select>
                  </Text>
                  {measurement === "other" ? (
                    <Text css={{ display: "flex" }}>
                      <label htmlFor="unit">Add Measurement:</label>
                      <input
                        className="ml-2 border rounded px-1 bg-grey-70"
                        size="10"
                        type="text"
                        id="unit"
                        name="unit"
                      />
                    </Text>
                  ) : null}
                </>
              )}
            </Modal.Body>
            <Modal.Footer css={{ justifyContent: "space-between" }}>
              <CancelButton
                handleClick={() => {
                  setFoodItemModal(false);
                  setEditMode(false);
                }}
                content="Cancel"
              />
              {editMode && (
                <CancelButton
                  handleClick={() => removeItem(chosenFood)}
                  className="hover:bg-destructive"
                  content="Remove"
                />
              )}
              <SubmitButton text="add" className="cursor-pointer" />
            </Modal.Footer>
          </form>
        </Modal>
      </Layout>
    </>
  );
};

const MeasurementOptions = ({ names }) => (
  <>
    {names?.map((name) => (
      <option key={name} value={name}>
        {name}
      </option>
    ))}
  </>
);

export default AddMealData;
