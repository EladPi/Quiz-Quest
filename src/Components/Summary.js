import { useSelector } from "react-redux";
import { selectSummary } from "../Redux/Reducers/summarySlice";
import { View, ScrollView, Text, StyleSheet } from 'react-native';


const Summary = () => {
    const { questions } = useSelector(selectSummary);
    return (
        <>
            <ScrollView style={summaryStyles.mainScrollView}>
                {questions ?
                    questions.map((obj, index) => (
                        <View style={summaryStyles.mainContainer} key={index}>
                            <View style={summaryStyles.questionTextContainer}>
                                <Text>{obj.question}</Text>
                            </View>
                            <View style={summaryStyles.correctAnswerContainer}>
                                <Text style={summaryStyles.text}>{obj.correctAnswer}</Text>
                            </View>
                            <View style={[summaryStyles.incorrectAnswerContainer, obj.isCorrect && { backgroundColor: 'green' }]}>
                                <Text style={summaryStyles.text}>{obj.selectedAnswer}</Text>
                            </View>
                        </View>
                    )
                    ) : null}
            </ScrollView>
        </>
    )
}


const summaryStyles = StyleSheet.create({
    mainScrollView: {
        backgroundColor: '#FAFAFA',
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 80,
        borderRadius: 20,
    },
    mainContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'darkgray',
        margin: 10,
        height: 200,
    },
    questionTextContainer: {
        borderWidth: 1,
        padding: 5,
        borderColor: 'darkgray',
        padding: 10,
        textAlign: 'center'
    },
    correctAnswerContainer: {
        backgroundColor: 'green',
        width: '60%',
        padding: 5,
        borderRadius: 20
    },
    incorrectAnswerContainer: {
        backgroundColor: 'red',
        width: '60%',
        padding: 5,
        borderRadius: 20
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default Summary;