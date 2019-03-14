import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {TextInput, View,Image, TabBarIOS, SegmentedControlIOS,
    ScrollView, StyleSheet, Platform, FlatList} from 'react-native';
import { Container, Header, Content, Button, Text , Input, Form, Item, Icon, Segment } from 'native-base';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import axios from 'axios'

export default class Lists extends React.Component {
    constructor(props) {
        super(props);
        // this.firstpage=this.firstpage.bind(this);
        // this.secondpage=this.secondpage.bind(this);
        // this.thirdpage=this.thirdpage.bind(this);
        this.state ={
            data: [],
            type: 'popular',
            selectedIndex: 0,
            selectedTab: null,
            isLoading: false,
            page:1,
            firstpageactive:true,
            secondpageactive:false,
            thirdpageactive:false,

        };
    }


  static navigationOptions = {
    title: 'List',
  };
    componentWillMount () {
        this._getMovies();
    }




  render() {

      const page = this.state.page;
      let shows = null;
      if (page == 1 ){
          shows = <Text> Popular Movies </Text>
          {this._getMovies()}
      }else if (page == 2) {
          shows = <Text> Top Rated Movies </Text>
          {this._getMovies()}
      }else if (page == 3) {
          shows = <Text> Upcoming Movies </Text>
          {this._getMovies()}
      }



      const movies =  <FlatList data = {this.state.data} renderItem={ ({item}) => <View>
                  <Text>{item.original_title}</Text>
                  <Image source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
                         resizeMode='cover' style={{width: 100, height: 180,}}/>
                  <Text>{item.overview}</Text>
              </View> }/>;




    return <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
              <Header>
              <Segment>
                  <Button first
                      active={this.state.firstpageactive}
                          onPress= {()=>{this.setState({type:'popular', page:1,
                                      firstpageactive:true,
                                      secondpageactive:false,
                                      thirdpageactive:false,}); }}>
                      <Text>Popular</Text>
                  </Button>
                  <Button
                      active={this.state.secondpageactive}
                          onPress= {()=>{this.setState({type:'top_rated', page:2,
                                      firstpageactive:false,
                                      secondpageactive:true,
                                      thirdpageactive:false,}); }}>
                      <Text>Top Rated</Text>
                  </Button>
                  <Button last
                          active={this.state.thirdpageactive}
                          onPress= {()=> {this.setState({type:'upcoming', page:3,
                                      firstpageactive:false,
                                      secondpageactive:false,
                                      thirdpageactive:true,}); }}>
                      <Text>Upcoming</Text>
                  </Button>
              </Segment>
              </Header>
              <Content padder>
                  {shows}
                  {movies}
              </Content>
      </View>
    </ScrollView>;


  }
    // firstpage(){
    //     this.setState({
    //         page:1,
    //         firstpageactive:true,
    //         secondpageactive:false,
    //         thirdpageactive:false,
    //         type: 'popular', });
    //     this._getMovies()
    // }
    //
    // secondpage(){
    //     this.setState({page:2,
    //         firstpageactive:false,
    //         secondpageactive:true,
    //         thirdpageactive:false,
    //         type: 'top_rated',})
    //     this._getMovies()
    // }
    // thirdpage(){
    //     this.setState({page:3,
    //         firstpageactive:false,
    //         secondpageactive:false,
    //         thirdpageactive:true,
    //         type: 'upcoming',});
    //     this._getMovies()
    // }

  _getMovies =  () =>{
        const type = this.state.type;
  fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=8367b1854dccedcfc9001204de735470`)
.then((response) => response.json())
.then((responseJson) => {
    this.setState({data: responseJson.results});

})
.catch((error) => {
    console.error(error);
});
}



}
const styles = StyleSheet.create({
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
});
