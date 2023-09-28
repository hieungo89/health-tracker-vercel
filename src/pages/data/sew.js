import { Table } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SEW = () => {
  const [wellnessData, setWellnessData] = useState([]);

  const { data: session } = useSession();

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

  return (
    <div className="p-8 text-center md:text-sm sm:text-xs overflow-auto">
      {wellnessData.length ? (
        <Table aria-label="Sleep, Exercise, Weight Data">
          <Table.Header>
            <Table.Column css={{ textAlign: "center" }}>Date</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Exercise</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Sleep</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Weight</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>
              Weight Time
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {wellnessData.map((data) => (
              <Table.Row key={data._id}>
                <Table.Cell>{data.date}</Table.Cell>
                <Table.Cell>
                  {!data.exercise.exercise_hr && !data.exercise.exercise_min ? (
                    <>none</>
                  ) : (
                    <>
                      {data.exercise.exercise_hr > 0
                        ? data.exercise.exercise_hr + "h"
                        : ""}
                      &nbsp;
                      {data.exercise.exercise_min > 0
                        ? data.exercise.exercise_min + "m"
                        : ""}
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {data.sleep.sleep_hr > 0 ? data.sleep.sleep_hr + "h" : ""}
                  &nbsp;
                  {data.sleep.sleep_min > 0 ? data.sleep.sleep_min + "m" : ""}
                </Table.Cell>
                <Table.Cell>{data.weight.weightData}lb</Table.Cell>
                <Table.Cell>{data.weight.weightTime}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="justify-center py-4 font-semibold text-lg lg:text-base md:text-sm">
          You Don&apos;t have any data yet. Go to
          <b className="text-red-700 px-1">Input Wellness Data</b>
          to get add data about yourself!
        </div>
      )}
    </div>
  );
};

export default SEW;
