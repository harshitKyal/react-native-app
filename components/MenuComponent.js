import React ,{ Component} from "react";
import {ListItem} from 'react-native-elements';
import {DISHES} from '../shared/dishes'
import {View,FlatList}  from 'react-native';
class Menu extends Component{

    constructor(props){
        super(props);

        // console.log("SAdas")
        this.state={
            dishes:DISHES
        }
    }

    static navigationOptions ={
        title:'Menu'
    }

    
    render(){
        // console.log("dsd",this.state.dishes)
        const renderMenuItem=({item,index})=>{
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail',{dishId : item.id})}
                    leftAvatar={{ source: require('./images/uthappizza.png')}}
              />
            );
        }

        const {navigate } = this.props.navigation;
        return (
            
            <FlatList
                data={this.state.dishes} 
                renderItem={renderMenuItem}
                keyExtractor={item =>item.id.toString()}
                />
        );
    }
}

export default Menu;