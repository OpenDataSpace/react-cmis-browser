'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var actions = require('../actions');
var authStore = require('../Auth/authStore');
//var SearchResults = require('./SearchResults');
var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS
    } = React;

var MainPage = React.createClass({
    mixins: [Reflux.listenTo(authStore,"onAuthChange")],
    getInitialState() {
        return { username: 'pshurpik', password: '111', isLoading: false, message: 'empty' }
    },
    render() {
        var spinner = this.state.isLoading ? (<ActivityIndicatorIOS hidden='true' size='large'/>) : (<View />);
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Dataspace</Text>
                <Text style={styles.description}>Please enter your username and password</Text>
                <TextInput style={styles.searchInput}
                    value={ this.state.username }
                    onChange={(evt) => this.setState({username: evt.nativeEvent.text})}
                    placeholder='Username'
                />
                <TextInput style={styles.searchInput}
                    value={ this.state.password }
                    onChange={(evt) => this.setState({password: evt.nativeEvent.text})}
                    placeholder='Password'
                />
                <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.handleSigninPressed}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    },
    handleSigninPressed() {
        if (this.state.username.trim().length > 0 && this.state.password.trim().length > 0) {
            actions.createSession({username: this.state.username, password: this.state.password});
        }
    },
    onAuthChange: function(status, username, errorMessage) {
        console.log(status + ' ' + username + '\n' + errorMessage);
        this.setState({message: status + ' ' + username + '\n' + errorMessage});
    }
});


var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    }, /*** */
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    }

});

module.exports = MainPage;