import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { colors } from '../constants/colors';

const InlineDateTimePicker = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  let moment = require('moment');

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const hideDateTimePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (selectedDateTime) => {
    setDateTime(selectedDateTime);
    hideDateTimePicker();
  };

  const handleCancel = () => {
    hideDateTimePicker();
  };

  return (
    <View style={{ width: 200 }}>
      <Button
        title="Select Date & Time of delivery"
        onPress={showDateTimePicker}
      />
      <Text
        style={{
          fontFamily: 'Overlock',
          fontWeight: 700,
          fontSize: 17,
          lineHeight: 25,
          marginVertical: 5,
          color: colors.rust,
        }}
      >
        {moment(dateTime).format('dddd, MMMM Do YYYY, h:mm A')}
      </Text>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        date={dateTime}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        style={{ backgroundColor: 'red' }}
      />
    </View>
  );
};

export default InlineDateTimePicker;
