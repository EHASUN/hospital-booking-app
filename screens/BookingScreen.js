import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const BookingScreen = ({ route }) => {
  const { hospital, service } = route.params; // Receive hospital and service info

  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const bookingSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    date: Yup.string().required('Date is required'),
  });

  const handleBooking = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospital: hospital.name,
          service: service.name,
          name: values.name,
          date: values.date,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setAppointmentDetails(data); // Store the booking details if successful
        alert('Appointment booked successfully!');
      } else {
        alert(data.message); // Show error message if any
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book an Appointment</Text>
      <Text>Hospital: {hospital.name}</Text>
      <Text>Service: {service.name}</Text>

      <Formik
        initialValues={{ name: '', date: '' }}
        validationSchema={bookingSchema}
        onSubmit={handleBooking}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text>Date (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('date')}
              onBlur={handleBlur('date')}
              value={values.date}
            />
            {errors.date && touched.date && <Text style={styles.error}>{errors.date}</Text>}

            <Button onPress={handleSubmit} title="Confirm Booking" />
          </View>
        )}
      </Formik>

      {appointmentDetails && (
        <View style={styles.details}>
          <Text>Booking Details:</Text>
          <Text>Name: {appointmentDetails.name}</Text>
          <Text>Date: {appointmentDetails.date}</Text>
          <Text>Hospital: {hospital.name}</Text>
          <Text>Service: {service.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  error: { color: 'red', fontSize: 12 },
  details: { marginTop: 20 },
});

export default BookingScreen;
