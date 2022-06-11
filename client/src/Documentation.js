import React from 'react';
import arch from './arch.png';

export default () => {
    return (
        <div>
            <br/>
            Architektura usługi "GC Calc"
            <br/>
            <img src={arch} alt="arch"/>

            <br/>
            <br/>
            Do zbudowania tej aplikacji zostal uzyty przyklad z dodatkowych materialow do laboratorium 11. <br/>
            W porownianiu do oryginalu wyeliminowany zostal kontener worker wraz z konterem redis. <br/>
            Wszelkie obliczenia zostaly wykonane w serverze express, a ich wynik zapisany w bazie danych PostgreSQL. <br/>
            Poprawione zostalo mapowanie portu dla nginx w pliku docker-compose.dev.yml. <br/>
            Logika kliencka i serwerowa zostala zmodyfikowana i dopasowana do tresci zadania. <br/>
        </div>
    );
};
