import { Grid, Card, Text } from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { Line } from "@components/Icons";

const FoodDisplayCard = ({ item, clicked }) => {
  const nutritionalValues = item.nutrition?.nutrients;
  if (nutritionalValues !== undefined) {
    nutritionalValues.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      return nameA < nameB ? -1 : 1;
    });
  }
  const shownNutrients = nutritionalValues?.filter(
    (item) =>
      item.name === "Sugar" ||
      item.name === "Calories" ||
      item.name === "Carbohydrates" ||
      item.name === "Cholesterol" ||
      item.name === "Fat" ||
      item.name === "Fiber" ||
      item.name === "Protein" ||
      item.name === "Saturated Fat" ||
      item.name === "Sodium"
  );

  return (
    <div key={item.id}>
      <Card
        isPressable
        isHoverable
        css={{
          width: "fit",
          height: "auto",
          marginBottom: "4px",
        }}
        name={item.id}
        onClick={clicked}
      >
        <Card.Header css={{ justifyContent: "space-between" }}>
          <Text css={{ fontWeight: "bold" }}>{item.name}</Text>
          {item.image ? (
            <Card.Image
              src={`${process.env.NEXT_PUBLIC_SPOONACULAR_IMAGE}/${item.image}`}
              alt={item.image}
              width="50px"
            />
          ) : null}
          <Text>
            <b>Amount:</b> {item.amount} {item.unit}
          </Text>
        </Card.Header>
        <Card.Body>
          <Grid.Container>
            {shownNutrients.map((nutrient) => {
              let displayName = "";

              switch (nutrient.name) {
                case "Calories":
                  displayName = "kcal";
                  break;
                case "Saturated Fat":
                  displayName = "Sat. Fat";
                  break;
                case "Carbohydrates":
                  displayName = "Carb";
                  break;
                default:
                  displayName = nutrient.name;
              }
              return (
                <Grid key={nutrient.id} css={{ padding: "0 16px 4px 0" }}>
                  <b>{displayName}:</b> {nutrient.amount}
                  {nutrient.unit}
                </Grid>
              );
            })}
          </Grid.Container>
        </Card.Body>
      </Card>
    </div>
  );
};

const SearchedFoodCards = ({ item, clicked }) => (
  <Card
    isPressable
    isHoverable
    css={{ maxWidth: "200px", width: "fit", height: "auto" }}
    name={item.id}
    onClick={clicked}
  >
    <Card.Header css={{ justifyContent: "center" }}>
      <Text css={{ fontWeight: "bold" }}>{item.name}</Text>
    </Card.Header>
    <Card.Body>
      {item.image ? (
        <Card.Image
          src={`${process.env.NEXT_PUBLIC_SPOONACULAR_IMAGE}/${item.image}`}
          alt={item.image}
        />
      ) : null}
    </Card.Body>
  </Card>
);

