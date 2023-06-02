import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fcfcf7',
    flex: 1,
  },

  plusButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderBottomWidth: 10,
    alignSelf: 'center',
  },
  
  innerPlusButton: {
    backgroundColor: '#e8e8e6',
    borderRadius: 20,
    borderColor: '#fcfcf7',
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderWidth: 10,
    textAlign: 'center',
  },
  header: {
    borderRadius: 30,
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e8e8e6',
  },
  headerButton: {
    marginVertical: '1%',
    justifyContent: 'center',
  },
  searchText: {
    textAlign: 'left',
    fontSize: 17,
    marginVertical: '3.5%',
  },
  body: {
    flex: 1,
    backgroundColor: '#00000070',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: '10%',
    borderRadius: 10,
    borderWidth: 2,
  },
  closeButton: {
    marginLeft: '45%',
  },
  headings: {
    marginHorizontal: 15,
    marginVertical: 7,
  },
  listLayout: {
    borderColor: '#918f3f',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  gridLayout: {
    margin: '2.5%',
    borderColor: '#918f3f',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '45%',
  },

});

export default styles;
