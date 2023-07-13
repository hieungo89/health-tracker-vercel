import { Table } from "@nextui-org/react";

const FoodCategoryInfo = () => (
  <div>
    <Table aria-label="Category Description" sticked lined>
      <Table.Header>
        <Table.Column>Category</Table.Column>
        <Table.Column>Description</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="1">
          <Table.Cell>generic-foods</Table.Cell>
          <Table.Cell css={{ whiteSpace: "normal" }}>
            Any general non-branded food i.e. searching “apple” with this
            category returns information on generic “apple” and its varieties.
          </Table.Cell>
        </Table.Row>
        <Table.Row key="2">
          <Table.Cell>packaged-foods</Table.Cell>
          <Table.Cell css={{ whiteSpace: "normal" }}>
            Any food that has been produced as a Consumer Packaged Good
            &#40;CPG,&#41; i.e. one of the results when searching “apple”
            returns an “Apple” packaged and branded from “Apple Country”
          </Table.Cell>
        </Table.Row>
        <Table.Row key="3">
          <Table.Cell>generic-meals</Table.Cell>
          <Table.Cell css={{ whiteSpace: "normal" }}>
            Any generic &#40;non-branded&#41; food that is composed of other
            basic foods, these will usually come with a list of ingredients.
            i.e. searching “apple” returns “Apple-Crisp Baked Apples”
          </Table.Cell>
        </Table.Row>
        <Table.Row key="4">
          <Table.Cell>fast-foods</Table.Cell>
          <Table.Cell css={{ whiteSpace: "normal" }}>
            Any food that is served by a chain-restaurant. i.e. searching
            “apple” returns “Apples” which are served by “bareburger”
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
);

export default FoodCategoryInfo;
