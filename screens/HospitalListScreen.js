import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const hospitals = [
  { id: '1', name: 'City Hospital' },
  { id: '2', name: 'HealthCare Medical Center' },
  { id: '3', name: 'Sunrise Hospital' },
  { id: '4', name: 'Green Valley Hospital' },
];

const HospitalListScreen = ({ navigation }) => {
  const [hospitalList] = useState(hospitals);

  const handleSelectHospital = (hospital) => {
    navigation.navigate('Services', { hospital }); // Pass selected hospital to next screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Hospital</Text>
      <FlatList
        data={hospitalList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button title="View Services" onPress={() => handleSelectHospital(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { marginVertical: 10, padding: 15, borderWidth: 1, borderRadius: 5 },
});

export default HospitalListScreen;
