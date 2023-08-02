import { Card, Text } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Line } from "../../components/Icons";

const MealData = () => {
  const { data: session, status } = useSession();
  const [mealData, setMealData] = useState([]);
  const [sortedMealData, setSortedMealData] = useState([]);
  const [minerals] = useState([
    "Calcium",
    "Choline",
    "Copper",
    "Fluoride",
    "Folate",
    "Folic Acid",
    "Iron",
    "Lycopene",
    "Magnesium",
    "Manganese",
    "Phosphorus",
    "Potassium",
    "Selenium",
    "Vitamin A",
    "Vitamin B1",
    "Vitamin B2",
    "Vitamin B3",
    "Vitamin B5",
    "Vitamin B6",
    "Vitamin B12",
    "Vitamin C",
    "Vitamin D",
    "Vitamin E",
    "Vitamin K",
    "Zinc",
  ]);

  const router = useRouter();

  const getMealData = async () => {
    const { data } = await axios.get(
      `/api/mealData?email=${session?.user.email}`
    );
    await setMealData(data);
  };

  const sortDataByDate = () => {
    const dates = mealData.map((meal) => {
      return meal.date;
    });

    const sortedData = [];

    for (let i = 0; i < dates.length; i++) {
      if (dates[i] !== dates[i - 1]) {
        sortedData.push(mealData[i]);
        sortedData[sortedData.length - 1].mealType = [mealData[i].mealType];
      } else {
        sortedData[sortedData.length - 1].foodsEaten = [
          ...sortedData[sortedData.length - 1].foodsEaten,
          ...mealData[i].foodsEaten,
        ];
        sortedData[sortedData.length - 1].foodsId = [
          ...sortedData[sortedData.length - 1].foodsId,
          ...mealData[i].foodsId,
        ];
        sortedData[sortedData.length - 1].mealType = [
          ...sortedData[sortedData.length - 1].mealType,
          mealData[i].mealType,
        ];

        const allNutrients =
          sortedData[sortedData.length - 1].totalNutrientCount;

        for (let nutrient in allNutrients) {
          sortedData[sortedData.length - 1].totalNutrientCount[
            nutrient
          ].quantity += mealData[i].totalNutrientCount[nutrient].quantity;
          sortedData[sortedData.length - 1].totalNutrientCount[
            nutrient
          ].perOfDailyNeeds +=
            mealData[i].totalNutrientCount[nutrient].perOfDailyNeeds;
        }
      }
    }

    setSortedMealData(sortedData);
  };

  useEffect(() => {
    if (!session) return;
    getMealData();
  }, [session]);

  useEffect(() => {
    if (!mealData) return;
    sortDataByDate();
  }, [mealData]);

  if (status === "loading") return <Layout>...Loading</Layout>;
  if (status === "unauthenticated") router.push("/");

  return (
    <div className="py-8">
      {sortedMealData.length ? (
        <div className="flex justify-evenly">
          {sortedMealData.map((data, index) => {
            return (
              <Card
                key={index + data.date}
                css={{ width: 360, height: "auto" }}
              >
                <Card.Header css={{ display: "flex", flexDirection: "column" }}>
                  <h4>{data.date}</h4>
                </Card.Header>
                <Card.Body css={{ border: "solid", borderWidth: 1 }}>
                  <h1>Nutrition Facts</h1>
                  <Line length="short" />
                  <Line length="short" />
                  <h6 className="m-0">Total Daily Nutritioinal Value</h6>
                  {/* //!Calories */}
                  <h2 className="flex justify-between">
                    <span>Calories </span>
                    <span>
                      {data.totalNutrientCount.Calories.quantity.toFixed()}
                    </span>
                  </h2>
                  <Line length="short" />

                  {/* //! Fats */}
                  <div className="flex justify-between">
                    <span>
                      <b className="font-bold">Total Fat </b>{" "}
                      {data.totalNutrientCount.Fat.quantity.toFixed()}
                      {data.totalNutrientCount.Fat.unit}
                    </span>
                    <span>
                      {data.totalNutrientCount.Fat.perOfDailyNeeds.toFixed()}
                      &#37;
                    </span>
                  </div>
                  <Line length="medium" />
                  <div className="flex justify-between pl-8">
                    <span>
                      Saturated Fat{" "}
                      {data.totalNutrientCount[
                        "Saturated Fat"
                      ].quantity.toFixed()}
                      {data.totalNutrientCount["Saturated Fat"].unit}
                    </span>
                    <span>
                      {data.totalNutrientCount["Saturated Fat"].perOfDailyNeeds}
                      &#37;
                    </span>
                  </div>
                  <Line length="medium" />
                  <div className="pl-8">
                    Mono Unsaturated Fat{" "}
                    {data.totalNutrientCount[
                      "Mono Unsaturated Fat"
                    ].quantity.toFixed()}
                    {data.totalNutrientCount["Mono Unsaturated Fat"].unit}
                  </div>
                  <Line length="medium" />
                  <div className="pl-8">
                    Poly Unsaturated Fat{" "}
                    {data.totalNutrientCount[
                      "Poly Unsaturated Fat"
                    ].quantity.toFixed()}
                    {data.totalNutrientCount["Poly Unsaturated Fat"].unit}
                  </div>
                  <Line length="medium" />
                  <div className="pl-8">
                    Trans Fat{" "}
                    {Number(
                      data.totalNutrientCount.Fat.quantity -
                        (data.totalNutrientCount["Saturated Fat"].quantity +
                          data.totalNutrientCount["Mono Unsaturated Fat"]
                            .quantity +
                          data.totalNutrientCount["Poly Unsaturated Fat"]
                            .quantity)
                    ).toFixed(2)}
                    {data.totalNutrientCount.Fat.unit}
                  </div>
                  <Line length="long" />

                  {/* //!Cholesterol */}
                  <div className="flex justify-between">
                    <span>
                      <b className="font-bold">Cholesterol </b>{" "}
                      {data.totalNutrientCount.Cholesterol.quantity.toFixed()}
                      {data.totalNutrientCount.Cholesterol.unit}
                    </span>
                    <span>
                      {data.totalNutrientCount.Cholesterol.perOfDailyNeeds.toFixed()}
                      &#37;
                    </span>
                  </div>
                  <Line length="long" />
                  {/* //! Sodium */}
                  <div className="flex justify-between">
                    <span>
                      <b className="font-bold">Sodium </b>{" "}
                      {data.totalNutrientCount.Sodium.quantity.toFixed()}
                      {data.totalNutrientCount.Sodium.unit}
                    </span>
                    <span>
                      {data.totalNutrientCount.Sodium.perOfDailyNeeds.toFixed()}
                      &#37;
                    </span>
                  </div>
                  <Line length="long" />

                  {/* //! Carbohydrates, Fiber, Sugar */}
                  <div className="flex justify-between">
                    <span>
                      <b className="font-bold">Total Carbohydrate </b>{" "}
                      {data.totalNutrientCount.Carbohydrates.quantity.toFixed()}
                      {data.totalNutrientCount.Carbohydrates.unit}
                    </span>
                    <span>
                      {data.totalNutrientCount.Carbohydrates.perOfDailyNeeds.toFixed()}
                      &#37;
                    </span>
                  </div>
                  <Line length="medium" />
                  <div className="flex justify-between pl-8">
                    <span>
                      Dietary Fiber{" "}
                      {data.totalNutrientCount.Fiber.quantity.toFixed()}
                      {data.totalNutrientCount.Fiber.unit}
                    </span>
                    <span>
                      {data.totalNutrientCount.Fiber.perOfDailyNeeds.toFixed()}
                      &#37;
                    </span>
                  </div>
                  <Line length="medium" />
                  <div className="pl-8">
                    Total Sugars{" "}
                    {data.totalNutrientCount.Sugar.quantity.toFixed()}
                    {data.totalNutrientCount.Sugar.unit}
                  </div>
                  <Line length="long" />

                  {/* //!Protein */}
                  <div className="flex justify-between">
                    <span>
                      <b className="font-bold">Protein </b>{" "}
                      {data.totalNutrientCount.Protein.quantity.toFixed()}
                      {data.totalNutrientCount.Protein.unit}
                    </span>
                    <span>
                      {data.totalNutrientCount.Protein.perOfDailyNeeds.toFixed()}
                      &#37;
                    </span>
                  </div>
                  <Line className="-mt-[85px]" length="short" />

                  {/* //!All Other minerals & vitamins */}
                  {minerals.map((mineral, index) => {
                    if (data.totalNutrientCount[mineral].quantity === 0) return;

                    return (
                      <div key={mineral}>
                        <div className="flex justify-between ">
                          <span>
                            {mineral}{" "}
                            {data.totalNutrientCount[
                              mineral
                            ].quantity.toFixed() <= 1
                              ? data.totalNutrientCount[
                                  mineral
                                ].quantity.toFixed(2)
                              : data.totalNutrientCount[
                                  mineral
                                ].quantity.toFixed()}
                            {data.totalNutrientCount[mineral].unit}
                          </span>
                          <span>
                            {data.totalNutrientCount[
                              mineral
                            ].perOfDailyNeeds.toFixed()}
                            &#37;
                          </span>
                        </div>
                        {minerals.length - 1 === index ? null : (
                          <Line length="long" />
                        )}
                      </div>
                    );
                  })}
                </Card.Body>
                <Card.Footer>
                  <Text>
                    <b>All Recorded Foods Eaten: </b>{" "}
                    {data.foodsEaten.map((food, index) => {
                      if (index === data.foodsEaten.length - 1) {
                        return <span key={index + food}>and {food}.</span>;
                      }
                      return <span key={index + food}>{food},&nbsp;</span>;
                    })}
                  </Text>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MealData;
