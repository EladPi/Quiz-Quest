import { View } from "react-native";
import Results from "../Components/Results";

const ResultsScreen = () =>{
    return(
        <>
            <View style={{backgroundColor:'#3EB489' , flex:1}}>
                <Results />
            </View>
        </>
    )
}

export default ResultsScreen;