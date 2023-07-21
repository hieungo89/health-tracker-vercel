import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { Grid, Card, Modal, Button, Text } from "@nextui-org/react";
import FoodCategoryInfo from "../../components/FoodCategoryInfo";
import { useState, useEffect } from "react";
import FoodDisplayCard from "../../components/FoodDisplayCard";
import Popup from "../../components/Popup";

const AddMealData = () => {
  const [foodItems, setFoodItems] = useState({});
  const [chosenItems, setChosenItems] = useState([]);
  const [foodItemModal, setFoodItemModal] = useState(false);
  const [chosenFood, setChosenFood] = useState({});
  const [searchFood, setSearchFood] = useState({});
  const [itemsQuantity, setItemsQuantity] = useState(1);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDataInput = async (e) => {
    e.preventDefault();

    const foodsEaten = chosenItems.map((item) => {
      return item.food.label;
    });
    const foodsId = chosenItems.map((item) => {
      return item.food.foodId;
    });
    const totalNutrientCount = {
      calorie: 0,
      carbohydrate: 0,
      fat: 0,
      fiber: 0,
      protein: 0,
    };

    await chosenItems.forEach((item) => {
      let quantity = Object.prototype.hasOwnProperty.call(
        itemsQuantity,
        item.food.foodId
      )
        ? itemsQuantity[item.food.foodId]
        : null;
      totalNutrientCount.calorie += quantity * item.food.nutrients.ENERC_KCAL;
      totalNutrientCount.carbohydrate += quantity * item.food.nutrients.CHOCDF;
      totalNutrientCount.fat += quantity * item.food.nutrients.FAT;
      totalNutrientCount.fiber += quantity * item.food.nutrients.FIBTG;
      totalNutrientCount.protein += quantity * item.food.nutrients.PROCNT;
    });

    const data = {
      email: session.user.email,
      date: e.target.date.value,
      mealType: e.target.mealType.value,
      foodsEaten: foodsEaten,
      foodsId: foodsId,
      totalNutrientCount: totalNutrientCount,
    };

    if (!data.foodsEaten.length) {
      alert(`\nPlease add food that you've eaten before you submit.`);
    }

    if (data.mealType && data.date && data.foodsEaten.length) {
      await axios.post("/api/mealData", data);
      router.push("/profile");
    }
  };

  // TODO: Fix This to use spoonacular
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

  const handleSearchSpecificFood = (e) => {
    e.preventDefault();
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(
      "ingredient ~ ",
      e.target.amount.value,
      e.target.measurement.value,
      e.target.unit.value,
      chosenFood.name
    );
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

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
        setChosenItems([...chosenItems, result.data]);
        setFoodItemModal(false);
      });
  };

  useEffect(() => {
    console.log("food Items ~~ ", foodItems);
    console.log("Chosen Items ~~ ", chosenItems);
    console.log("food Items Modal ~~ ", foodItemModal);
    console.log("Chosen food ~~ ", chosenFood);
    console.log("Search Food ~~ ", searchFood);
    console.log("Quantity ~~ ", itemsQuantity);
  }, [chosenItems, searchFood, chosenFood]);

  // const handleSearchIngredients = async (e) => {
  //   e.preventDefault();

  //   const categoryLabel = [];
  //   const catData = e.target.category.selectedOptions;
  //   for (let i = 0; i < catData.length; i++) {
  //     categoryLabel.push(catData[i].value);
  //   }
  //   // const healthLabel = [];
  //   // const healthData = e.target.healthLabel.selectedOptions;
  //   // for (let i = 0; i < healthData.length; i++) {
  //   //   healthLabel.push(healthData[i].value);
  //   // }

  //   const data = {
  //     amount: e.target.amount.value,
  //     // measurement: e.target.measurement.value,
  //     ingredients: e.target.ingredients.value,
  //     // healthLabel: healthLabel,
  //     category: categoryLabel,
  //     brand: e.target.brand.value,
  //   };

  //   if (!data.ingredients && !data.brand) {
  //     alert(`\nPlease provide a food ingredient or a brand`);
  //   }

  //   if (data.ingredients || data.brand) {
  //     await axios
  //       .get(
  //         `https://api.edamam.com/api/food-database/v2/parser?app_id=c68c9a1d&app_key=4ce474a24202f7f68e0308435ed057c4
  //       ${
  //         data.ingredients
  //           ? `&ingr=${data.amount} serving ${data.ingredients}`
  //           : ""
  //       }
  //       ${data.brand ? "&brand=" + data.brand : ""}
  //       ${data.category.length ? "&category=" + data.category : ""}`
  //       )
  //       .then((result) => {
  //         setFoodItems([...result.data.parsed, ...result.data.hints]);
  //       });
  //   }
  // };

  const removeItem = (item) => {
    const pickedFoodItems = chosenItems.filter(
      (singleItem) => singleItem.id !== item.id
    );
    setChosenItems(pickedFoodItems);
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

      <Layout className="flex">
        <div className="flex flex-col">
          {/* Instructions */}
          <div className="flex flex-col">
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
            className="flex max-w-7xl mt-12"
          >
            <div className="flex justify-start items-center">
              {/* Ingredients */}
              <label htmlFor="ingredients" className="flex">
                Food/Ingredients
                <Popup
                  text="NOT REQUIRED if 'brand' is specified."
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
              className="text-lg border-2 rounded-xl py-2 px-4 ml-8 hover:bg-green-400 hover:border-black"
              type="submit"
              value="Search"
            />
          </form>

          {/* Input Data to DB */}
          <form onSubmit={(e) => handleDataInput(e)} className="flex flex-col">
            <div className="pt-8">
              <label htmlFor="selectDate">Select Date: </label>
              <input
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
                <b className="text-red-600">*Warning:</b> choosing the same Meal
                Type for the same date will override your previous data.
              </label>
            </div>

            <input
              className="text-2xl border-2 p-2 my-4 rounded hover:bg-green-400 hover:border-black"
              type="submit"
              value="ADD MEAL"
            />

            {/* My chosen food items */}
            {chosenItems.length ? (
              <>
                <h3 className="self-center underline">
                  Click on the card to remove from your list.
                </h3>
                <Grid.Container
                  gap={2}
                  justify="flex-start"
                  name="chosenFoodItems"
                >
                  {chosenItems.map((item) => (
                    <Grid key={item.id}>
                      <FoodDisplayCard
                        item={item}
                        clicked={() => removeItem(item)}
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
                of the FREE API, there is a limited amount of API usage per day.
                Once the limit is reached, this will NOT display any results.
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

        {/* Modal to add Food eaten to Meals */}
        <Modal
          aria-labelledby="get-ingredient-info-modal"
          open={foodItemModal}
          onClose={() => setFoodItemModal(false)}
          css={{ cursor: "default" }}
        >
          <form onSubmit={(e) => handleSearchSpecificFood(e)}>
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
            </Modal.Body>
            <Modal.Footer css={{ justifyContent: "space-between" }}>
              <Button
                auto
                flat
                color="error"
                onPress={() => setFoodItemModal(false)}
              >
                Close
              </Button>
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
