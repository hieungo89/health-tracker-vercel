import { Card } from "@nextui-org/react";

const DietaryGoalsCard = ({ goals }) => (
  <Card>
    <Card.Header
      css={{
        backgroundColor: "#007EA7",
      }}
    >
      <span className="text-2xl font-semibold text-light lg:text-xl md:text-base sm:text-sm">
        Your Dietary Goals:
      </span>
    </Card.Header>
    <Card.Divider />
    <Card.Body>
      <ol>
        {goals.map((goal) => {
          return (
            <li key={goal} className="md:text-sm sm:text-xs">
              {goal}
            </li>
          );
        })}
      </ol>
    </Card.Body>
  </Card>
);

const RestrictionsCard = ({ name, description }) => (
  <Card>
    <Card.Header
      css={{
        backgroundColor: "#007EA7",
      }}
    >
      <span className="text-2xl font-semibold text-light pr-4 lg:text-xl md:text-base sm:text-sm">
        {name}:
      </span>
    </Card.Header>
    <Card.Divider />
    <Card.Body>
      <span className="md:text-sm sm:text-xs sm:py-1">
        {description ?? "none"}
      </span>
    </Card.Body>
  </Card>
);

export { DietaryGoalsCard, RestrictionsCard };
