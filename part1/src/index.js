import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
    let values = props.values;

    if (values.all <= 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <tr>
                        <td>good</td> <td>{values.good}</td>
                    </tr>
                    <tr>
                        <td>neutral</td> <td>{values.neutral}</td>
                    </tr>
                    <tr>
                        <td>bad</td> <td>{values.bad}</td>
                    </tr>
                    <tr>
                        <td>all</td> <td>{values.all}</td>
                    </tr>
                    <tr>
                        <td>average</td> <td>{values.avg / values.all}</td>
                    </tr>
                    <tr>
                        <td>positive</td> <td>{(100  / values.good) * 100} %</td>
                    </tr>
                </table>
            </div>
        )
    }
}

const Button = (props) => {
    return (
        <button onClick={props.handleClicks}>{props.text}</button>
    )
}

const App = () => {
    const[good, setGood] = useState(0);
    const[neutral, setNeutral] = useState(0);
    const[bad, setBad] = useState(0);

    const goodScore= 1;
    const neutralScore= 0;
    const badScore= -1;    

    const values = {
        good: good,
        neutral: neutral,
        bad: bad,
        all: good + neutral + bad,
        avg: (good * goodScore) + (neutral * neutralScore) + (bad * badScore)
    }

    const goodClicks = () => {
        setGood(good + 1)
    }
    const neutralClicks = () => {
        setNeutral(neutral + 1)
    }
    const badClicks = () => {
        setBad(bad + 1)
    }
 
    return (
        <div>
            <h1>give feedback</h1>
            <Button text="good" handleClicks={goodClicks} />
            <Button text="neutral" handleClicks={neutralClicks} />
            <Button text="bad" handleClicks={badClicks} />
            <Statistics values={values} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))