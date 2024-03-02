import { Line } from "@components/Icons";
import { Card, Text } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { NutritionDisplayCard } from "@components/FoodDisplayCard";
import { Button } from "@components/Button";

const MealData = () => {
  const { data: session } = useSession();
  const [mealData, setMealData] = useState([]);
  const [sortedMealData, setSortedMealData] = useState([]);

  const getMealData = async () => {
    const { data } = await axios.get(
      `/api/mealData?email=${session?.user.email}`
    );
    await setMealData(data);
  };

  const sortDataByDate = () => {
    const dates = mealData.map((meal) => {
      return meal.date;
    });

    const sortedData = [];

    for (let i = 0; i < dates.length; i++) {
      if (dates[i] !== dates[i - 1]) {
        sortedData.push(mealData[i]);
        sortedData[sortedData.length - 1].mealType = [mealData[i].mealType];
      } else {
        sortedData[sortedData.length - 1].foodsEaten = [
          ...sortedData[sortedData.length - 1].foodsEaten,
          ...mealData[i].foodsEaten,
        ];
        sortedData[sortedData.length - 1].foodsId = [
          ...sortedData[sortedData.length - 1].foodsId,
          ...mealData[i].foodsId,
        ];
        sortedData[sortedData.length - 1].mealType = [
          ...sortedData[sortedData.length - 1].mealType,
          mealData[i].mealType,
        ];

        const allNutrients =
          sortedData[sortedData.length - 1].totalNutrientCount;

        for (let nutrient in allNutrients) {
          sortedData[sortedData.length - 1].totalNutrientCount[
            nutrient
          ].quantity += mealData[i].totalNutrientCount[nutrient].quantity;
          sortedData[sortedData.length - 1].totalNutrientCount[
            nutrient
          ].perOfDailyNeeds +=
            mealData[i].totalNutrientCount[nutrient].perOfDailyNeeds;
        }
      }
    }

    setSortedMealData(sortedData);
  };

  useEffect(() => {
    if (!session) return;
    getMealData();
  }, [session]);

  useEffect(() => {
    if (!mealData) return;
    sortDataByDate();
  }, [mealData]);

  if (sortedMealData.length < 1)
    return (
      <div className="p-8 text-center md:text-sm sm:text-xs overflow-auto">
        <div className="justify-center py-4 font-semibold text-lg lg:text-base md:text-sm">
          You Don&apos;t have any data yet. Go to
          <b className="text-red-700 px-1">Input Meals Data</b>
          to add your meals!
        </div>
      </div>
    );

  return (
    <div className="py-8">
      <div
        className="grid grid-cols-5 justify-items-center p-4 overflow-auto
        2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 lg:max-h-[80rem] sm:grid-cols-1"
      >
        <div className="flex flex-col">
          {sortedMealData.map((data) => {
            return (
              <Button
                key={data.date}
                content={data.date}
                handleClick={() => console.log("clicked")}
              />
            );
          })}
        </div>
        {/* {sortedMealData.map((data, index) => {
          return <NutritionDisplayCard key={index + data.date} data={data} />;
        })} */}
      </div>
    </div>
  );
};

export default MealData;
