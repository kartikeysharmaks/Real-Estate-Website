import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { BiArea, BiBath, BiBed } from "react-icons/bi";

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProperties = onSnapshot(
      collection(db, "properties"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setProperties(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      getProperties();
    };
  }, []);

  console.log(properties);

  if (properties.length < 1) {
    return (
      <div className="text-center text-3xl text-gray-400">
        Sorry, nothing was found.
      </div>
    );
  };

  return (
    <div className="container mx-auto mb-5">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
        {properties && properties.map((house, index) => {
          return (
            <div
              className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] mx-auto w-full max-w-[352px]  cursor-pointer hover:shadow-2xl transition"
              key={index}
            >
              <img
                className="mb-8 rounded-tl-[80px] rounded-br-[50px] object-cover h-[300px] w-[320px]"
                src={house.img}
                alt="house"
              />
              <div className="mb-4 flex gap-x-2 text-sm">
                <div className="bg-green-500 rounded-full text-white px-3 inline-block">
                  {house.type}
                </div>
                <div className="bg-violet-500 rounded-full text-white px-3 inline-block">
                  {house.country}
                </div>
                <div className="bg-green-500 rounded-full text-white px-3 inline-block">
                  {house.category}
                </div>
              </div>
              <div className="text-lg font-semibold max-w-[260px]">
                {house.name}, {house.address}
              </div>
              <div className="flex gap-x-4 my-4">
                <div className="flex items-center text-gray-600 gap-1">
                  <div className="text-[20px] rounded-full">
                    <BiBed />
                  </div>
                  <div className="text-base">{house.bedrooms}</div>
                </div>
                <div className="flex items-center text-gray-600 gap-1">
                  <div className="text-[20px] rounded-full">
                    <BiBath />
                  </div>
                  <div className="text-base">{house.bathrooms}</div>
                </div>
                <div className="flex items-center text-gray-600 gap-1">
                  <div className="text-[20px] rounded-full">
                    <BiArea />
                  </div>
                  <div className="text-base">{house.surface}</div>
                </div>
              </div>
              <div className="text-lg font-semibold text-violet-600 mb-4">
                $ {house.price}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertiesList;
