import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNumOfQuestions } from "../Redux/Reducers/quizOptionsSlice";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from "./Category";
import Slider from "@react-native-community/slider";
import { resetQuiz } from "../Redux/Reducers/summarySlice";
import { selectAll } from "../Redux/Reducers/quizOptionsSlice";
import { fetchNumberOfQuestionsForCategory } from "../API/API";



const NumOfQuestionsScreen = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const [maximumNumber , setMaximumNumber] = useState(0);
    const {category, difficulty} = useSelector(selectAll);

    const dispatch = useDispatch();

    const handleContinue = () => {
        if (selectedOption === 0) {
            return;
        }
        navigation.navigate('Game');
        dispatch(setNumOfQuestions(selectedOption));
        dispatch(resetQuiz());
    }

    useEffect(() => {
        const load = async () => {
          try {
            const fetchedNumber = await fetchNumberOfQuestionsForCategory(category,difficulty);
            setMaximumNumber(fetchedNumber)
          } catch (error) {
            console.error('Failed to number of categories:', error);
          }
        };
    
        load();
      }, []);

    return (
        <>
            <View style={numOfQuestionsStyle.container}>
                <TouchableOpacity style={styles.startOverButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.startOverButtonText}>Start Over</Text>
                </TouchableOpacity>
                <Text style={numOfQuestionsStyle.text}>Select Number Of Questions</Text>
                <Slider
                    style={numOfQuestionsStyle.slider}
                    minimumValue={0}
                    maximumValue={maximumNumber > 50? 50 : maximumNumber}
                    step={5}
                    value={selectedOption}
                    onValueChange={value => setSelectedOption(value)}
                    thumbTintColor="#FF7F50"
                    minimumTrackTintColor="#008080"
                />
                <Text style={[numOfQuestionsStyle.text, { fontSize: 30 }]}>{selectedOption}</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={selectedOption != 0 ? styles.button : numOfQuestionsStyle.disabledButton}
                    onPress={() => handleContinue()}
                    disabled={selectedOption === 0}
                >
                    <Text style={styles.buttonText}>Start Game!</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default NumOfQuestionsScreen;

const numOfQuestionsStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#3EB489'
    },
    slider: {
        width: 500,
        transform: [{ rotate: '-90deg' }]
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    disabledButton: {
        backgroundColor: 'darkgray',
        height: 50,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 50,
        left: 50
    }
});