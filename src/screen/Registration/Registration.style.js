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
  textInnerView:{
    flexDirection: 'row',
  },
  textIcon: {
    marginTop: 35,
  },
  textInput: {
    color: '#00000090',
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
  // error: {
  //   color: '#D24D57',
  //   marginLeft: 40,
  // },
  newAccountButton: {
    margin: 20,
  },
  newAccountButtonText:{
    textAlign: 'center',
    fontSize: 15,
  },
});

export default styles;
