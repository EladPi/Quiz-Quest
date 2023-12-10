import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDifficulty } from "../Redux/Reducers/quizOptionsSlice";
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { styles } from "./Category";


const DifficultyScreen = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState();
    const options = ['Easy', 'Medium', 'Hard'];
    const dispatch = useDispatch();

    const handleOptionPress = () => {
        navigation.navigate('Type')
        dispatch(setDifficulty(selectedOption.toLowerCase()));
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.startOverButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.startOverButtonText}>Start Over</Text>
                </TouchableOpacity>
                <Text style={styles.selectCategoryText}>Select Difficulty</Text>
                <ScrollView style={styles.scrollView}>
                    {options.map(option => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => setSelectedOption(option)}
                            style={styles.categoryItem}
                        >
                            <Text>{option}</Text>
                            <View style={selectedOption === option ? styles.radioSelected : styles.radio} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {selectedOption ? (
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => handleOptionPress()}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        </>
    )
}

export default DifficultyScreen;