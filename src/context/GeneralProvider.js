import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GeneralContext from './GeneralContext';
import { saveMealsToken, saveCocktailsToken, saveUser } from '../services/localStorage';

export default function GeneralProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  const handleUser = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleJoin = () => {
    saveMealsToken();
    saveCocktailsToken();
    saveUser({ email: user.email });
  };

  const contextValue = {
    user,
    handleUser,
    handleJoin,

    foods,
    setFoods,
    drinks,
    setDrinks,

    foodCategories,
    setFoodCategories,
    drinkCategories,
    setDrinkCategories,
  };

  return (
    <GeneralContext.Provider value={ contextValue }>
      {children}
    </GeneralContext.Provider>
  );
}

GeneralProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
