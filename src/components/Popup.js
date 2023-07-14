import { Popover, Card, Text } from "@nextui-org/react";
import { QuestionMark } from "./Icons";

const Popup = ({ text, placement, card }) => {
  return (
    <Popover placement={placement}>
      <Popover.Trigger>
        <Text>
          <QuestionMark className="mx-2 text-red-600" />
        </Text>
      </Popover.Trigger>
      <Popover.Content>
        {card ? (
          <Card css={{ mw: "400px", padding: "8px" }}>{text}</Card>
        ) : (
          <>{text}</>
        )}
      </Popover.Content>
    </Popover>
  );
};

export default Popup;
