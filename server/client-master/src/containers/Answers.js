// import React from 'react';
// import {connect} from 'react-redux';
// import 'bulma/css/bulma.css';
// import {getWebSocket, openWebSocket} from "../serverCommunication";
// import {receiveAnswer} from '../actions/answersActions';
// import {Link} from "react-router-dom";
//
// class Answers extends React.Component {
//
//     componentDidMount() {
//         openWebSocket();
//         const ws = getWebSocket();
//         this.checkMessage(ws);
//     };
//
//     checkMessage = (ws) => {
//         ws.onmessage = (msg) => {
//             msg = JSON.parse(msg.data);
//             switch (msg.type) {
//                 case 'ANSWER_SENT':
//                     this.props.receiveAnswer(msg.payload);
//                     console.log(msg);
//                     // this.props.registerTeam(msg.payload);
//                     break;
//                 case 'TEAM_REGISTERED':
//                     console.log(msg);
//                     // this.props.registerTeam(msg.payload);
//                     break;
//                 default:
//             }
//         }
//     };
//
//
//     handleSubmit = (event) => {
//         event.preventDefault();
//         // this.onSocketSend('QUIZZER_START');
//
//     };
//
//     onSocketSend = (type, payload)=> {
//         const msg = {
//             type: type,
//             payload: payload
//         };
//         const ws = getWebSocket();
//         ws.send(JSON.stringify(msg));
//     }
//
//
//
//
//     render() {
//         return (
//             <div>
//                 <section className="section">
//                     <div className="container">
//                         <h1>Aangemelde gebruikers</h1>
//                         <button className="button is-primary" onClick={this.handleSubmit}><Link to="/categories">Start Quiz!</Link></button>
//                     </div>
//                 </section>
//             </div>
//         );
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         answer:state.answer
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//     receiveAnswer : (answer) => dispatch(receiveAnswer(answer))
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Answers);