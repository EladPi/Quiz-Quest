import { fetchCategories } from "../API/fetchCategories";
import { fetchNumberOfQuestionsForCategory } from "../API/API";


const loadCategories = async () => {
    try {
        const fetchedCategories = await fetchCategories();
        return fetchedCategories
    } catch (error) {
        console.error('Failed to load categories:', error);
        return null;
    }

};


const loadMaxNumberOfQuestionForCategory = async (category,difficulty) => {
    try {
        const fetchedNumber = await fetchNumberOfQuestionsForCategory(category, difficulty);
        return fetchedNumber;
    } catch (error) {
        console.error('Failed to number of categories:', error);
        return null;
    }

};


export const quickStart = async () => {
    const allCategories = await loadCategories();
    const allDifficulties=['easy','medium','hard'];
    const allTypes=['any','multiple','boolean'];
    let maximumNumberOfQuestions;

    let selectedCategory;
    let selectedNumOfQuestions;
    let selectedType;
    let selectedCategoryName;
    let selectedDifficulty;


    selectedCategory= allCategories[Math.floor(Math.random()*allCategories.length)];
    selectedCategoryName = selectedCategory.name;
    selectedDifficulty = allDifficulties[Math.floor(Math.random()*allDifficulties.length)];
    selectedType = allTypes[Math.floor(Math.random()*allTypes.length)];
    maximumNumberOfQuestions = await loadMaxNumberOfQuestionForCategory(selectedCategory.id , selectedDifficulty);
    maximumNumberOfQuestions= maximumNumberOfQuestions > 50 ? 50 : maximumNumberOfQuestions;
    selectedNumOfQuestions = Math.floor(Math.random() * (maximumNumberOfQuestions - 5 + 1)) + 5;

    return {
        categoryId:selectedCategory.id,
        categoryName: selectedCategoryName,
        numberOfQuestions: selectedNumOfQuestions,
        type: selectedType,
        difficulty:selectedDifficulty
    };
}