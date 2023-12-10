import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../Redux/Reducers/summarySlice";
import shuffleAnswers from "../Utils/shuffle";
import { useNavigation } from "@react-navigation/native";
import { selectAll } from "../Redux/Reducers/quizOptionsSlice";
import questionMarkIcon from '../Assets/questionMarkIcon.png'
import sadEmoji from '../Assets/sadEmoji.png'
import decodeHTMLEntities from "../Utils/decoding";

const Quiz = ({ questions }) => {
    const [questionText, setQuestionText] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState('');
    const [allAnswers, setAllAnswers] = useState()
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [selectedAnswerIsCorrect, setSelectedAnswerIsCorrect] = useState(false)
    const [questionNumber, setQuestionNumber] = useState(0);
    const [showStarterView, setShowStarterView] = useState(true);
    const [showExitView, setShowExitView] = useState(false);
    const dispatch = useDispatch();
    const slideAnim = useRef(new Animated.Value(500)).current;
    const nav = useNavigation();
    const allParameters = useSelector(selectAll);
    const [fadeAnim] = useState(new Animated.Value(1));

    const animateSlide = () => {
        slideAnim.setValue(500);

        Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const fadeOutStarterView = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setShowStarterView(false)); // after animation ends, set starterView to false
    };


    useEffect(() => {
        if (questions && questions.length > 0) {
            setQuestionText(decodeHTMLEntities(questions[questionNumber].question));;
            setCorrectAnswer(questions[questionNumber].correct_answer);
            setIncorrectAnswers(questions[questionNumber].incorrect_answers);
            const shuffledAnswers = shuffleAnswers(questions[questionNumber].correct_answer, questions[questionNumber].incorrect_answers);
            setAllAnswers(shuffledAnswers);
        }
    }, [questions]);


    useEffect(() => {
        animateSlide();
    }, [questionNumber]);

    useEffect(() => {
        if (selectedAnswer !== null) {
            dispatch(addQuestion({
                question: questionText,
                selectedAnswer: selectedAnswer,
                correctAnswer: correctAnswer
            }));
        }
    }, [selectedAnswer, correctAnswer, questionText, dispatch]);

    const handleAnswerPress = (answer) => {
        if (selectedAnswer) return; // prevent changing the answer once one has been selected
        setSelectedAnswer(answer);
        setSelectedAnswerIsCorrect(answer === correctAnswer);
        setIsAnswerSelected(true);
    };

    const handleNextQuestionPress = () => {
        if (questionNumber + 1 < questions.length && isAnswerSelected) {
            let question = questions[questionNumber + 1];
            setQuestionText(decodeHTMLEntities(question.question));
            setCorrectAnswer(question.correct_answer);
            setIncorrectAnswers(question.incorrect_answers);
            const shuffledAnswers = shuffleAnswers(question.correct_answer, question.incorrect_answers);
            setAllAnswers(shuffledAnswers);
            setSelectedAnswer(null);
            setIsAnswerSelected(false);
            setSelectedAnswerIsCorrect(false);
            setQuestionNumber(() => questionNumber + 1)
        }
        else if (questionNumber + 1 === questions.length) {
            nav.navigate('Results')
        }

    }


    return (
        <>
            {showStarterView ? (
                <Animated.View style={[quizStyles.starterView, { opacity: fadeAnim }]}>
                    {questions ? (
                        <View style={quizStyles.starterView}>
                            <Image source={questionMarkIcon} style={{ width: 100, height: 100 }}></Image>
                            <Text style={{ maxWidth: 300, fontSize: 16, fontWeight: 500, textAlign: 'center' }}>
                                Get ready for {allParameters.numOfQuestions} intriguing questions from the {allParameters.categoryName} category, {allParameters.type ? `each offering ${allParameters.type == 'boolean' ? 'Truth & False' : allParameters.type} choices and` : ''} set at {allParameters.difficulty} difficulty level.
                            </Text>
                            <Text style={{ fontSize: 15, top: 50, fontWeight: 500 }}>
                                Are you ready?
                            </Text>
                            <TouchableOpacity style={quizStyles.bringItOnButton} onPress={() => fadeOutStarterView()}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', fontWeight: 'bold' }}>Bring It On!</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={quizStyles.starterView}>
                            <Image source={sadEmoji} style={{ width: 80, height: 80, marginBottom: 20 }} borderRadius={20}></Image>
                            <Text style={{ maxWidth: 300, fontSize: 16, fontWeight: 500, textAlign: 'center' }}>
                                There was an error getting the questions for you.
                                Please try again with a different parameters.
                            </Text>
                            <TouchableOpacity style={[quizStyles.bringItOnButton, { backgroundColor: 'red' }]} onPress={() => nav.navigate('Home')}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', fontWeight: 'bold' }}>Start Over</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Animated.View>
            )
                :
                (
                    <>
                        {showExitView ? (
                            <View style={quizStyles.exitOuterView}>
                                <View style={quizStyles.exitView}>
                                    <Text style={{ fontWeight: 500 }}>Are you sure you want to exit?</Text>
                                    <View style={quizStyles.exitViewButtonsView}>
                                        <TouchableOpacity style={quizStyles.exitViewYesOrNoButton} onPress={()=> nav.navigate('Home')}>
                                            <Text>Yes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[quizStyles.exitViewYesOrNoButton, { backgroundColor: '#008080' }]} onPress={()=>setShowExitView(false)}>
                                            <Text>No</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            null
                        )}


                        <View style={[quizStyles.quizContainer, showExitView && { opacity: 0.5 }]} >
                            <View style={quizStyles.smallDetailsContainer}>
                                <TouchableOpacity style={{ padding: 10, backgroundColor: '#008080', borderRadius: 10, bottom: 50 }} onPress={() => setShowExitView(true)}>
                                    <Text>Exit</Text>
                                </TouchableOpacity>
                                {questions ? (<Text>{questionNumber + 1} of {questions.length}</Text>) : null}
                            </View>


                            <Animated.View style={[quizStyles.animatedContainer, { transform: [{ translateX: slideAnim }] }]}>
                                <View style={quizStyles.questionTextContainer}>
                                    <Text style={{ fontSize: 25, textAlign: 'center' }}>{questionText}</Text>
                                </View>
                                <View>
                                    {allAnswers ? allAnswers.map((answer, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleAnswerPress(answer)}
                                            style={[
                                                quizStyles.singleAnswerContainer,
                                                isAnswerSelected && (answer === correctAnswer ? quizStyles.correctAnswerContainer :
                                                    (answer === selectedAnswer ? quizStyles.incorrectAnswerContainer :
                                                        null))
                                            ]}
                                        >
                                            <Text style={{ fontSize: 25, textAlign: 'center' }}>{answer}</Text>
                                        </TouchableOpacity>
                                    )) : null}
                                </View>
                            </Animated.View>

                            {questions ? (
                                <View style={quizStyles.nextQuestionButtonContainer}>
                                    <TouchableOpacity
                                        style={[quizStyles.nextQuestionButton, !selectedAnswer && quizStyles.disabledNextQuestionButton]}
                                        onPress={() => handleNextQuestionPress()}
                                    >
                                        <Text>{questionNumber === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}

                        </View>
                    </>
                )}
        </>
    )
}

export default Quiz;


const quizStyles = StyleSheet.create({
    quizContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },
    smallDetailsContainer: {
        alignItems: 'center',
        top: 50
    },
    questionTextContainer: {
        borderWidth: 1,
        borderColor: 'darkgray',
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#FAFAFA',
    },
    animatedContainer: {
        height: '70%',
        justifyContent: 'space-around',
    },

    singleAnswerContainer: {
        backgroundColor: '#FF7F50',
        margin: 8,
        padding: 6,
        borderRadius: 20,
    },
    correctAnswerContainer: {
        backgroundColor: '#008080',
    },
    incorrectAnswerContainer: {
        backgroundColor: 'red',
    },
    nextQuestionButtonContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    nextQuestionButton: {
        backgroundColor: '#008080',
        borderRadius: 10,
        padding: 8,
        bottom: 30
    },
    disabledNextQuestionButton: {
        backgroundColor: 'darkgray'
    },
    starterView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    bringItOnButton: {
        backgroundColor: '#008080',
        padding: 20,
        width: 200,
        borderRadius: 50,
        marginVertical: 50
    },
    exitOuterView: {
        position: "absolute",
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        zIndex: 500
    },
    exitView:
    {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 300,
        height: 200,
        left: '50%',
        top: '50%',
        transform: [{ translateX: -150 }, { translateY: -100 }],
        zIndex: 300,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exitViewButtonsView: {
        flexDirection: 'row',
        gap: '100%'
    },
    exitViewYesOrNoButton: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f02b2b',
        borderRadius: 8
    }


})