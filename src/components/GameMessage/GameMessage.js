import React, {Component} from "react";
import "./GameMessage.css";

class GameMessage extends Component {

    state = {
        animating: false,
        message: ""
    }

    // for every state change
    componentDidUpdate(prevProps) {

      // will be passed into setState function
      let newState = {
        animating: true
      }

      // pass in score and topScore from the pervious state
      const {score, topScore} = prevProps

      // change messages depending on user inputs
      if (score === 0 && topScore === 0) {
        newState.message = "";
      } else if (score !== 0 && topScore > 0) {
        newState.message = "correct";
      } else {
        newState.message = "incorrect";
      }

      // set the state with the new message if the score changes, 
      // or the message and state message are not equal
      if (score !== this.props.score || this.state.message !== newState.message) {
        this.setState(newState);
      }
    }

    // change the display message based on the message state
    renderMessage = () => {
        switch (this.state.message) {
        case "correct":
          return "You membered!!";
        case "incorrect":
          return "Aww... You didn't member. :'(";
        default:
          return "Only click a berry once!";
        }
    };

    // add animation class when animateClass state updates
    addAnimation = () => {
      switch (this.state.message) {
        case "correct":
          return "animated bounceIn";
        case "incorrect":
          return "animated swing";
        default:
          return "";
        }     
    }

    render() {
        return(
          <li 
            // if the state.aniamtion = true, add the class from animate.css to trigger the animation,
            // also add the state.message as a class, which changes the color,
            // if aniamtion.state = false, remove the aniamte.css class and add the '.black' class
            className={` 
              gameMessage 
              ${this.state.animating? this.addAnimation(): ""}  
              ${this.state.animating? this.state.message: "black"}
            `}
            id={`${this.state.message}`}
            onAnimationEnd={() => this.setState({ animating: false })} 
          >
            {this.renderMessage()}
          </li>  
        );
    }
}

export default GameMessage;
