import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const ProfileCard = (props) => {


    var date = new Date(props.props.date);
    var options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
    };
    let likess
    var result = date.toLocaleDateString('en', options);

    return (
        <Card mode="contained" style={{ marginTop: 10 }}>
            <Card.Title title={props.props.creatername} style={{ lineHeight: 15 }} subtitle={result} left={LeftContent} />
            <Card.Content>
                <Title >{props.props.heading}</Title>
                <Paragraph>{props.props.caption}</Paragraph>
            </Card.Content>
            <Card.Cover style={{ resizeMode: "center" }} source={{ uri: props.img }} />
            <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions>
        </Card>
    )
}

export default ProfileCard