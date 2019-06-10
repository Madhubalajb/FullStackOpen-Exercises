import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const[good, setGood] = useState(0);
    const[neutral, setNeutral] = useState(0);
    const[bad, setBad] = useState(0);

    let all = good+neutral+bad;
    const goodScore = 1;
    const neutralScore = 0;
    const badScore = -1;
    let avg = (good*goodScore)+(neutral*neutralScore)+(bad*badScore);

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {avg / all}</p>
            <p>positive {(100 / good) *100} %</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))