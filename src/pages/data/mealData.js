import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { NutritionDisplayCard } from "@components/FoodDisplayCard";
import { Button } from "@components/Button";
import Calendar from "@components/Calendar";

const MealData = () => {
  const { data: session } = useSession();
  const [mealData, setMealData] = useState([]);

  const getMealData = async () => {
    const { data } = await axios.get(
      `/api/mealData?email=${session?.user.email}`
    );

    const dates = data.map((meal) => meal.date);
    const sortedData = [];

    for (let i = 0; i < dates.length; i++) {
      if (dates[i] !== dates[i - 1]) {
        sortedData.push(data[i]);
        sortedData[sortedData.length - 1].mealType = [data[i].mealType];
      } else {
        sortedData[sortedData.length - 1].foodsEaten = [
          ...sortedData[sortedData.length - 1].foodsEaten,
          ...data[i].foodsEaten,
        ];
        sortedData[sortedData.length - 1].foodsId = [
          ...sortedData[sortedData.length - 1].foodsId,
          ...data[i].foodsId,
        ];
        sortedData[sortedData.length - 1].mealType = [
          ...sortedData[sortedData.length - 1].mealType,
          data[i].mealType,
        ];

        const allNutrients =
          sortedData[sortedData.length - 1].totalNutrientCount;

        for (let nutrient in allNutrients) {
          sortedData[sortedData.length - 1].totalNutrientCount[
            nutrient
          ].quantity += data[i].totalNutrientCount[nutrient].quantity;
          sortedData[sortedData.length - 1].totalNutrientCount[
            nutrient
          ].perOfDailyNeeds +=
            data[i].totalNutrientCount[nutrient].perOfDailyNeeds;
        }
      }
    }

    await setMealData(sortedData);
  };

  const handleClick = (date) => {
    console.log("handleClick ", date);
  };

  useEffect(() => {
    if (!session) return;
    getMealData();
  }, [session]);

  useEffect(() => {
    console.log(mealData);
  }, [mealData]);

  // useEffect(() => {
  //   if (!mealData) return;
  //   sortDataByDate();
  // }, [mealData]);

  if (mealData.length < 1)
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
      <Calendar data={mealData} handleClick={(str) => handleClick(str)} />
      <div
        className="grid grid-cols-5 justify-items-center p-4 overflow-auto
            2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 lg:max-h-[80rem] sm:grid-cols-1"
      >
        {/* {sortedMealData.map((data, index) => {
          return <NutritionDisplayCard key={index + data.date} data={data} />;
        })} */}
      </div>
    </div>
  );
};

export default MealData;
