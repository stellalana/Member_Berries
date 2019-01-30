import React, { Component } from "react";
import Container from "../Container";
import GameCard from "../GameCard";
import Instructions from "../Instructions";
import Header from "../Header";
import data from "../../data";


class Game extends Component {

    state = {
        data,
        score: 0,
        topScore: 0,
        message: "Memmmber???"
    };

    componentDidMount() {
        this.setState({ data: this.shuffleDeck(this.state.data) });
    }

    // shuffle data
    shuffleDeck = data => {
        let newData = data.sort(function(a, b){return 0.5 - Math.random()});
        return newData;
    };

    // resets all data to false
    resetDeck = data => {
        const resetData = data.map(item => ({ ...item, clicked: false }));
        return this.shuffleDeck(resetData);
      };

    // checks if higher than new score and updates if so
    correctGuess = newData => {
        let newScore = this.state.score;
        newScore++
        let newTopScore = Math.max(newScore, this.state.topScore);

        this.setState({
            data: this.shuffleDeck(newData),
            score: newScore,
            topScore: newTopScore,
            animation: "animated swing"
        })
    }

    // restarts the game with fresh data
    wrongGuess = newData => {
        this.setState({
            data: this.resetDeck(newData),
            score: 0
        })
    }

    // when a card is clicked, check if it has been clicked before,
    // then update that cards clicked property
    gameCardClick = id => {
        let guessedCorrectly = false;
        // newData will be the data array with updated clicked properties
        const newData = this.state.data.map(item => {
          if (item.id === id) {
            if (!item.clicked) {
              item.clicked = true;
              guessedCorrectly = true;
            }
          }
          return item;     
        });
        // if guessedCorrectly = true, run the correctGuess function,
        // else run the wrongGuess function
        guessedCorrectly ? this.correctGuess(newData) : this.wrongGuess(newData);
      };

    render() {
        return (
            <div className="animated fadeIn">
                <Header score={this.state.score} topScore = {this.state.topScore} />
                <Instructions message={this.state.message} />
                <Container>
                    {
                        this.state.data.map(item => (
                            <div className="animated rubberBand">
                                <GameCard
                                    key={item.id}
                                    id={item.id} 
                                    image={item.image}
                                    animate={!this.state.score && this.state.topScore}
                                    clicked={item.clicked}
                                    handleClick={this.gameCardClick}
                                />      
                            </div>  
                        ))
                    }
                </Container>
            </div>
        );
    }
}

export default Game;
