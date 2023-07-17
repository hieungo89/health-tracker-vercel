import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table } from "@nextui-org/react";
import Link from "next/link";

const MealData = () => {
  const { data: session, status } = useSession();
  const [mealData, setMealData] = useState([]);
  const router = useRouter();

  const getData = async () => {
    const { data } = await axios.get(
      `/api/mealData?email=${session?.user.email}`
    );
    setMealData(data);
  };

  useEffect(() => {
    if (!session) return;
    getData();
  }, [session]);

  useEffect(() => {
    console.log("meal Data ~~ ", mealData);
  }, [mealData]);

  if (status === "loading") {
    return <Layout>...Loading</Layout>;
  }

  if (status === "unauthenticated") router.push("/");

  return (
    <div className="py-8">
      {mealData.length ? (
        <Table
          aria-label="Sleep, Exercise, Weight Data"
          className="min-w-fit h-auto text-center"
        >
          <Table.Header>
            <Table.Column width="4" css={{ textAlign: "center" }} allowsSorting>
              Date
            </Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Meal Type</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>
              Foods Eaten
            </Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Calorie</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>
              Carbohydrate
            </Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Fat</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Fiber</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Protein</Table.Column>
          </Table.Header>
          <Table.Body>
            {mealData.map((data) => (
              <Table.Row key={data._id}>
                <Table.Cell>{data.date}</Table.Cell>
                <Table.Cell>{data.mealType}</Table.Cell>
                <Table.Cell>
                  {data.foodsEaten.map((food) =>
                    food === data.foodsEaten[data.foodsEaten.length - 1] ? (
                      <>{food}</>
                    ) : (
                      <>{food}, </>
                    )
                  )}
                </Table.Cell>
                <Table.Cell>
                  {data.totalNutrientCount.calorie.toFixed()}kcal
                </Table.Cell>
                <Table.Cell>
                  {data.totalNutrientCount.carbohydrate.toFixed()}g
                </Table.Cell>
                <Table.Cell>
                  {data.totalNutrientCount.fat.toFixed()}g
                </Table.Cell>
                <Table.Cell>
                  {data.totalNutrientCount.fiber.toFixed()}g
                </Table.Cell>
                <Table.Cell>
                  {data.totalNutrientCount.protein.toFixed()}g
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          {mealData.length > 10 ? (
            <Table.Pagination shadow noMargin align="center" rowsPerPage={10} />
          ) : null}
        </Table>
      ) : (
        <div className="flex justify-center py-4 font-semibold text-lg">
          You Don&apos;t have any data yet. Go to
          <Link
            href="/data/addMealData"
            className="text-red-700 font-bold px-1 hover:underline hover:underline-offset-2"
          >
            Input Meal Data
          </Link>
          to get add data about yourself!
        </div>
      )}
    </div>
  );
};

export default MealData;
