import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  headingText: {
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    color: '#000000',
  },
  textView: {
    marginHorizontal: 20,
  },
  textInnerView: {
    flexDirection: 'row',
  },
  textIcon: {
    marginTop: 35,
  },
  textInput: {
    color: '#00000095',
    fontSize: 17,
    borderBottomColor: '#F2F1EF',
    borderBottomWidth: 2,
    margin: 20,
    marginLeft: 10,
    width: '85%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // button: {
  //   borderColor: '#F2F1EF',
  //   borderWidth: 2,
  //   margin: '90%',
  //   borderRadius: 20,
  //   backgroundColor: '#22A7F0',
  // },
  // error: {
  //   color: '#D24D57',
  //   marginLeft: 40,
  // },
  googleButton: {
    margin: 10,
    marginHorizontal: 30,
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
  },
  googleButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  newAccountButton: {
    marginHorizontal: 100,
    marginVertical: 70,
  },
  newAccountButtonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  forgetPasswordButton: {
    alignItems: 'flex-end',
    marginEnd: 30,
  },
  forgetPasswordButtonText: {
    color: '#22A7F0',
    fontWeight: 600,
    paddingRight: 5,
  },
});

export default styles;
