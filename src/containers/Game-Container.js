import React, { Component } from 'react';
import Game from '../components/Game';
import axios from 'axios';
import { cities } from '../data/data';


export default class GameContainer extends Component {
    constructor(props){
        super(props);
        this.state = { 
            degree: 'f', 
            currentNdx: 0,
            correctCount: 0,
            incorrectCount: 0,
            guessMargin: 9
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.convertTemp = this.convertTemp.bind(this);
    };
    componentWillMount() {
        this.randomizeCityList(cities);
        setTimeout( () => this.showCity(), 200 )
    }

    componentDidMount() {
        const that = this;

        axios({
            url: `https://api.openweathermap.org/data/2.5/group?id=5128581,2643743,1819729,3448439,184745&units=imperial&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`,
            method: 'GET'
          }).then( response => {
            const data = response.data.list;
            this.setState({
                currentTemperatures: data
                });
          }).catch( error => {
            console.log(error);
          });

          document.addEventListener('keypress', function (e) {
            if (13 == e.keyCode) {
                that.handleSubmit(e);
             }
          });

          window.addEventListener('scroll', () => {
            if (window.scrollY >= 190){
                document.querySelector('.Nav').classList.add('scrolled');
                document.querySelector('.AppName').classList.add('scrolled');
            } 
            else {
                document.querySelector('.Nav').classList.remove('scrolled');
                document.querySelector('.AppName').classList.remove('scrolled');
            } 
        });
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        const table = document.querySelector('.Table');
        let color;
        e.preventDefault();
        if ( this.state.currentNdx > this.state.currentTemperatures.length-1 || !this.state[this.state.currentCity]) return false;
        else if (this.state[this.state.currentCity])
        document.querySelector('.Input-field').value = "";
        this.setState({currentNdx: this.state.currentNdx+=1});

        const row = document.createElement('tr');
        const dataCity = document.createElement('td');
        const dataGuessTemp = document.createElement('td');
        const dataActualTemp = document.createElement('td');

        dataCity.innerText = this.state.currentCityName;
        dataActualTemp.classList.add('Temp');
        dataGuessTemp.innerText = this.state[this.state.currentCity];
        dataGuessTemp.classList.add('Temp');
        color = this.compareVals(dataGuessTemp.innerText) ? 'green' : 'red';
        row.style.color = color;
        dataActualTemp.innerText = this.setState.currentTemp;
        row.appendChild(dataCity);
        row.appendChild(dataGuessTemp);
        row.appendChild(dataActualTemp)
        table.appendChild(row);
        setTimeout( () => this.showCity(), 200 )
    }

    compareVals(dataGuessTemp) {
        let dataActualTemp;

        for (let city in this.state.currentTemperatures) {
            if (this.state.currentCityName === this.state.currentTemperatures[city].name){
                dataActualTemp =  Math.round(this.state.currentTemperatures[city].main.temp);
                this.setState.currentTemp = dataActualTemp;
            } 
        }

        if (Math.abs(parseInt(dataActualTemp) - parseInt(dataGuessTemp)) < this.state.guessMargin ){
            this.setState({correctCount: this.state.correctCount+1});
            return true;
          } else {
            this.setState({incorrectCount: this.state.incorrectCount+1});
            return false;
          }
    }

    randomizeCityList(cities) {
        var currentIndex = cities.length, temporaryValue, randomIndex;
            
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = cities[currentIndex];
            cities[currentIndex] = cities[randomIndex];
            cities[randomIndex] = temporaryValue;
        }

        this.setState({randomizedCityList: cities})
    };

    showCity() {
        const cityLi = document.querySelectorAll('.City');
        let currentCity = this.state.currentNdx < cityLi.length ? cityLi[this.state.currentNdx] : cityLi[cityLi.length-1];
        const caption = document.querySelector('.Caption-text');

        if (this.state.currentNdx < cityLi.length) {
            for (let i = 0; i < cityLi.length; i++) {
                if (cityLi[i] === currentCity) currentCity.style.display = 'block';
                else cityLi[i].style.display = 'none';
            }
        }
        
        else {
            cityLi[cityLi.length-1].innerText = 'Thanks for playing!'
            cityLi[cityLi.length-1].style = 'font-size: 1.2rem; font-weight: normal;'
            cityLi[cityLi.length-1].className = '';
            document.querySelector('.Button').style.display = 'none';
            document.querySelector('.Input-field').style.display = 'none';
            if (this.state.incorrectCount > 2){
                caption.innerText = 'Bummer, better luck next time 😩';
                caption.style = 'font-size: 2.2rem; font-weight: bold; margin-bottom: 10%;'
            } 
            else {
                caption.innerText = 'Congrats, you won! 🎉';
                caption.style = 'font-size: 2.2rem; font-weight: bold; margin-bottom: 10%;'
            } 
        }
        
        this.setState({currentCity: currentCity.id,
                       currentCityName: this.state.randomizedCityList[this.state.currentNdx],
        });
    };

    convertTemp() {
        let table = document.querySelectorAll('.Temp') ? document.querySelectorAll('.Temp') : [];

        if (this.state.degree === 'c') {
            for (let t = 1; t < table.length; t++) {
                table[t].textContent = Math.round(parseInt(table[t].textContent) * 9 / 5 + 32);
            }
            for (let temp of this.state.currentTemperatures) {
                temp.main.temp = Math.round(parseInt(temp.main.temp) * 9 / 5 + 32);
            }
          this.setState({currentTemp: this.setState.currentTemp * 9 / 5 + 32});
          this.setState({guessMargin: 9});
          this.setState({degree: 'f'});
        } else {
            for (let t = 1; t < table.length; t++) {
                table[t].textContent = Math.round((parseInt(table[t].textContent) -32) * 5 / 9);  
            }
            for (let temp of this.state.currentTemperatures) {
                temp.main.temp = Math.round((parseInt(temp.main.temp) -32) * 5 / 9);  
            }
            this.setState({currentTemp: (this.setState.currentTemp -32) * 5 / 9});
            this.setState({guessMargin: 5});
            this.setState({degree: 'c'});
        }
        document.querySelector(".Toggle-inner").classList.toggle("toggled");
        document.querySelector(".Toggle-button").classList.toggle("toggled");
      };

    render() {
        return (
            <Game
                randomizedCityList={this.state.randomizedCityList}
                currentCity={this.state.currentCity}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                currentCityName={this.currentCityName}
                correctCount={this.state.correctCount}
                incorrectCount={this.state.incorrectCount}
                convertTemp={this.convertTemp}
                guessMargin={this.state.guessMargin}
                degree={this.state.degree}
            />
        )
    }
};
