import React ,{ Component} from "react";
import {Text,FlatList,ScrollView}  from 'react-native';
import {ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStoreToProps=state=>{
  return {
    leaders:state.leaders
  }
}
function RenderHistory() {
    const history = "Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.\n\nThe restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.";
    return (
      <Card title="Our History">
        <Text style={{ margin: 10, fontSize: 16 }}>
          {history}
        </Text>
      </Card>
    );
  }


class About extends Component{
    
    static navigationOptions = {
        title: 'About Us',
    };

    render() {
        
      const {params} = this.props.navigation.state;
        const renderLeader=({item,index})=>{
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    subtitleNumberOfLines ={15}
                    hideChevron={true}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
              />
            );
        }

    
      if (this.props.leaders.isLoading) {
          return(
              <ScrollView>
                  <RenderHistory />
                  <Card
                      title='Corporate Leadership'>
                      <Loading />
                  </Card>
              </ScrollView>
          );
      }
      else if (this.props.leaders.errMess) {
          return(
              <ScrollView>
                  <RenderHistory />
                  <Card
                      title='Corporate Leadership'>
                      <Text>{this.props.leaders.errMess}</Text>
                  </Card>
              </ScrollView>
          );
      }
      else {
          return(
              <ScrollView>
                  <RenderHistory />
                  <Card
                      title='Corporate Leadership'>
                  <FlatList 
                      data={this.props.leaders.leaders}
                      renderItem={renderLeader}
                      keyExtractor={item => item.id.toString()}
                      />
                  </Card>
              </ScrollView>
          );
      }
      
       
    }
}

export default connect(mapStoreToProps)(About);