import React ,{ Component} from "react";
import { Card } from 'react-native-elements';
import { Text, ScrollView, View } from 'react-native';


class Contact extends Component{
    
    

    static navigationOptions = {
        title: 'Contact',
    };

    render() {
        const contactInfo = '121, Clear Water Bay Road\nClear Water Bay, Kowloon\nHONG KONG\nTel: +852 1234 5678\nFax: +852 8765 4321\nEmail:confusion@food.net';
    
        return(

            <Card
                title="Contact Information">
        
        <Text style={{ margin: 10, lineHeight: 50, fontSize: 16 }}>
              {contactInfo}
            </Text>
            </Card>
            
        );
    }
}

export default Contact;