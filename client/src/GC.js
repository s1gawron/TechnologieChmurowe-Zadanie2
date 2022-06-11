import React, {useEffect} from 'react';
import axios from 'axios';
import {useState} from "react"

const GC = () => {
    const [data, setData] = useState([])
    const [iloraz, setIloraz] = useState("")
    const [wyrazCiagu, setWyrazCiagu] = useState("")
    const [error, setError] = useState("")
    const [count, setCount] = useState(0)

    useEffect(() => {
            axios.get('/api/values')
                .then((response) => setData(response.data))
                .catch((err) => setError(err.response.data));
        }, [count]
    )

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            iloraz: iloraz,
            wyrazCiagu: wyrazCiagu
        }).then((response => setData(response.data)))
            .catch((error) => setError(error.response.data));

        setIloraz("");
        setWyrazCiagu("");
    };

    return (
        <div>
            <div id="error">{error}</div>
            <form onSubmit={handleSubmit}>
                <label>Wprowadz iloraz ciagu:</label>
                <br/>
                <input
                    type="number"
                    placeholder="Iloraz"
                    name="iloraz"
                    onChange={(event) => setIloraz(event.target.value)}
                    value={iloraz}
                    required
                />
                <br/>
                <br/>
                <label>Wprowadz ktory wyraz podanego ciagu chcesz policzyc (mozesz zobaczyc do 10 wyrazu kazdego
                    ciagu):</label>
                <br/>
                <input
                    type="number"
                    placeholder="wyrazCiagu"
                    name="wyrazCiagu"
                    onChange={(event) => setWyrazCiagu(event.target.value)}
                    value={wyrazCiagu}
                    required
                />
                <br/>
                <button type="submit">Submit</button>
            </form>

            <h3>Ostatnie 5 policzonych wartosci:</h3>
            <h3 style={{color: 'red'}}>Wartosci w tabeli nie zawsze odswiezaja sie prawidlowo wowczas nalezy recznie odswiezyc strone :(</h3>

            <div className="tableDiv">
                <table>
                    <thead>
                    <tr>
                        <th>Numer wyrazu ciagu</th>
                        <th>Iloraz</th>
                        <th>Wartosc wyrazu ciagu</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.wyrazciagu}</td>
                                <td>{item.iloraz}</td>
                                <td>{item.wynik}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GC;
