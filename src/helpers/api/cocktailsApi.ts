import { IDrink, IDrinkDetails, IIngredient } from '../../interfaces/drink';
import { ICategory } from '../../interfaces/misc';
import { shuffleArray } from '../shuffleArray';
import { baseFetch as b } from './baseFetch';

const baseFetch = <T>(url: string, defaultReturn: T) => b('drinks', url, defaultReturn);

const ALL_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const ALL_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const COCKTAILS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const COCKTAILS_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const COCKTAILS_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCKTAILS_BY_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const COCKTAIL_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const RANDOM_COCKTAIL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

const fetchCocktails = async () => {
  const categories = await fetchCocktailsCategories();
  const drinks: IDrink[] = [];

  for (const { strCategory } of categories) {
    const data = await fetchCocktailsByCategory(strCategory);
    drinks.push(...data);
  }

  return shuffleArray(drinks);
};

const fetchCocktailsCategories = () => baseFetch<ICategory[]>(ALL_CATEGORIES, []);

const fetchCocktailDetails = (id: string) =>
  baseFetch<IDrinkDetails | null>(`${COCKTAIL_DETAILS}${id}`, null);
const fetchCocktailRandom = () => baseFetch<IDrinkDetails | null>(RANDOM_COCKTAIL, null);

const fetchCocktailsByCategory = (category: string) =>
  baseFetch<IDrink[]>(`${COCKTAILS_BY_CATEGORY}${category}`, []);
const fetchCocktailsByIngredient = (ingredient: string) =>
  baseFetch<IDrink[]>(`${COCKTAILS_BY_INGREDIENT}${ingredient}`, []);

const fetchCocktailIngredients = () => baseFetch<IIngredient[]>(`${ALL_INGREDIENTS}`, []);

const fetchCocktailsByName = (name: string) =>
  baseFetch<IDrink[]>(`${COCKTAILS_BY_NAME}${name}`, []);
const fetchCocktailsByFirstLetter = (letter: string) =>
  baseFetch<IDrink[]>(`${COCKTAILS_BY_FIRST_LETTER}${letter}`, []);

export {
  fetchCocktails,
  fetchCocktailsCategories,
  fetchCocktailDetails,
  fetchCocktailRandom,
  fetchCocktailsByCategory,
  fetchCocktailsByIngredient,
  fetchCocktailIngredients,
  fetchCocktailsByName,
  fetchCocktailsByFirstLetter,
};
