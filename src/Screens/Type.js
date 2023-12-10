import { useState } from "react";
import { useDispatch } from "react-redux";
import { setType } from "../Redux/Reducers/quizOptionsSlice";
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { styles } from "./Category";


const TypeScreen = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState();
    const options = {
        'any': { name: 'Any Type' },
        'boolean': { name: 'True / False' },
        'multiple': { name: 'Multiple Choice' }
    }
    const dispatch = useDispatch();

    const handleOptionPress = () => {
        navigation.navigate('NumOfQuestions')
        if(selectedOption !=='any'){
            dispatch(setType(selectedOption.toLowerCase()));
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.startOverButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.startOverButtonText}>Start Over</Text>
                </TouchableOpacity>
                <Text style={styles.selectCategoryText}>Type of Questions</Text>
                <ScrollView style={styles.scrollView}>
                    {Object.keys(options).map(optionKey => (
                        <TouchableOpacity
                            key={optionKey}
                            onPress={() => setSelectedOption(optionKey)}
                            style={styles.categoryItem}
                        >
                            <Text>{options[optionKey].name}</Text>
                            <View style={selectedOption === optionKey ? styles.radioSelected : styles.radio} />
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

export default TypeScreen;