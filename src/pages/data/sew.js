import { Table } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const SEW = () => {
  const { data: session, status } = useSession();
  const [wellnessData, setWellnessData] = useState([]);
  const router = useRouter();

  const getData = async () => {
    const { data } = await axios.get(
      `/api/wellnessData?email=${session?.user.email}`
    );
    setWellnessData(data);
  };

  useEffect(() => {
    if (!session) return;
    getData();
  }, [session]);

  if (status === "loading") {
    return <Layout>...Loading</Layout>;
  }

  if (status === "unauthenticated") router.push("/");

  return (
    <div className="p-8">
      {wellnessData.length ? (
        <Table
          aria-label="Sleep, Exercise, Weight Data"
          className="min-w-fit h-auto"
        >
          <Table.Header>
            <Table.Column allowsSorting>Date</Table.Column>
            <Table.Column allowsSorting>Exercise</Table.Column>
            <Table.Column allowsSorting>Sleep</Table.Column>
            <Table.Column allowsSorting>Weight</Table.Column>
            <Table.Column allowsSorting>Weight Time</Table.Column>
          </Table.Header>
          <Table.Body>
            {wellnessData.map((data) => (
              <Table.Row key={data._id}>
                <Table.Cell>{data.date}</Table.Cell>
                <Table.Cell>
                  {data.exercise.exercise_hr}hr {data.exercise.exercise_min}min
                </Table.Cell>
                <Table.Cell>
                  {data.sleep.sleep_hr}hr {data.sleep.sleep_min}min
                </Table.Cell>
                <Table.Cell>{data.weight.weightData}lb</Table.Cell>
                <Table.Cell>{data.weight.weightTime}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="flex justify-center py-4 font-semibold text-lg">
          You Don&apos;t have any data yet. Go to
          <Link
            href="/data/addHealthData"
            className="text-red-700 font-bold px-1 hover:underline hover:underline-offset-2"
          >
            Input Wellness Data
          </Link>
          to get add data about yourself!
        </div>
      )}
    </div>
  );
};

export default SEW;
