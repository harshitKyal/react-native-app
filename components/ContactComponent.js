import React ,{ Component} from "react";
import { Card ,Icon,Button} from 'react-native-elements';
import { Text, ScrollView, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component{
    
    sendMail(){
        MailComposer.composeAsync({
            recipients:['harshitkyal@gmail.com'],
            subject:"Enquiry",
            body:'To whom it may concern :'
        });
    }
    static navigationOptions = {
        title: 'Contact',
    };

    render() {
        const contactInfo = '121, Clear Water Bay Road\nClear Water Bay, Kowloon\nHONG KONG\nTel: +852 1234 5678\nFax: +852 8765 4321\nEmail:confusion@food.net';
    
        return(
             <ScrollView>
                 
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    title="Contact Information">
            
                    <Text style={{ margin: 10, lineHeight: 50, fontSize: 16 }}>
                    {contactInfo}
                    </Text>
                    <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                </Card>
                </Animatable.View>
            </ScrollView>
        
        );
    }
}

export default Contact;