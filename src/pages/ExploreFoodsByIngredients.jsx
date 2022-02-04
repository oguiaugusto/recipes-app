import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import {
  fetchFoodIngredient,
  fetchIngredientFood,
} from '../services/mealsAndCocktailsAPI';
import Card from '../components/Card';
import GeneralContext from '../context/GeneralContext';

const MAX_CARD_NUMBER = 12;

export default function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  const {
    setFoodIngredient,
  } = useContext(GeneralContext);

  useEffect(() => {
    fetchIngredientFood()
      .then((data) => setIngredients(data.meals));
  }, []);

  function handleFetch(ingredient) {
    fetchFoodIngredient(ingredient)
      .then((data) => setFoodIngredient(data.meals));
  }

  console.log(ingredients);

  return (
    <div>
      <Header />
      {ingredients === undefined ? null
        : (ingredients.map((ingre, i) => (i < MAX_CARD_NUMBER ? (
          <Link
            key={ `${ingre.strIngredient}-${i}` }
            onClick={ () => handleFetch(ingre.strIngredient) }
            to="/foods"
          >
            <Card
              width="18rem"
              thumb={ `https://www.themealdb.com/images/ingredients/${ingre.strIngredient}.png` }
              name={ ingre.strIngredient }
              cardTestId={ `${i}-ingredient-card` }
              imgTestId={ `${i}-card-img` }
              titleTestId={ `${i}-card-name` }
            />
          </Link>
        ) : null)))}
      <Footer />
    </div>
  );
}
