import React from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {  View, Image, SegmentedControlIOS } from 'react-native';
import { Container, Header, Content, Button, Text , Input, Form, Item, Icon, Segment } from 'native-base';
import { ExpoLinksView } from '@expo/samples';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        // this.firstpage = this.firstpage.bind(this);
        // this.secondpage = this.secondpage.bind(this);
        // this.thirdpage = this.thirdpage.bind(this);
        this.state = {
            data: [],
            selectedIndex: 0,
            type: 'movie',
            search: '',
            isLoading: false,
            page: 1,
            firstpageactive: true,
            secondpageactive: false,
            thirdpageactive: false,
            noData: false,
        }
    }
        static navigationOptions = {
            title: 'Search',
        };


    movies = () =>  <FlatList data = {this.state.data} renderItem={ ({item}) => <View>
        <Text>{item.original_title}</Text>
        <Image source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
               resizeMode='cover' style={{width: 100, height: 180,}}/>
        <Text>{item.overview}</Text>
    </View> }/>;

    searchButtonPressed = () => {
        if (this.state.search.length) {
            if (this.state.type.length)
            {this._getMovies()}
            {this.movies()}
        } else {
            alert("Fill up the search bar");
        }
    };
        render() {
            const page = this.state.page;
            let shows = null;
            if (page == 1 ){
                shows = <Text style={styles.title}> Movie results for {this.state.search} </Text>;
                // {this._getMovies()}
            }else if (page == 2) {
                shows = <Text style={styles.titleSearch}> Actor / Actress that contain the name of  {this.state.search}  </Text>
                // {this._getMovies()}
            }else if (page == 3) {
                shows = <Text style={styles.title}> TV Show results for {this.state.search} </Text>
                // {this._getMovies()}
            }

            const movies =  <FlatList data = {this.state.data} renderItem={ ({item}) => <View style={{justifyContent: 'center', display: 'flex',}}>
                <View style={{flex: 1}}>
                    <Image source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
                           resizeMode='cover' style={styles.smallside}/>
                </View>
                <View style={{flex: 1}}>
                    <Text style ={{fontSize: 24, paddingHorizontal: 20,}}>{item.original_title}</Text>
                    <Text style={styles.overview}>{item.overview}</Text>
                </View>
            </View> }/>;

            function renderIf(condition1,condition2, content) {
                if (condition1, condition2) {
                    return content;
                } else {
                    return null;
                }
            }
            let actor =
                <FlatList data = {this.state.data} renderItem={ ({item}) => <View>
                            <Text style={styles.title}>{item.name}</Text>
                            <Image source={{uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`}}
                                   resizeMode='cover' style={{width: 300, height: 500, alignSelf: 'center',}}/>
                            <Text>{item.known_for.original_title}</Text>
                        </View>
                    }/>;

            // console.log(this.state.data);
            return (
                <View style={styles.container}>
                    <Header searchBar rounded hasSegment>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" onChangeText={text => this.setState({ search: text })}
                                   value={this.state.search}/>
                        </Item>
                        <Button transparent onPress={() => this.searchButtonPressed()}>
                            <Text>Search</Text>
                        </Button>
                    </Header>

                    <Content>
                        <Segment>
                            <Button first active={this.state.firstpageactive}
                                    onPress= {()=> {this.setState({type:'movie', page:1,
                                        firstpageactive:true,
                                        secondpageactive:false,
                                        thirdpageactive:false,});}} >
                                <Text>Movies</Text>
                            </Button>
                            <Button active={this.state.secondpageactive}
                                    onPress= {()=> {this.setState({type:'person', page:2,
                                        firstpageactive:false,
                                        secondpageactive:true,
                                        thirdpageactive:false,}); }}>
                                <Text>People</Text>
                            </Button>
                            <Button last active={this.state.thirdpageactive}
                                    onPress= {()=> {this.setState({type:'tv', page:3,
                                        firstpageactive:false,
                                        secondpageactive:false,
                                        thirdpageactive:true,});}}>
                                <Text>TV Show</Text>
                            </Button>
                        </Segment>
                        {shows}
                        {/*{renderIf(this.state.noData, <Text style={{ textAlign: "center" }}>No data found.</Text>)}*/}
                        {renderIf(this.state.data, this.state.type === 'movie', movies)}
                        {renderIf(this.state.data.length, this.state.type === 'tv', movies)}
                        {renderIf(this.state.data.length, this.state.type === 'person', actor)}
                        {/*{movies}*/}
                        {/*{actor}*/}
                    </Content>

                </View>
            );
        }

        _getMovies = async () => {
            const type = this.state.type;
            const search = this.state.search;
            const URL = `https://api.themoviedb.org/3/search/${type}?api_key=8367b1854dccedcfc9001204de735470&language=en-US&query=${search}&include_adult=false`
            await fetch(URL)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({data: responseJson.results});
                    console.log(this.state.type);
                    console.log(this.state.search);
                    console.log(URL);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
    title:{
        fontSize: 24,
        fontWeight: "600",
        alignSelf: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 15,
    },
    titleSearch:{
        fontSize: 20,
        fontWeight: "600",
        alignSelf: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 15,
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
    smallside:{
        height:180,
        width: 100,
        alignSelf: 'center',
    },
});
