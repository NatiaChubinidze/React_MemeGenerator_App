import React from "react";
import "./Meme.css";

class Meme extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
  }
  handleSubmit(event) {
    event.preventDefault();
    const randomNum=Math.floor(Math.random()*this.state.allMemeImgs.length);
    const randImg=this.state.allMemeImgs[randomNum].url;
    this.setState({
        randomImg:randImg
    })
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            value={this.state.topText}
            placeholder="Text for top section"
            onChange={this.handleChange}
          ></input>
          <input
            type="text"
            name="bottomText"
            value={this.state.bottomText}
            placeholder="Text for bottom section"
            onChange={this.handleChange}
          ></input>
          <button>Generate</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="Meme Image" />
          <div className="topSection">
            <h2 className="top">{this.state.topText}</h2>
          </div>
          <div className="bottomSection">
            <h2 className="bottom">{this.state.bottomText}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Meme;
