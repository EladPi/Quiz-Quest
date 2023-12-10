import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import startGameBackgroundTwo from '../Assets/startgame2-background.png';
import quickStartBackgroundThree from '../Assets/quickstart3.png';
import { quickStart } from '../Utils/quickStart';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAll } from '../Redux/Reducers/quizOptionsSlice';

const Home = ({ navigation }) => {
  const [allParams, setAllParams] = useState();
  const dispatch = useDispatch();
 

  const handleStartQuiz = () => {
    navigation.navigate('Category');
  };

  const handleQuickStart = async () => {
    setAllParams(await quickStart());
    if (allParams) {
      dispatch(setAll(allParams));
      navigation.navigate('Game');
    }
  }

  


  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Quiz Quest</Text>
      </View>
      <View style={{ top: 50 }}>
        <Text style={{ fontWeight: 'bold' }}>Choose how would you like to start!</Text>
      </View>
      <View style={styles.buttonsView}>

        <View style={styles.singleButtonView}>
          <ImageBackground source={startGameBackgroundTwo} borderRadius={20}>
            <TouchableOpacity style={styles.startGameButton } onPress={() => handleStartQuiz()}>
            </TouchableOpacity>
          </ImageBackground>
          <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 500 }}>
            Custom Game
          </Text>
        </View>

        <View style={styles.singleButtonView}>
          <ImageBackground source={quickStartBackgroundThree} borderRadius={20}>
            <TouchableOpacity style={styles.startGameButton} onPress={()=>handleQuickStart()}>
            </TouchableOpacity>
          </ImageBackground>
          <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 500 }}>
            Random Game
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{ fontWeight: 200 }}>Created By Elad, API from OpenTDB</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  titleView: {
    width: '100%',
    height: 150,
    backgroundColor: '#3EB489',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    top: 110,
    padding: 5,
    marginLeft: 10,

  },
  buttonsView: {
    flexDirection: 'row',
    gap: 20,

  },
  singleButtonView: {
    bottom: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.30,
    shadowRadius: 5,
  },
  startGameButton: {
    width: 180,
    height: 250,

  },
  footer: {
    marginVertical: 20
  },
});

export default Home;
