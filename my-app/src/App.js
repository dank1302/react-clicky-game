import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import PicCard from "./components/PicCard";
import Footer from "./components/Footer";
import pic from "./pic.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    pic,
    clickedPic: [],
    score: 0
  };

//when you click on a card ... the pic is taken out of the array
  imageClick = event => {
    const currentPic = event.target.alt;
    const PicAlreadyClicked =
      this.state.clickedPic.indexOf(currentPic) > -1;

//if you click on a pic that has already been selected, the game is reset and cards reordered
    if (PicAlreadyClicked) {
      this.setState({
        fish: this.state.pic.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedPic: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available pic, your score is increased and cards reordered
    } else {
      this.setState(
        {
          pic: this.state.pic.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedPic: this.state.clickedPic.concat(
            currentPic
          ),
          score: this.state.score + 1
        },
//if you get all 12 pics correct you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              pic: this.state.pic.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedPic: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, PicCard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.pic.map(pic => (
            <PicCard
              imageClick={this.imageClick}
              id={pic.id}
              key={pic.id}
              image={pic.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;