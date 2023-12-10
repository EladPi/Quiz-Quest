import Quiz from "../Components/Quiz";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAll } from "../Redux/Reducers/quizOptionsSlice";
import { fetchTriviaQuestions } from "../API/API";
import { View } from "react-native";
import { DotIndicator } from 'react-native-indicators';


const GameScreen = () => {
    const allParameters = useSelector(selectAll);
    const [questions, setQuestions] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questions = await fetchTriviaQuestions(allParameters);
                setQuestions(questions);
                setIsLoading(false);

            }
            catch (error) {
                setHasError(true)
                console.error('Failed to load questions. Please try again.:', error);

            }
        }
        fetchQuestions();
    }, [])


    return (
        <>
            {isLoading ? (
                hasError ? (
                    <View style={{ backgroundColor: '#3EB489', flex: 1 }}>
                        <Quiz questions={questions} />
                    </View >
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid red' }}>
                        <DotIndicator size={18} color='#008080' animationDuration={500} count={3} />
                    </View>
                )
            ) : (
                <View style={{ backgroundColor: '#3EB489', flex: 1 }}>
                    <Quiz questions={questions} />
                </View >
            )}
        </>
    )
}

export default GameScreen;