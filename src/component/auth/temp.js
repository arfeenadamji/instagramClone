// import React, { Component } from 'react'
// import {View, Text, Button} from 'react-native'

// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {fetchUser} from '../../redux/actions/index'
// import firebase from 'firebase';

// class Main extends Component {
//     signOutUser = async() => {
//         try {
//              await firebase.auth().signOut();
//         } catch (e) {
//             console.log(e);
//         }
//     }
    
//     componentDidMount(){
//         this.props.fetchUser()

//     }
//     render(){
//         const {currentUser} = this.props;
//         console.log('currentUser',currentUser)
//         if(currentUser ==undefined){
//             return(
//                 <View>
//                     <Text>user is not login in</Text>
//                 </View>
//             )
//         }
//     return (
//         <View style={{flex:1,justifyContent:'center'}}>
//             <Text>{currentUser.name} is logged In</Text>
//             <Button
//             title="Sign Out"
//             onPress={()=> this.signOutUser()}
//             />
//         </View>
//     )
// }
// }
// const mapStateToProps = (store) =>({
//     currentUser:store.userState.currentUser
// })
// const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)
// export default connect(mapStateToProps, mapDispatchProps)(Main)
