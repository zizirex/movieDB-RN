import React from 'react';
import {
    FlatList,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';

import { MonoText } from '../components/StyledText';

export default class NowPlaying extends React.Component {

  state ={
    data: [],
      poster : null,
  }
  static navigationOptions = {
    // header: null,
      title: 'Now Playing'

  };
  componentDidMount () {
    let API = "https://api.themoviedb.org/3/movie/now_playing?api_key=8367b1854dccedcfc9001204de735470";
      fetch(API).then ((response) => response.json())
          .then((results) => {
              this.setState({data: results.results,
              })
          })
    .catch((error) => {
      console.log(error)
    })
}

  render() {

      const movies =  <FlatList data = {this.state.data} renderItem={ ({item}) => <View style={styles.contentContainer}>

          <Image source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
                 resizeMode='cover' style={{width: 300, height: 500, alignSelf: 'center'}}/>
          <Text style={styles.title} >{item.original_title}</Text>
          <Text style={styles.other}>{item.popularity}</Text>
          <Text style={styles.other}>{item.release_date}</Text>
          <Text style={styles.overview}>{item.overview}</Text>
      </View> } keyExtractor={(item, index) => index.toString()}/>;
      // console.log(this.state.data);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
         <View>

             {/*<Text>Now Playing</Text>*/}
             {movies}
         </View>
        </ScrollView>

       
      </View>
    );
  }

}

const styles = StyleSheet.create({
    title:{
      fontSize: 40,
        fontWeight: "600",
        alignSelf: 'center',
        paddingHorizontal: 15,
    },
    overview:{
      paddingHorizontal: 20,
        paddingVertical:10,
    },
    other:{
      paddingHorizontal: 20,
        paddingVertical:10,
        textAlign: 'center'
    },


  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
    poster: {
    alignSelf: 'center'
    }
});
