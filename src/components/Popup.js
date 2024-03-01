import { QuestionMark } from "@components/Icons";
import { Card, Popover, Text } from "@nextui-org/react";

const Popup = ({ text, placement, card }) => {
  return (
    <Popover placement={placement}>
      <Popover.Trigger>
        <Text>
          <QuestionMark className="mx-1 text-red-600" />
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
