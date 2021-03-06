import React, { useState, useEffect, useContext } from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import ButtonSearch from './Header/ButtonSearch';
import InputSearch from './Header/InputSearch';
import RadioFilter from './Header/RadioFilter';
import GeneralContext from '../context/GeneralContext';
import useFetch from '../custom-hooks/useFetch';
import {
  fetchMeals,
  fetchCocktails,
  fetchFoodIngredient,
  fetchFoodName,
  fetchFoodLetter,
  fetchDrinkIngredient,
  fetchDrinkName,
  fetchDrinkLetter,
} from '../services/mealsAndCocktailsAPI';
import { setRecipesFoodsOrDrinks } from './Header/helperFunctions';

function handleIsSearch(setFunc, search, setGlobalLoading) {
  const { typeRadio: type, pathname, searchValue: valueSearch } = search;
  const msgAlert = 'Your search must have only 1 (one) character';
  setGlobalLoading(true);

  console.log(pathname);

  switch (type) {
  case 'Ingredient':
    if (pathname.includes('/foods')) {
      fetchFoodIngredient(valueSearch)
        .then((data) => { setFunc(data.meals); setGlobalLoading(false); });
    } else {
      fetchDrinkIngredient(valueSearch)
        .then((data) => { setFunc(data.drinks); setGlobalLoading(false); })
        .catch(() => { setFunc(null); setGlobalLoading(false); });
    }
    break;
  case 'Name':
    if (pathname.includes('/foods')) {
      fetchFoodName(valueSearch)
        .then((data) => { setFunc(data.meals); setGlobalLoading(false); });
    } else {
      fetchDrinkName(valueSearch)
        .then((data) => { setFunc(data.drinks); setGlobalLoading(false); })
        .catch(() => { setFunc(null); setGlobalLoading(false); });
    }
    break;
  case 'First Letter':
    if (valueSearch.length > 1) return global.alert(msgAlert);
    if (pathname.includes('/foods')) {
      fetchFoodLetter(valueSearch)
        .then((data) => { setFunc(data.meals); setGlobalLoading(false); });
    } else {
      fetchDrinkLetter(valueSearch)
        .then((data) => { setFunc(data.drinks); setGlobalLoading(false); })
        .catch(() => { setFunc(null); setGlobalLoading(false); });
    }
    break;
  default:
    break;
  }
}

function getConditionalClasses(checkPathname, smallerTitle, classType, title) {
  let headerTopClass = checkPathname && !smallerTitle
    ? 'header-top d-flex justify-content-between align-self-sm-center'
    : 'header-top d-flex justify-content-center align-self-sm-center position-relative';
  let profileBtnClass = checkPathname && !smallerTitle
    ? 'btn-icon profile' : 'btn-icon profile-abs position-absolute';
  let titleClass = smallerTitle ? 'smaller-title mb-0' : 'mb-0';

  if (title === 'Explore Nationalities') {
    headerTopClass = 'header-top d-flex justify-content-between align-self-sm-center';
    profileBtnClass = 'btn-icon profile';
  }

  if (title === 'Explore Ingredients') {
    titleClass = 'smaller-title mb-0 ms-3';
  }

  switch (classType) {
  case 'header-top':
    return headerTopClass;
  case 'profile':
    return profileBtnClass;
  case 'title':
    return titleClass;
  default:
    return '';
  }
}

export default function Header({ title, smallerTitle }) {
  const { location: { pathname } } = useHistory();
  const {
    setFoods,
    setDrinks,
    setGlobalLoading,
  } = useContext(GeneralContext);

  const [recipes, setRecipes] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [isInput, setIsInput] = useState(false);
  const [typeRadio, setTypeRadio] = useState('Ingredient');

  const [headerBottomOpen, setHeaderBottomOpen] = useState(false);

  const [defaultFoods] = useFetch(fetchMeals);
  const [defaultDrinks] = useFetch(fetchCocktails);
  const ALERT = 'Sorry, we haven\'t found any recipes for these filters.';

  useEffect(() => {
    setRecipesFoodsOrDrinks(pathname, setFoods, setDrinks, recipes);
    setsearchValue('');
  }, [pathname, recipes, setDrinks, setFoods]);

  const checkPathname = (
    title === 'Foods'
    || title === 'Explore Nationalities'
    || title === 'Drinks'
  );

  if (recipes === null) {
    if (pathname.includes('/foods')) {
      setRecipes(defaultFoods.meals);
    } else {
      setRecipes(defaultDrinks.drinks);
    }
    setsearchValue('');
    return global.alert(ALERT);
  }

  if (recipes.length === 1) {
    return (pathname.includes('/foods'))
      ? <Redirect to={ `${pathname}/${recipes[0].idMeal}` } /> : (
        <Redirect to={ `${pathname}/${recipes[0].idDrink}` } />
      );
  }

  const headerTopClass = getConditionalClasses(
    checkPathname, smallerTitle, 'header-top', title,
  );
  const profileBtnClass = getConditionalClasses(
    checkPathname, smallerTitle, 'profile', title,
  );
  const titleClass = getConditionalClasses(
    checkPathname, smallerTitle, 'title', title,
  );
  const hbClass = headerBottomOpen ? 'header-bottom' : 'header-bottom-close';

  return (
    <header className="header px-3 py-2 d-flex flex-column text-light">
      <div className={ headerTopClass }>
        <Link to="/profile">
          <button type="button" className={ profileBtnClass }>
            <AiOutlineUser
              data-testid="profile-top-btn"
              size={ 35 }
              color="#eee"
              src={ imageProfile }
            />
          </button>
        </Link>
        <h1 data-testid="page-title" className={ titleClass }>{title}</h1>
        {checkPathname ? (
          <ButtonSearch
            boolean={ !isInput }
            setBoolean={ setIsInput }
            setHeaderBottomOpen={ setHeaderBottomOpen }
            icon={ imageSearch }
          />
        )
          : null}
      </div>
      {
        isInput ? (
          <div
            className={ `${hbClass} d-sm-flex align-items-center align-self-sm-center` }
          >
            <InputGroup className="mt-2 mt-sm-1">
              <InputSearch handleChange={ setsearchValue } v={ searchValue } />
              <Button
                variant="warning"
                type="button"
                data-testid="exec-search-btn"
                disabled={ searchValue === '' || typeRadio === '' }
                onClick={ () => (
                  handleIsSearch(
                    setRecipes, { typeRadio, pathname, searchValue }, setGlobalLoading,
                  )
                ) }
              >
                Search
              </Button>
            </InputGroup>
            {
              checkPathname ? (
                <div
                  className="
                    radio-buttons mt-3 d-flex justify-content-around mt-sm-2 mx-md-3"
                >
                  <RadioFilter
                    Value="Ingredient"
                    setValue={ setTypeRadio }
                    typeRadio={ typeRadio }
                    name="search"
                    testid="ingredient-search-radio"
                  />
                  <RadioFilter
                    Value="Name"
                    setValue={ setTypeRadio }
                    typeRadio={ typeRadio }
                    name="search"
                    testid="name-search-radio"
                  />
                  <RadioFilter
                    Value="First Letter"
                    setValue={ setTypeRadio }
                    typeRadio={ typeRadio }
                    name="search"
                    testid="first-letter-search-radio"
                  />
                </div>
              ) : null
            }
          </div>
        ) : null
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  smallerTitle: PropTypes.bool,
};

Header.defaultProps = {
  smallerTitle: false,
};
