import { Table } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

const SEW = () => {
  const [wellnessData, setWellnessData] = useState([]);
  const [sortName, setSortName] = useState("DATE");
  const [sortDirection, setSortDirection] = useState(0);

  const { data: session } = useSession();

  const getData = async () => {
    const { data } = await axios.get(
      `/api/wellnessData?email=${session?.user.email}`
    );
    setWellnessData(data);
  };

  const handleSort = (label) => {
    const labelArr = label.split(" ");
    const initial = label.slice(0, 1);
    const word = labelArr[0];
    const sortedData = [...wellnessData];

    const sort = (direction, name) => {
      if (name === "exercise") {
        return sortedData.sort((a, b) => {
          const aTotal = a.exercise.exercise_hr * 60 + a.exercise.exercise_min;
          const bTotal = b.exercise.exercise_hr * 60 + b.exercise.exercise_min;
          return direction === "desc" ? aTotal - bTotal : bTotal - aTotal;
        });
      }
      if (name === "sleep") {
        return sortedData.sort((a, b) => {
          const aTotal = a.sleep.sleep_hr * 60 + a.sleep.sleep_min;
          const bTotal = b.sleep.sleep_hr * 60 + b.sleep.sleep_min;
          return direction === "desc" ? aTotal - bTotal : bTotal - aTotal;
        });
      }
      if (name === "weight") {
        sortedData.sort((a, b) => {
          const aWeight = a.weight.weightData;
          const bWeight = b.weight.weightData;
          return direction === "desc" ? aWeight - bWeight : bWeight - aWeight;
        });
      }
      if (direction === "desc") {
        sortedData.sort((a, b) => {
          if (a[name] < b[name]) return -1;
          if (a[name] > b[name]) return 1;
          return 0;
        });
      } else if (direction === "asc") {
        sortedData.sort((a, b) => {
          if (a[name] > b[name]) return -1;
          if (a[name] < b[name]) return 1;
          return 0;
        });
      }
    };

    switch (initial) {
      case "D":
        if (sortName === "DATE" && sortDirection === 0) {
          sort("asc", "date");
          setSortDirection(1);
        } else {
          sort("desc", "date");
          setSortDirection(0);
        }
        break;
      case "E":
        if (sortName === "EXERCISE" && sortDirection === 0) {
          sort("asc", "exercise");
          setSortDirection(1);
        } else {
          sort("desc", "exercise");
          setSortDirection(0);
        }
        break;
      case "S":
        if (sortName === "SLEEP" && sortDirection === 0) {
          sort("asc", "sleep");
          setSortDirection(1);
        } else {
          sort("desc", "sleep");
          setSortDirection(0);
        }
        break;
      case "W":
        if (sortName === "WEIGHT" && sortDirection === 0) {
          sort("asc", "weight");
          setSortDirection(1);
        } else {
          sort("desc", "weight");
          setSortDirection(0);
        }
        break;
    }

    sortName !== word ? setSortName(word) : null;
    setWellnessData(sortedData);
  };

  const headerInfo = (label) => (
    <>
      {label}
      {sortName === label ? (
        sortDirection === 0 ? (
          <> (&darr;)</>
        ) : (
          <> (&uarr;)</>
        )
      ) : null}
    </>
  );

  useEffect(() => {
    if (!session) return;
    getData();
  }, [session]);

  if (wellnessData.length < 1)
    return (
      <div className="p-8 text-center md:text-sm sm:text-xs overflow-auto">
        <div className="justify-center py-4 font-semibold text-lg lg:text-base md:text-sm">
          You Don&apos;t have any data yet. Go to
          <b className="text-red-700 px-1">Input Wellness Data</b>
          to add data about yourself!
        </div>
      </div>
    );

  return (
    <div className="p-8 text-center md:text-sm sm:text-xs overflow-auto">
      <Table
        isStriped
        aria-label="Sleep, Exercise, Weight Data"
        className="bg-white"
      >
        <Table.Header>
          {/* Cannot Produce DRY code due to NextUI incapabilities */}
          <Table.Column
            css={{ textAlign: "center" }}
            onClick={(e) => handleSort(e.target.innerHTML)}
          >
            {headerInfo("DATE")}
          </Table.Column>
          <Table.Column
            css={{ textAlign: "center" }}
            onClick={(e) => handleSort(e.target.innerHTML)}
          >
            {headerInfo("EXERCISE")}
          </Table.Column>
          <Table.Column
            css={{ textAlign: "center" }}
            onClick={(e) => handleSort(e.target.innerHTML)}
          >
            {headerInfo("SLEEP")}
          </Table.Column>
          <Table.Column
            css={{ textAlign: "center" }}
            onClick={(e) => handleSort(e.target.innerHTML)}
          >
            {headerInfo("WEIGHT")}
          </Table.Column>
          <Table.Column css={{ textAlign: "center" }}>TIME TAKEN</Table.Column>
        </Table.Header>
        <Table.Body
          emptyContent={
            "No data recorded yet. Please add Health data to keep track of your records."
          }
        >
          {wellnessData.map((data) => {
            const dateConverted = parseISO(data.date);
            return (
              <Table.Row key={data._id}>
                <Table.Cell>
                  {format(dateConverted, "MM / dd / yyyy")}
                </Table.Cell>
                <Table.Cell>
                  {!data.exercise.exercise_hr && !data.exercise.exercise_min ? (
                    <>----</>
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
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default SEW;
