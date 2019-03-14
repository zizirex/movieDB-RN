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
            type: 'movies',
            search: 'marvel',
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
        componentDidMount () {
            if (this.state.data.length){
            this._getMovies()
            }
            else {
                return null
            }
        }



    searchButtonPressed = () => {
        if (this.state.search.length) {
            if (this.state.type.length)
            {this._getMovies()}
        } else {
            alert("Fill up the search bar");
        }
    };
        render() {
            const page = this.state.page;
            let shows = null;
            if (page == 1 ){
                shows = <Text> Movie results for {this.state.search} </Text>;
                {this._getMovies()}
            }else if (page == 2) {
                shows = <Text> {this.state.search} is in the following movies </Text>
                {this._getMovies()}
            }else if (page == 3) {
                shows = <Text> TV Show results for {this.state.search} </Text>
                {this._getMovies()}
            }

            // if (this.state.data.length) {
            //     this.setState({ noData: false });
            //     this.setState({ data: responseJson.results });
            // } else {
            //     this.setState({ data: [] });
            //     this.setState({ noData: true });
            // }
            // ;
            function renderIf(condition1,condition2, content) {
                if (condition1, condition2) {
                    return content;
                } else {
                    return null;
                }
            }
            const movies =  <FlatList data = {this.state.data} renderItem={ ({item}) => <View>
                <Text>{item.original_title}</Text>
                <Image source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}}
                       resizeMode='cover' style={{width: 100, height: 180,}}/>
                <Text>{item.overview}</Text>
            </View> }/>;

            let actor =
                <FlatList data = {this.state.data} renderItem={ ({item}) => <View>
                            <Text>{item.name}</Text>
                            <Image source={{uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`}}
                                   resizeMode='cover' style={{width: 300, height: 500,}}/>
                            <Text>{item.popularity}</Text>
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
                                    onPress= {()=> {this.setState({type:'movies', page:1,
                                        firstpageactive:true,
                                        secondpageactive:false,
                                        thirdpageactive:false,});}} >
                                <Text>Movies</Text>
                            </Button>
                            <Button active={this.state.secondpageactive}
                                    onPress= {()=> {this.setState({type:'people', page:2,
                                        firstpageactive:false,
                                        secondpageactive:true,
                                        thirdpageactive:false,}); }}>
                                <Text>People</Text>
                            </Button>
                            <Button last active={this.state.thirdpageactive}
                                    onPress= {()=> {this.setState({type:'tv_show', page:3,
                                        firstpageactive:false,
                                        secondpageactive:false,
                                        thirdpageactive:true,});}}>
                                <Text>TV Show</Text>
                            </Button>
                        </Segment>
                        {shows}
                        {/*{renderIf(this.state.noData, <Text style={{ textAlign: "center" }}>No data found.</Text>)}*/}
                        {/*{renderIf(this.state.data, this.state.type === 'movies', movies)}*/}
                        {/*{renderIf(this.state.data.length, this.state.type === 'tv_show', movies)}*/}
                        {/*{renderIf(this.state.data.length, this.state.type === 'people', actor)}*/}
                        {movies}
                    </Content>

                </View>
            );
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

        _getMovies = async () => {
            const type = this.state.type;
            const search = this.state.search;
            const URL = `https://api.themoviedb.org/3/search/${type}?api_key=8367b1854dccedcfc9001204de735470&language=en-US&query=${search}&include_adult=false`
            fetch(URL)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({data: responseJson.results});
                    console.log(this.state.type);
                    console.log(this.state.search);;
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
});
