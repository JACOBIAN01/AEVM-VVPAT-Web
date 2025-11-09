import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

import Akshat from "./assets/akshat.jpg";
import Kunal from "./assets/kunal.jpg";
import user from "./assets/user.png";
import lotus from "./assets/lotus.png";
import hand from "./assets/hand.png";

const VVPAT = () => {
  const [voter, setVoter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const voterId = "3233";
    const docRef = doc(db, "Voters", voterId);

    const unsub = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) setVoter(docSnap.data());
        else setVoter(null);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching voter data:", error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="w-screen h-screen flex bg-gradient-to-r from-[#f2f2f2] to-[#ffffff] overflow-hidden">
      {/* LEFT COLUMN - VOTER CARD STYLE */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center border-r-4 border-gray-300 bg-gradient-to-b from-blue-50 to-blue-100 p-6">
        <div className="bg-white shadow-lg rounded-xl border-4 border-blue-400 w-[80%] p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-700 uppercase mb-4 border-b-2 border-blue-400 pb-2">
            Voter Identification
          </h2>

          {loading ? (
            <p className="text-gray-500 italic">Fetching voter data...</p>
          ) : voter ? (
            <>
              <img
                src={voter.ImageURL || user}
                alt="Voter"
                className="w-40 h-40 mx-auto rounded-lg border-4 border-blue-400 object-cover"
              />

              <div className="mt-4 text-left px-4">
                <p className="text-lg font-semibold text-gray-800">
                  Name: <span className="font-normal">{voter.Name}</span>
                </p>
                <p className="text-md font-semibold text-gray-700">
                  Voter ID: <span className="font-normal">{voter.ID}</span>
                </p>
                <p
                  className={`mt-3 inline-block px-4 py-1 rounded-full text-sm font-medium ${
                    voter.Vote_Eligible
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {voter.Vote_Eligible ? "Eligible to Vote" : "Not Eligible"}
                </p>
              </div>
            </>
          ) : (
            <p className="text-red-500">Voter not found.</p>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN - STATIC CANDIDATES */}
      <div className="w-1/2 h-full flex flex-col bg-gray-50">
        {/* Candidate 1 (Top Half) */}
        <div className="flex items-center justify-between flex-1 bg-white border-b-4 border-gray-300 p-8">
          <div className="flex items-center space-x-6">
            <img
              src={Akshat}
              alt="Candidate 1"
              className="w-32 h-32 rounded-lg border-4 border-yellow-500 object-cover"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">Akshat</p>
              <div className="flex items-center space-x-3 mt-2">
                <img src={lotus} alt="Party Symbol" className="w-10 h-10" />
                <span className="text-lg font-semibold text-gray-700">
                  Bharatiya Pragati Party
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-gray-700 font-semibold text-xl">
            <span>Press Here</span>
            <span className="ml-3 text-3xl text-orange-500">→</span>
          </div>
        </div>

        {/* Candidate 2 (Bottom Half) */}
        <div className="flex items-center justify-between flex-1 bg-white p-8">
          <div className="flex items-center space-x-6">
            <img
              src={Kunal}
              alt="Candidate 2"
              className="w-32 h-32 rounded-lg border-4 border-purple-600 object-cover"
            />
            <div>
              <p className="text-2xl font-bold text-gray-800">Kunal</p>
              <div className="flex items-center space-x-3 mt-2">
                <img src={hand} alt="Party Symbol" className="w-10 h-10" />
                <span className="text-lg font-semibold text-gray-700">
                  People’s Alliance Front
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-gray-700 font-semibold text-xl">
            <span>Press Here</span>
            <span className="ml-3 text-3xl text-orange-500">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VVPAT;
