import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { selectSummary } from '../Redux/Reducers/summarySlice';
import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';


const Results = () => {
    const nav = useNavigation();
    const slideAnimOne = useRef(new Animated.Value(500)).current;
    const slideAnimTwo = useRef(new Animated.Value(500)).current;
    const slideAnimThree = useRef(new Animated.Value(500)).current;
    const slideAnimFour = useRef(new Animated.Value(500)).current;
    const {
        questions,
        totalQuestions,
        numOfCorrectQuestions,
        numOfIncorrectQuestions
    } = useSelector(selectSummary);



    const animateSlideOne = () => {
        slideAnimOne.setValue(500);

        Animated.spring(slideAnimOne, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const animateSlideTwo = () => {
        slideAnimTwo.setValue(500);

        Animated.spring(slideAnimTwo, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const animateSlideThree = () => {
        slideAnimThree.setValue(500);

        Animated.spring(slideAnimThree, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };
    
    const animateSlideFour = () => {
        slideAnimFour.setValue(500);

        Animated.spring(slideAnimFour, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        setTimeout(animateSlideOne, 500);
        setTimeout(animateSlideTwo, 1000);
        setTimeout(animateSlideThree, 1500);
        setTimeout(animateSlideFour, 2500);
    }, [])

    return (
        <>
            <View style={resultsStyles
                .mainContainer}>

                <Animated.View style={[resultsStyles.dataContainer, { transform: [{ translateX: slideAnimOne }] }]}>
                    <Text style={resultsStyles
                        .textContainer}>Total Questions:</Text>
                    <Text style={resultsStyles
                        .numberContainer}>{totalQuestions}</Text>
                </Animated.View>

                <Animated.View style={[resultsStyles
                    .dataContainer, { borderColor: 'green', transform: [{ translateX: slideAnimTwo }] }]}>
                    <Text style={resultsStyles
                        .textContainer}>Correct Answers:</Text>
                    <Text style={resultsStyles
                        .numberContainer}>{numOfCorrectQuestions}</Text>
                </Animated.View>

                <Animated.View style={[resultsStyles
                    .dataContainer, { borderColor: 'red', transform: [{ translateX: slideAnimThree }] }]}>
                    <Text style={resultsStyles
                        .textContainer}>Incorrect Answers:</Text>
                    <Text style={resultsStyles
                        .numberContainer}>{numOfIncorrectQuestions}</Text>
                </Animated.View>

                <Animated.View style={{transform: [{ translateX: slideAnimFour }]}}>
                    <TouchableOpacity onPress={() => nav.navigate('SeeSummary')} style={[resultsStyles.button, { backgroundColor: '#FF7F50' }]}>
                        <Text style={{textAlign:'center'}}>See Summary</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => nav.navigate('Category')} style={resultsStyles.button}>
                        <Text style={{textAlign:'center'}}>Reset Quiz</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </>
    )
}

const resultsStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FAFAFA',
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 60,
        borderRadius: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dataContainer: {
        borderWidth: 2,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#303030'
    },
    textContainer: {
        marginBottom: 10,
        fontWeight: 'bold'
    },
    numberContainer: {
        fontSize: 40
    },
    button: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#008080',
        marginBottom:30
    }
})

export default Results;