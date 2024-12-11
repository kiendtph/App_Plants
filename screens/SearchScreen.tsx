import { Text } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, fetchTodos1, fetchTodos2 } from "../src/redux/actions/todoAction";
import { useTheme } from "../component/Theme";



const SearchScreen = ({ navigation }: any) => {
  const { themeStyles } = useTheme();
  const dispatch = useDispatch();
  const plants = useSelector(state => state.listTodoStore.plants || []);
  const plant_pots = useSelector(state => state.listTodoStore.plant_pots || []);
  const accessory = useSelector(state => state.listTodoStore.accessory || []);
  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchTodos1());
    dispatch(fetchTodos2());
  }, [dispatch])

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setSearchResults([]);

    } else {
      const results = [
        ...plants.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())),
        ...plant_pots.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())),
        ...accessory.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
      ];
      setSearchResults(results);
    }
  };

  const saveSearch = () => {
    if (searchText.trim() !== "" && !recentSearches.includes(searchText)) {
      setRecentSearches((prev) => [searchText, ...prev]);
    }
    setSearchText("");
  };
  const removeRecentSearch = (text) => {
    setRecentSearches((prev) => prev.filter((item) => item !== text));
  }
  const renderProduct = ({ item }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <TouchableOpacity onPress={() => {
        navigation.navigate('DetailProductScreen', { item })
      }}>
        <Image style={{ width: 180, height: 180, borderRadius: 10 }} source={{ uri: item.image }} />
        <Text style={[{ fontSize: 16, fontWeight: '500' },{color:themeStyles.text}]}>{item.name}</Text>
        {item.features && <Text style={[{ color: '#7D7B7B', fontSize: 14 },{color:themeStyles.text}]}>{item.features}</Text>}
        <Text style={[{ color: '#007537', fontSize: 14 },{color:themeStyles.text}]}>{item.price} VNĐ</Text>
        <Text></Text>
      </TouchableOpacity>
    </View>
  );
  return (
    
      <View style={[styles.Container, { backgroundColor: themeStyles.background }]}>

        <Text style={[styles.Title,{color:themeStyles.text}]}>TÌM KIẾM</Text>
        <View style={{ width: 20 }} />

        <View style={styles.search}>
          <View style={styles.searchInput}>
            <Image style={styles.searchIcon} source={require('../images/search.png')} />
            <TextInput
              style={styles.textInput}
              placeholder="Tìm kiếm"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={handleSearch}
              onSubmitEditing={saveSearch}
            />
          </View>
          <View style={styles.line} />
          {searchText === "" && recentSearches.length > 0 && (
            <View style={styles.historySearch}>
              <Text style={{ color: '#000000', fontSize: 16 }}>Tìm kiếm gần đây</Text>
              {recentSearches.map((text, index) => (
                <View key={index} style={styles.SubSearch}>
                  <View style={{ flexDirection: 'row', gap: 20 }}>
                    <Image source={require('../images/clock.png')} />
                    <TouchableOpacity onPress={() => handleSearch(text)}>
                      <Text style={styles.historyText}>{text}</Text>

                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={() => removeRecentSearch(text)}>
                    <Image source={require('../images/quit.png')} style={styles.removeIcon} />
                  </TouchableOpacity>
                </View>
              ))

              }
            </View>
          )

          }
        </View>
        <FlatList
          data={searchText ? searchResults : [...plants, ...plant_pots, ...accessory]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Title: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10
  },
  search: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#f9f9f9',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#999',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  line: {
    height: 1,
    backgroundColor: '#221F1F',
    marginTop: 10,
  },
  historySearch: {
    marginTop: 30
  },
  SubSearch: {
    margin: 1,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  historyText: {
    fontSize: 16,
  },
  removeIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },
  productCard: {
    alignItems: 'center',
    margin: 10,
    flex: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 12,
    color: '#007537',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
