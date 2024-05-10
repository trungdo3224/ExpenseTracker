import { View, StyleSheet, Text, Alert } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  defaultValues,
  submitButtonLabel,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: !!defaultValues,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: !!defaultValues,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: !!defaultValues,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const { amount, date, description } = expenseData;

    const isAmountValid = amount > 0 && !isNaN(amount);
    const isDateValid = date.toString() !== 'Invalid Date';
    const isDescriptionValid = description.trim().length > 0;
    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setInputValues((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: isAmountValid },
          date: { value: currInputs.date.value, isValid: isDateValid },
          description: {
            value: currInputs.description.value,
            isValid: isDescriptionValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.inputsRowItem}
          label='Amount'
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.inputsRowItem}
          label='Date'
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: 'yyyy-mm-dd',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your entered data.</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputsRowItem: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
