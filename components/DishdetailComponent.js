import React ,{ Component} from "react";
import {Text,
    View,
    ScrollView,
    FlatList,
    Modal,
    StyleSheet,
    Button,PanResponder,Alert}  from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from "../redux/ActionCreators";
import { Card, Icon, Input ,Rating } from "react-native-elements";
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
})



function RenderDish(props){
    const dish = props.dish;

    handleViewRef = ref => this.view = ref

    const recognizeDrag = ({ moveX, moveY, dx, dy })=>{
        if ( dx < -200 )
            return 'righToLeft';
        else if(dx>200)
            return 'leftToRight';
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder:(e,gestureState)=>{
            return true;
        },
        onPanResponderGrant:() => {
            this.view.rubberBand(1000)
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if(recognizeDrag(gestureState) == 'righToLeft'){
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            
            }
            else if(recognizeDrag(gestureState) == 'leftToRight'){
                props.openCommentForm();
            }
            return true;
        }
    });

    if(dish){
        return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}>
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#0000ff'
                            onPress={() => props.onPressAddComment()}
                        />  
                    </View> 
                </Card>
            </Animatable.View>
        );
    }
    else{
        return(<View></View>)
    }
}

function RenderComments(props){
    const comments = props.comments;

    const renderCommentItem =({item,index}) => {
        return(
            <View key ={index} style = {{margin:10}}>
                 <Rating
                    imageSize={15}
                    readonly
                    startingValue={item.rating}
                    style={{ alignItems: "flex-start" }}
                    />
                <Text style ={{fontSize:14}}>{item.comment}</Text>
                <Text style ={{fontSize:12}}>{item.ratting } Stars</Text>
                <Text style ={{fontSize:12}}>{'--'+ item.author+','+item.date}</Text>
            </View>
        );
    }
    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}
class Dishdetail extends Component {

    constructor(props){
        console.log("in dish detail")
        super(props);

        this.state = {
            showModal:false,
            favorites : [],
            author: "",
            comment: "",
            rating: null
        }
    }
    
    openCommentForm = () => {
        this.setState({showModal: true})
    }

    toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions ={
        title:'Dish Details'
    }

    ratingCompleted = rating => {
        this.setState({ rating });
      };
    
      handleAuthorInput = author => {
        this.setState({ author });
      };
    
      handleCommentInput = comment => {
        this.setState({ comment });
      };
    
      resetForm() {
        this.setState({
            author: "",
            comment: "",
            rating: null
        });
      }
    
      handleComment() {
        const { rating, author, comment } = this.state;
        const dishId = this.props.navigation.getParam("dishId", "");
        
        console.log("handle COmmeny " , dishId , rating , author , comment)
        this.toggleModal();
        this.props.postComment(dishId, rating, author, comment);
        console.log("after hanle comment")
      }

    render(){
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)}
                onPressAddComment={this.toggleModal}
                openCommentForm={() => this.openCommentForm()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId ===dishId)}
                    />
                {/* <AddCommentForm
                    toggleModal={() => this.toggleModal()}
                    showModal={this.state.showModal}
                    dishId={dishId}
                /> */}
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                    >
                    <View style={styles.modal}>
                        <Rating
                            imageSize={30}
                            startingValue={0}
                            showRating
                            onFinishRating={this.ratingCompleted}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                        placeholder='Author'
                        leftIcon={
                          <Icon
                            name='user-o'
                            type='font-awesome'
                            size={24}
                            color='black'
                          />
                        }
                        style={{paddingBottom: 30}}
                        

                            
                            onChangeText={this.handleAuthorInput}
                        
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={
                            <Icon
                                name='comment-o'
                                type='font-awesome'
                                size={24}
                                color='black'
                            />
                            }
                            onChangeText={this.handleCommentInput}
                            
                        />
                        <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                            this.handleComment();
                            this.resetForm();
                            }}
                            color="#512DA8"
                            title="Submit"
                        />
                        </View>
                        <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                            this.toggleModal();
                            this.resetForm();
                            }}
                            color="gray"
                            title="Cancel"
                        />
                        </View>
                    </View>
                    </Modal>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    icons: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: "row"
    },
    formRow: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: "row",
      margin: 20
    },
    formLabel: {
      fontSize: 18,
      flex: 2
    },
    formItem: {
      flex: 1
    },
    modal: {
      justifyContent: "center",
      margin: 20
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      backgroundColor: "#512DA8",
      textAlign: "center",
      color: "white",
      marginBottom: 20
    },
    modalText: {
      fontSize: 18,
      margin: 10
    }
  });
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);