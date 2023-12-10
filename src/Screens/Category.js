import { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchCategories } from '../API/fetchCategories';
import { useDispatch } from 'react-redux';
import { setCategory, setCategoryName } from '../Redux/Reducers/quizOptionsSlice';
import { DotIndicator } from 'react-native-indicators';


const CategoryScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName , setSelectedCategoryName] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  const handleContinue = () => {
    navigation.navigate('Difficulty')
    dispatch(setCategoryName(selectedCategoryName));
    dispatch(setCategory(selectedCategory));
  };

  const handleSelectCategory = (id , name) =>{
    setSelectedCategory(id);
    setSelectedCategoryName(name);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.startOverButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.startOverButtonText}>Start Over</Text>
        </TouchableOpacity>
        {isLoading ? (
          <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid red' }}>
              <DotIndicator size={18} color='#008080' animationDuration={500} count={3} />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.selectCategoryText}>Select a Category</Text>
            <ScrollView style={styles.scrollView}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => handleSelectCategory(category.id, category.name)}
                >
                  <Text style={styles.categoryText}>{category.name}</Text>
                  <View style={selectedCategory === category.id ? styles.radioSelected : styles.radio} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )
        }

        {selectedCategory ? (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => handleContinue()}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3EB489',
  },
  scrollView: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 100,
    marginBottom: 115,
    paddingHorizontal:20,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between'
  },
  categoryText: {
    flex: 1,
    fontSize: 16,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#303030',
  },
  radioSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FF7F50',
  },
  button: {
    backgroundColor: '#008080',
    height: 50,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 50,
    left: 50
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startOverButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 6,
    zIndex: 999,
    backgroundColor: '#008080',
    borderRadius: 6
  },
  startOverButtonText: {
    color: '#000'
  },
  selectCategoryText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    top: 90,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CategoryScreen;