const NutritionDisplayCard = ({ data }) => {
  const minerals = [
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
  ];

  const dateConverted = parseISO(data.date);
  return (
    <div className="sm:py-8">
      <Card
        css={{
          width: 280,
          height: "auto",
          margin: 4,
        }}
      >
        <Card.Header css={{ display: "flex", flexDirection: "column" }}>
          <h2 className="text-h2 lg:text-h3">
            {format(dateConverted, "MM / dd / yyyy")}
          </h2>
        </Card.Header>
        <Card.Body css={{ border: "solid", borderWidth: 1 }}>
          <h2 className="md:text-3xl">Nutrition Facts</h2>
          <Line length="short" />
          <Line length="short" />
          <h6 className="m-0">Total Daily Nutritioinal Value</h6>
          {/* //!Calories */}
          <h2 className="flex justify-between md:text-2xl">
            <span>Calories </span>
            <span>{data.totalNutrientCount.Calories.quantity.toFixed()}</span>
          </h2>
          <Line length="short" />

          {/* //! Fats */}
          <div className="flex justify-between md:text-sm">
            <span>
              <b className="font-bold">Total Fat </b>&nbsp;
              {data.totalNutrientCount.Fat.quantity.toFixed()}
              {data.totalNutrientCount.Fat.unit}
            </span>
            <span>
              {data.totalNutrientCount.Fat.perOfDailyNeeds.toFixed()}
              &#37;
            </span>
          </div>
          <Line length="medium" />
          <div className="flex justify-between pl-8 md:text-sm">
            <span>
              Saturated Fat&nbsp;
              {data.totalNutrientCount["Saturated Fat"].quantity.toFixed()}
              {data.totalNutrientCount["Saturated Fat"].unit}
            </span>
            <span>
              {data.totalNutrientCount[
                "Saturated Fat"
              ].perOfDailyNeeds.toFixed()}
              &#37;
            </span>
          </div>
          <Line length="medium" />
          <div className="pl-8 md:text-sm">
            Mono Unsaturated Fat&nbsp;
            {data.totalNutrientCount["Mono Unsaturated Fat"].quantity.toFixed()}
            {data.totalNutrientCount["Mono Unsaturated Fat"].unit}
          </div>
          <Line length="medium" />
          <div className="pl-8 md:text-sm">
            Poly Unsaturated Fat&nbsp;
            {data.totalNutrientCount["Poly Unsaturated Fat"].quantity.toFixed()}
            {data.totalNutrientCount["Poly Unsaturated Fat"].unit}
          </div>
          <Line length="medium" />
          <div className="pl-8 md:text-sm">
            Trans Fat&nbsp;
            {Number(
              data.totalNutrientCount.Fat.quantity -
                (data.totalNutrientCount["Saturated Fat"].quantity +
                  data.totalNutrientCount["Mono Unsaturated Fat"].quantity +
                  data.totalNutrientCount["Poly Unsaturated Fat"].quantity)
            ).toFixed(2)}
            {data.totalNutrientCount.Fat.unit}
          </div>
          <Line length="long" />

          {/* //!Cholesterol */}
          <div className="flex justify-between md:text-sm">
            <span>
              <b className="font-bold">Cholesterol </b>&nbsp;
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
          <div className="flex justify-between md:text-sm">
            <span>
              <b className="font-bold">Sodium </b>&nbsp;
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
          <div className="flex justify-between md:text-sm">
            <span>
              <b className="font-bold">Total Carbohydrate </b>&nbsp;
              {data.totalNutrientCount.Carbohydrates.quantity.toFixed()}
              {data.totalNutrientCount.Carbohydrates.unit}
            </span>
            <span>
              {data.totalNutrientCount.Carbohydrates.perOfDailyNeeds.toFixed()}
              &#37;
            </span>
          </div>
          <Line length="medium" />
          <div className="flex justify-between pl-8 md:text-sm">
            <span>
              Dietary Fiber&nbsp;
              {data.totalNutrientCount.Fiber.quantity.toFixed()}
              {data.totalNutrientCount.Fiber.unit}
            </span>
            <span>
              {data.totalNutrientCount.Fiber.perOfDailyNeeds.toFixed()}
              &#37;
            </span>
          </div>
          <Line length="medium" />
          <div className="pl-8 md:text-sm">
            Total Sugars&nbsp;
            {data.totalNutrientCount.Sugar.quantity.toFixed()}
            {data.totalNutrientCount.Sugar.unit}
          </div>
          <Line length="long" />

          {/* //!Protein */}
          <div className="flex justify-between md:text-sm">
            <span>
              <b className="font-bold">Protein </b>&nbsp;
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
                <div className="flex justify-between md:text-sm">
                  <span>
                    {mineral}&nbsp;
                    {data.totalNutrientCount[mineral].quantity.toFixed() <= 1
                      ? data.totalNutrientCount[mineral].quantity.toFixed(2)
                      : data.totalNutrientCount[mineral].quantity.toFixed()}
                    {data.totalNutrientCount[mineral].unit}
                  </span>
                  <span>
                    {data.totalNutrientCount[mineral].perOfDailyNeeds.toFixed()}
                    &#37;
                  </span>
                </div>
                {minerals.length - 1 === index ? null : <Line length="long" />}
              </div>
            );
          })}
        </Card.Body>
        <Card.Footer>
          <Text>
            <b>All Recorded Foods Eaten: </b>&nbsp;
            {data.foodsEaten.map((food, index) => {
              if (index === data.foodsEaten.length - 1) {
                return <span key={index + food}>and {food}.</span>;
              }
              return <span key={index + food}>{food},&nbsp;</span>;
            })}
          </Text>
        </Card.Footer>
      </Card>
    </div>
  );
};

export { FoodDisplayCard, SearchedFoodCards, NutritionDisplayCard };
