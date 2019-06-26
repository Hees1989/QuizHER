import React from "react";
import {getWebSocket, openWebSocket} from "../serverCommunication";

class TeamDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: '1',
            pointsThisRound: 0,
            totalPoints: 0,
            correctlyAnsweredQuestions: 0,
            correctlyAnsweredQuestionsThisRound: 0,
            accepted: true,
            submitted: false,
            answer:'',
            showAnswer:false
        };
    }


    componentDidMount() {
        openWebSocket();
        this.checkMessageRightNow();
    }

    componentWillUpdate(prevProps, prevState, snapshot) {
        this.checkMessageRightNow();
    }


    showTeam = () => {
        if (this.state.accepted === true) {
            return (
                <div className="TeamDetails">
                    {`${this.state.teamName} has ${this.state.pointsThisRound} points and ${this.state.correctlyAnsweredQuestionsThisRound} correctly answered questions this round.
                    Submitted : ${this.state.submitted}`}
                </div>
            )
        }
    }

    checkIfSubmitted = (name,answer) =>{
        if(this.state.teamName ===name){
            this.setState({
                submitted:true,
                answer:answer,
                showAnswer:false
            })
        }
    }

    showAnswer = (name) =>{
        if(this.state.teamName ===name){
            this.setState({
                showAnswer:true
            })
        }
    }

    checkMessageRightNow = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            console.log(msg);
            switch (msg.type) {
                case 'TEAM_REGISTERED':
                    this.setState({
                        teamName: msg.payload,
                        accepted: true
                    });
                    break;
                case 'TEAM_ACCEPTED':
                    this.setState({
                        accepted: true
                    });
                    break;
                case 'TEAM_DECLINED':
                    this.setState({
                        accepted: false
                    });
                    break;
                case 'QUIZZER_START':
                    // this.props.history.push('/currentQuestion');
                    break;
                case 'ANSWER_SENT':
                    this.checkIfSubmitted(msg.payload.teamName,msg.payload.givenAnswer);
                    // this.props.history.push('/currentQuestion');
                    break;
                case 'QUESTION_CLOSED':
                    this.showAnswer(msg.payload.teamName)
                    // this.props.history.push('/currentQuestion');
                    break;
            }
        }
    };

    render() {
        return (
            <div className="Team">
                {this.showTeam()}
            </div>
        )
    }
}

export default TeamDetails;