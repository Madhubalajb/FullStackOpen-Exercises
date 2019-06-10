import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
    let values = props.values;
    return (
        <div>
            <h1>statistics</h1>
            <p>good {values.good}</p>
            <p>neutral {values.neutral}</p>
            <p>bad {values.bad}</p>
            <p>all {values.all}</p>
            <p>average {values.avg / values.all}</p>
            <p>positive {(100  / values.good) * 100} %</p>
        </div>
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
 
    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <Statistics values={values} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))