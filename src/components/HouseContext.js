import React, { createContext, useState, useEffect } from "react";

// import data
import { housesData } from "../data";

// create context
export const HouseContext = createContext();

// provider
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [category, setCategory] = useState("Category type (any)");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // return all countries
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // remove duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
  }, [houses]);

  useEffect(() => {
    // return only countries
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // remove duplicates
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];

    // set countries state
    setProperties(uniqueProperties);
  }, [houses]);

  useEffect(() => {
    // return only categories
    const allCategories = houses.map((house) => {
      return house.category;
    });

    // remove duplicates
    const uniqueCategories = ["Category (any)", ...new Set(allCategories)];

    // set categories state
    setCategories(uniqueCategories);
  }, [houses]);

  const handleClick = () => {
    setLoading(true);
    // check the string if includes '(any)'
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    // get first string (price) and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);
    console.log(minPrice);
    // get last string (price) and parse it to number
    const maxPrice = parseInt(price.split(" ")[2]);
    console.log(maxPrice);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      //4 pairs combinations

      // all values are selected
      if (!isDefault(category) && !isDefault(property) && !isDefault(country) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return  house.category === category && house.country === country && house.type === property;
        }
      }
      // all values are default
      if (
        isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        isDefault(category)
      ) {
        return house;
      }

      //single(1) pair combinations

      // category is not default (category is selected)
      if (
        !isDefault(category) &&
        isDefault(country) &&
        isDefault(property) &&
        isDefault(price)
      ) {
        return house.category === category;
      }
      // country is not default (country is selected)
      if (!isDefault(country) && isDefault(property) && isDefault(price) && isDefault(category)) {
        return house.country === country;
      }
      // property is not default (property is selected)
      if (!isDefault(property) && isDefault(country) && isDefault(price) && isDefault(category)) {
        return house.type === property;
      }
      // price is not default (price is selected)
      if (!isDefault(price) && isDefault(country) && isDefault(property) && isDefault(category)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      //3 pairs combinations

       //only price is default (country, property and category is selected)
       if (isDefault(price) && !isDefault(country) && !isDefault(property) && !isDefault(category)) {
        return house.country === country && house.type === property && house.category === category;
      }
       //only country is default (category, property and price is selected)
       if (!isDefault(price) && isDefault(country) && !isDefault(property) && !isDefault(category)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property && house.category === category;
        }
      }
       //only property is default (country, category and price is selected)
       if (!isDefault(price) && !isDefault(country) && isDefault(property) && !isDefault(category)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country && house.category === category;
        }
      }
       //only category is default (country, property and price is selected)
       if (!isDefault(price) && !isDefault(country) && !isDefault(property) && isDefault(category)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property && house.country === country;
        }
      }

       //2 pairs combinations

       // country and property is not default (country and property is selected)
       if (
        !isDefault(country) &&
        !isDefault(property) &&
        isDefault(price) &&
        isDefault(category)
      ) {
        return house.country === country && house.type === property;
      }
      // category and property is not default (category and property is selected)
      if (
        !isDefault(category) &&
        !isDefault(property) &&
        isDefault(price) &&
        isDefault(country)
      ) {
        return house.category === category && house.type === property;
      }
      // category and country is not default (category and country is selected)
      if (
        !isDefault(category) &&
        !isDefault(country) &&
        isDefault(price) &&
        isDefault(property)
      ) {
        return house.country === country && house.category === category;
      }

       // category and price is not default (category and price is selected)
       if (
        !isDefault(category) &&
        !isDefault(price) &&
        isDefault(country) &&
        isDefault(property)
      ) {
          if (housePrice >= minPrice && housePrice <= maxPrice) {
            return house.category === category;
          }
      }
      // country and price is not default (country and price is selected)
      if (
        !isDefault(country) &&
        isDefault(property) &&
        isDefault(category) &&
        !isDefault(price)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }
      // property and price is not default (property and price is selected)
      if (
        isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price) &&
        isDefault(category)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        handleClick,
        houses,
        loading,
        category,
        setCategory,
        categories,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;