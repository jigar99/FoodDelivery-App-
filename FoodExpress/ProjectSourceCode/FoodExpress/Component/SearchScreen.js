import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "./SearchBar";
import useResults from "../hooks/useResults"
import ResultsList from "./ResultsList";

const SearchScreen = ({navigation}) => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();
  console.log(results);

  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.price === price;
      console.log(result);
    });
  };
  return (
    <View style={styles.background}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList
          results={filterResultsByPrice("$")}
          title="Cost Effective"
          navigation={navigation} 
        />
        <ResultsList results={filterResultsByPrice("$$")} title="Bit Pricier" navigation={navigation} />
        <ResultsList results={filterResultsByPrice("$$")} title="Big Spender" navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default SearchScreen;
