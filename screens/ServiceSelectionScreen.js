import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const ServiceSelectionScreen = ({ route, navigation }) => {
  const { hospital } = route.params; // Receive hospital info from previous screen

  const [services, setServices] = useState([]);

  // Fetch available services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services'); // Backend URL
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleSelectService = (service) => {
    navigation.navigate('Booking', { hospital, service }); // Pass hospital and service to booking screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Service for {hospital.name}</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button title="Book Appointment" onPress={() => handleSelectService(item)} />
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

export default ServiceSelectionScreen;
