import { IFood, IFoodDetails, IIngredient } from '../../interfaces/food';
import { IArea, ICategory } from '../../interfaces/misc';
import { shuffleArray } from '../shuffleArray';
import { baseFetch as b } from './baseFetch';

const baseFetch = <T>(url: string, defaultReturn: T) => b('meals', url, defaultReturn);

// const ALL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ALL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const ALL_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const ALL_AREAS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

const MEALS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const MEALS_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const MEALS_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEALS_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEALS_BY_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const MEAL_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const fetchMeals = async () => {
  const categories = await fetchMealsCategories();
  const foods: IFood[] = [];

  for (const { strCategory } of categories) {
    const data = await fetchMealsByCategory(strCategory);
    foods.push(...data);
  }

  return shuffleArray(foods);
};

const fetchMealsCategories = () => baseFetch<ICategory[]>(ALL_CATEGORIES, []);

const fetchMealDetails = (id: string) =>
  baseFetch<IFoodDetails | null>(`${MEAL_DETAILS}${id}`, null);
const fetchMealRandom = () => baseFetch<IFoodDetails | null>(RANDOM_MEAL, null);

const fetchMealsByCategory = (category: string) =>
  baseFetch<IFood[]>(`${MEALS_BY_CATEGORY}${category}`, []);
const fetchMealsByIngredient = (ingredient: string) =>
  baseFetch<IFood[]>(`${MEALS_BY_INGREDIENT}${ingredient}`, []);

const fetchMealsByArea = (area: string) => baseFetch<IFood[]>(`${MEALS_BY_AREA}${area}`, []);

const fetchMealAreas = () => baseFetch<IArea[]>(`${ALL_AREAS}`, []);
const fetchMealIngredients = () => baseFetch<IIngredient[]>(`${ALL_INGREDIENTS}`, []);

const fetchMealsByName = (name: string) => baseFetch<IFood[]>(`${MEALS_BY_NAME}${name}`, []);
const fetchMealsByFirstLetter = (letter: string) =>
  baseFetch<IFood[]>(`${MEALS_BY_FIRST_LETTER}${letter}`, []);

export {
  fetchMeals,
  fetchMealsCategories,
  fetchMealDetails,
  fetchMealRandom,
  fetchMealsByCategory,
  fetchMealsByIngredient,
  fetchMealsByArea,
  fetchMealAreas,
  fetchMealIngredients,
  fetchMealsByName,
  fetchMealsByFirstLetter,
};
