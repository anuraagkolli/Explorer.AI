import React, { useState, useEffect } from "react";
import supabase from "../supabaseConfig";
import Navbar from "../components/Navbar";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate } from "react-router-dom";
import BackgroundWater from "../components/BackgroundWater";

const Home = () => {
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Moderate"); // Initial option
  const [selectedAnswer, setSelectedAnswer] = useState(1); // trip pace
  const [people, setPeople] = useState(0);
  const [days, setDays] = useState(0);
  const [budget, setBudget] = useState(0);
  const [destination, setDestination] = useState("");
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const test = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserID(user.id);
    };

    test();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setIsDropdownOpen(false); // Close the dropdown when a month is selected
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };
  const handleBudgetClick = (answer) => {
    setBudget(answer);
  };

  return (
    <>
          <div className="relative z-10 flex flex-col items-center justify-start min-h-screen gap-6 text-black px-20">
      <div className="mt-15">
        <h1 className="font-bold text-6xl text-center">
          Where's your next memory?
        </h1>
      </div>
      <div className="mt-4 text-3xl text-center">
        {" "}
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg border border-gray-400 mt-4"
        placeholder="Where are you going?"
        onChange={(e) => {
          setDestination(e.target.value);
        }}
      />
      </div>
      <div className="mt-4 text-3xl text-center">
        {" "}
        <input
          type="number"trip pa
          className="w-30 px-2 py-1 rounded-lg border border-gray-400 text-center"
          placeholder="Trip Duration? (Days)"
          onChange={(e) => {
            setDays(e.target.value);
          }}
        />{" "}
        
      </div>
      <div className="mt-4 text-center relative flex items-center">
        {selectedMonth && (
          <p className="ml-2 mr-2 text-3xl font-bold">
            
          </p>
        )}
        <span className="rounded-md shadow-sm">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle the dropdown visibility
            type="button"
            className="px-4 py-2 bg-slate-600 text-white text-2xl font-bold rounded-lg  hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-blue active:bg-blue-800"
            id="month-selector"
          >
            {selectedMonth || "Select Month"}
          </button>
        </span>
        {isDropdownOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="month-selector"
          >
            <div className="py-1">
              {months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => handleMonthChange(month)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="ml-4 flex items-center space-x-2">
        <p className="font-bold text-xl"></p>
        <button
          className={`${
            selectedAnswer === 1
              ? "bg-slate-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          } px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-xl font-bold`}
          onClick={() => handleAnswerClick(1)}
        >
          Relaxed
        </button>
        <button
          className={`${
            selectedAnswer === 2
              ? "bg-slate-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          } px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-xl font-bold`}
          onClick={() => handleAnswerClick(2)}
        >
          Moderate
        </button>
        <button
          className={`${
            selectedAnswer === 3
              ? "bg-slate-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          } px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-xl font-bold`}
          onClick={() => handleAnswerClick(3)}
        >
          Fast-paced
        </button>
      </div>
      <div className="mt-4 text-3xl text-center">
        {" "}
        <input
          type="number"
          className="w-30 px-2 py-1 rounded-lg border border-gray-400 text-center"
          placeholder="How many people?"
          onChange={(e) => {
            setPeople(e.target.value);
          }}
        />{" "}
        
      </div>
      <div className="ml-4 flex items-center space-x-2">
        <p className="font-bold text-3xl"></p>
        <button
          className={`${
            budget === 1
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          } px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-xl font-bold`}
          onClick={() => handleBudgetClick(1)}
        >
          $
        </button>
        <button
          className={`${
            budget === 2
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          } px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-xl font-bold`}
          onClick={() => handleBudgetClick(2)}
        >
          $$
        </button>
        <button
          className={`${
            budget === 3
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          } px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-xl font-bold`}
          onClick={() => handleBudgetClick(3)}
        >
        $$$
        </button>
      </div>

      {loading ? (
        <PropagateLoader
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <button
          className="transition hover:bg-green-500 bg-slate-600 font-bold text-2xl text-white rounded-xl p-3"
          onClick={async () => {
            setLoading(true);
            console.log(typeof destination);

            let styleVar = "";

            if (selectedAnswer == 1) {
              styleVar = "Relaxed";
            } else if (selectedAnswer == 2) {
              styleVar = "Moderate";
            } else if (selectedAnswer == 3) {
              styleVar = "Fast";
            }

            let budgetVar = "";

            if (budget == 1) {
              budgetVar = "Low";
            } else if (budget == 2) {
              budgetVar = "Medium";
            } else if (budget == 3) {
              budgetVar = "High";
            }

            await axios
              .post("http://127.0.0.1:5000/", {
                destination: destination,
                duration: days,
                month: selectedMonth,
                style: styleVar,
                people: people,
                budget: budgetVar,
                userID: userID,
              })
              .then((response) => {
                setLoading(false);
                navigate("/realhomepage", { state: response.data });

                console.log("success");
                console.log(response.data);
                console.log();
                // Handle data
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Let's go places.
        </button>
      )}
    </div>
    <BackgroundWater />
    </>
  );
};

export default Home;