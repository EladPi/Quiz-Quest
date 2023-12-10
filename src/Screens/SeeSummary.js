import { TouchableOpacity } from "react-native";
import Summary from "../Components/Summary";
import { View, Text, StyleSheet } from "react-native";

const SeeSummaryScreen = ({ navigation }) => {
    return (
        <>
            <View style={{backgroundColor:'#3EB489' , flex:1}}>
                <TouchableOpacity style={seeSummaryStyles.goBackButton} onPress={()=> navigation.navigate('Results')}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
                <Summary />
            </View>
        </>
    )
}

const seeSummaryStyles = StyleSheet.create({
    goBackButton: {
        top: 60,
        left: 20,
        padding: 9,
        zIndex: 999,
        backgroundColor: '#008080',
        borderRadius: 6,
        width:72
      },
})

export default SeeSummaryScreen;