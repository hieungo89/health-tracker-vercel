import { Card, Text } from "@nextui-org/react";

const FoodDisplayCard = ({ item, clicked }) => {
  const {
    label,
    foodContentsLabel,
    image,
    brand,
    category,
    categoryLabel,
    nutrients,
  } = item.food;

  return (
    <div>
      <Card
        isPressable
        isHoverable
        css={{ width: "400px", height: "auto" }}
        name={label}
        onClick={clicked}
      >
        <Card.Header>
          <Text css={{ fontWeight: "bold" }}>{label}</Text>
        </Card.Header>
        <Card.Body>
          {image ? <Card.Image src={image} alt={label} width="50%" /> : null}
          <Text css={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Category:&nbsp;</b> {category}
            </span>
            <span>
              <b className="ml-2">Category Label:&nbsp;</b> {categoryLabel}
            </span>
          </Text>
          <Text>
            {brand ? (
              <span>
                <b>Brand:&nbsp;</b> {brand}
              </span>
            ) : (
              ""
            )}
          </Text>
          <Text css={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Calories: </b>
              {nutrients.ENERC_KCAL > 0 ? nutrients.ENERC_KCAL.toFixed(0) : 0}
              kcal
            </span>
            <span>
              <b>Carbohydrate: </b>
              {nutrients.CHOCDF > 0 ? nutrients.CHOCDF.toFixed(0) : 0}g
            </span>
          </Text>
          <Text css={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <b>Fat: </b>
              {nutrients.FAT > 0 ? nutrients.FAT.toFixed(0) : 0}g
            </span>
            <span>
              <b>Fiber: </b>
              {nutrients.FIBTG > 0 ? nutrients.FIBTG.toFixed(0) : 0}g
            </span>
            <span>
              <b>Protein: </b>
              {nutrients.PROCNT > 0 ? nutrients.PROCNT.toFixed(0) : 0}g
            </span>
          </Text>
        </Card.Body>
        <Card.Footer>
          {foodContentsLabel ? (
            <Text>
              <b className="text-lg">Ingredients: </b>
              {foodContentsLabel}
            </Text>
          ) : (
            <Text>
              <b className="text-lg">Ingredients: </b>
              &quot;N/A&quot;
            </Text>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default FoodDisplayCard;
