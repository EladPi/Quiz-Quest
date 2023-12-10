
const CATEGORIES_URL = 'https://opentdb.com/api_category.php';

/**
 * Fetches all quiz categories from Open Trivia Database.
 * @returns {Promise} A promise that resolves to the list of categories.
 */

export const fetchCategories = async () => {
  try {
    const response = await fetch(CATEGORIES_URL);
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
