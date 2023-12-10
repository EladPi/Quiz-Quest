
const BASE_URL = 'https://opentdb.com/api.php';
const CATEGORIES_URL = 'https://opentdb.com/api_count.php?category='

/**
 * Fetches trivia questions from Open Trivia Database based on user selections.
 * 
 * @param {string} numOfQuestions - Number of questions to fetch.
 * @param {string} category - Category ID of the questions.
 * @param {string} difficulty - Difficulty level (easy, medium, hard).
 * @param {string} type - Type of questions (multiple, boolean).
 * @returns {Promise} - A promise that resolves to the fetched data.
 */


export const fetchTriviaQuestions = async ({ numOfQuestions, category, difficulty, type }) => {
  try {
    let queryParams = `?amount=${numOfQuestions}`;
    if (category) queryParams += `&category=${category}`;
    if (difficulty) queryParams += `&difficulty=${difficulty}`;
    if (type && type!='any') queryParams += `&type=${type}`;

    const url = BASE_URL + queryParams;

    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error('Failed to fetch trivia questions');
    }

    return data.results;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};

export const fetchNumberOfQuestionsForCategory = async (category,difficulty) =>{
  try{
    const categoryURL = CATEGORIES_URL + category
    const response = await fetch(categoryURL)
    const data = await response.json();
    if(difficulty === 'hard'){
      return data.category_question_count.total_hard_question_count;
    }
    else if(difficulty === 'medium'){
      return data.category_question_count.total_medium_question_count;
    }
    else{
      return data.category_question_count.total_easy_question_count;
    }

  }catch(error){
    console.log('Failed to fetch categories number')
    throw error;
  }
}
