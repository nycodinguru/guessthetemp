import React from 'react';
import Scrollchor from 'react-scrollchor';

const Game = props => {

    const renderCities = props.randomizedCityList.map( (i, key) => {
        let countbody;
        if ( i === "New York") countbody = 'United-states';
        else if ( i === "Nairobi") countbody = 'Kenya';
        else if ( i === "London") countbody = 'United-kingdom';
        else if ( i === "Sao Paulo") countbody = 'Brazil';
        else if ( i === "Hong Kong")  countbody = 'Hong-kong';
        return (
            <li id={i.replace(/[^\w]/g, "")} className={`City ${countbody}`} key={key+1} style={{display: 'none'}}> {i} </li>
        )
    });

    return (
        <div className="Game-container">
            <Scrollchor to="#" animate={{offset: 0, duration: 300}}>
                <div className="Nav"><span className="Guess">Guess</span><span className="The">The</span><span className="Temp">Temp</span>°</div>
            </Scrollchor>
            <div className="Middle-section">
                <div className="Left-panel">
                <div>
                  <table className="Table">
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>City</th>
                            <th style={{textAlign: 'center'}}>Guess</th> 
                            <th style={{textAlign: 'center'}}>Actual</th>
                        </tr>
                    </thead>
                </table>  
                </div>
                <div className="Toggle-parent">
                    <h4>Toggle Units</h4>
                    <p>Change temperature scale between Fahrenheit and Celcius</p>
                    <div className="Toggle-outer">
                        <h5 className="Units">°{props.degree.toUpperCase()}</h5>
                        <div className="Toggle-inner" onClick={ () => props.convertTemp() }>
                            <div className="Toggle-button" ></div>
                        </div>
                    </div>
                    <p className="Close" onClick={ () => document.querySelector(".Toggle-parent").classList.add('Dismissed')}>CLOSE</p>
                </div>
                </div>
                <div className="Center-section">
                    <div className="Center-panel">
                        <p className="Caption-text">Guess the current temperature within {props.guessMargin}° in...</p>
                        <ul className="City-list">
                            {renderCities}
                        </ul>
                        <input className="Input-field" name={props.currentCity} type="number" placeholder="0°" onChange={props.handleChange}></input>
                        <button className="Button" type="submit" value="" onClick={ (e) => props.handleSubmit(e)}>submit</button>
                    </div>
                </div>
                <div className="Right-panel">
                    <div className="Table">
                    <h4>Score</h4>
                            <p>3 of 5 to win</p>
                        <table>  
                            <tbody>
                                <tr>
                                    <td className="Correct-count Score">{props.correctCount}</td>
                                    <td className="Incorrect-count Score">{props.incorrectCount}</td> 
                                </tr>   
                            </tbody>
                        </table>
                    </div>        
                    <div className="Npm-div">
                        <h3>npm packages used</h3>
                        <ul>
                            <li><a href="https://www.npmjs.com/package/react-axios" target="_blank" rel="noopener noreferrer">react-axios</a></li>
                            <li><a href="https://www.npmjs.com/package/react-scrollchor" target="_blank" rel="noopener noreferrer">react-scrollchor</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="Footer">
                <p>powered by OpenWeather &copy; API </p>
                <br/>
                <p> &copy; 2019, RASHAD ROSE.</p>
            </div>
        </div>
    )
}

export default Game;