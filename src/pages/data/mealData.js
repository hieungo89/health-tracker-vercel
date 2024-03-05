import Calendar from "@components/Calendar";
import { NutritionDisplayCard } from "@components/FoodDisplayCard";
import { Modal } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MealData = () => {
  const { data: session } = useSession();
  const [mealData, setMealData] = useState([]);
  const [modal, setModal] = useState(false);
  const [displayCard, setDisplayCard] = useState({});

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

  const handleClick = async (date) => {
    let obj;

    for (let i = 0; i < mealData.length; i++) {
      if (mealData[i].date === date) {
        obj = mealData[i];
        break;
      }
    }

    await setDisplayCard(obj);
    setModal(true);
  };

  useEffect(() => {
    if (!session) return;
    getMealData();
  }, [session]);

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

      <Modal
        blur
        aria-labelledby="nutrition-display-card"
        open={modal}
        onClose={() => setModal(false)}
        className="w-[280px] m-auto cursor-auto"
      >
        <NutritionDisplayCard
          data={displayCard}
          handleClick={() => setModal(false)}
        />
      </Modal>
    </div>
  );
};

export default MealData;
