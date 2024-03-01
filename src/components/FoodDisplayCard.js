import { Grid, Card, Text } from "@nextui-org/react";

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

export { FoodDisplayCard, SearchedFoodCards };
