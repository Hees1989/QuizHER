import React from "react";
import {getWebSocket, openWebSocket} from "../serverCommunication";
import TeamDetails from '../components/TeamDetails';
import QuestionDetails from '../components/QuestionDetails';


class TeamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            roundNumber:0,
            questionNumber:0,
            question:false
        };
    }

    componentDidMount() {
        // openWebSocket();
        // this.checkMessage();
    }

    componentDidUpdate() {
        // this.checkMessage();
    }

    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);

            switch (msg.type) {
                case 'TEAM_REGISTERED':
                    this.setState(state => ({
                        teams: [...state.teams,msg.payload]
                    }));
                    console.log('haha');
                    console.log(this.state.teams);

                    break;
                case 'TEAM_ACCEPTED':

                    break;
                case 'TEAM_DECLINED':
                    let array = [...this.state.teams];
                    let index = array.indexOf(msg.payload);
                    if (index !== -1) {
                        array.splice(index, 1);
                        this.setState({teams: array});
                    }


                    break;
                case 'QUIZZER_START':
                    this.props.history.push('/currentQuestion');
                    break;
                case 'TEAM_CURRENT_QUESTION':
                    let currentQuestion = msg.payload.currentQuestion;
                    let currentCategory = msg.payload.currentCategory;
                this.setState({
                    questionNumber: this.state.questionNumber + 1,
                    question: {currentQuestion,currentCategory}
                });
                    break;
                default:
            }
        }
    };

    showTeams = () =>{
        let teamArray = [];
        let teams = this.state.teams;
        //
        for (let team in teams) {
            teamArray.push(
                <div key={team}>
                    <TeamDetails teamName ={teams[team]}/>
                </div>
            );
        }
        // //
        //     {console.log(this.state.teams.length)}
        //
        if(this.state.teams.length !== 0 ){
            return teamArray
        }
        else{
            return <div>
                Er zijn nog geen teams aangemeld
            </div>;
        }
    };

    showQuestionDetails = () =>{
        if(this.state.question !==false){
            return <QuestionDetails currentQuestion={this.state.question.currentQuestion} currentCategory={this.state.question.currentCategory}/>
        }
        else{
            return null;
        }
    };




    render() {
        return (
            <div className="TeamList">
                <div className = 'RoundNumber'>
                {`The roundnumber is: ${this.state.roundNumber}`}
                </div>
                <div className = 'QuestionNumber'>
                {`The currentQuestionNumber is: ${this.state.questionNumber}`}
                </div>
                <div className="TeamName">
                    {/*<Team/>*/}
                {this.showTeams()}
                    {this.showQuestionDetails()}
                    {console.log(this.state.teams.length)}
                </div>
            </div>
        )
    }
}

export default TeamList;