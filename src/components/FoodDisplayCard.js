import { Grid, Card, Text } from "@nextui-org/react";

const FoodDisplayCard = ({ item, clicked }) => {
  // const {
  //   label,
  //   foodContentsLabel,
  //   image,
  //   brand,
  //   category,
  //   categoryLabel,
  //   nutrients,
  // } = item.food;

  const nutritionalValues = item.nutrition?.nutrients;
  // console.log("item ~~ ", item);
  if (nutritionalValues !== undefined) {
    nutritionalValues.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      return nameA < nameB ? -1 : 1;
    });

    // console.log("Nutrient values SORTED ~~ ", nutritionalValues);
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
      {/* Chosen food to save */}
      {nutritionalValues ? (
        <Card
          isPressable
          isHoverable
          css={{ width: "fit", height: "auto" }}
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
            <Grid.Container gap={1}>
              {shownNutrients.map((nutrient) => (
                <Grid key={nutrient.id} css={{ padding: "0 24px 4px 0" }}>
                  <b>{nutrient.name}:</b> {nutrient.amount}
                  {nutrient.unit}
                  {/* {nutrient.percentOfDailyNeeds} */}
                </Grid>
              ))}
            </Grid.Container>
          </Card.Body>
        </Card>
      ) : (
        <Card
          isPressable
          isHoverable
          css={{ width: "200px", height: "auto" }}
          name={item.id}
          onClick={clicked}
        >
          {/* Cards display for ingredients search */}
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
      )}
    </div>
  );
};

export default FoodDisplayCard;
