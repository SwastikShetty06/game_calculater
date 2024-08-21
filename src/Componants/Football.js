import React, { useState } from "react";

export default function Football() {
    const [numPlayers, setNumPlayers] = useState(0);
    const [players, setPlayers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [pointsTable, setPointsTable] = useState({});

    const handleNumPlayersChange = (e) => {
        setNumPlayers(e.target.value);
        setPlayers(Array.from({ length: e.target.value }, () => ""));
    };

    const handlePlayerNameChange = (index, e) => {
        const newPlayers = [...players];
        newPlayers[index] = e.target.value;
        setPlayers(newPlayers);
    };

    const generateRandomMatches = () => {
        const matches = [];
        const points = {};
        players.forEach((player) => {
        points[player] = { played: 0, won: 0, lost: 0, points: 0 };
        });

        for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            const result = Math.random() > 0.5 ? players[i] : players[j];
            matches.push(`${players[i]} vs ${players[j]} - Winner: ${result}`);

            points[players[i]].played++;
            points[players[j]].played++;

            if (result === players[i]) {
            points[players[i]].won++;
            points[players[i]].points += 3;
            points[players[j]].lost++;
            } else {
            points[players[j]].won++;
            points[players[j]].points += 3;
            points[players[i]].lost++;
            }
        }
        }

        setMatches(matches);
        setPointsTable(points);
    };

    return (
        <div className="App">
        <h1>Football Points Calculator</h1>
        <div>
            <label>
            Number of Players:
            <input
                type="number"
                value={numPlayers}
                onChange={handleNumPlayersChange}
            />
            </label>
        </div>
        {players.map((player, index) => (
            <div key={index}>
            <label>
                Player {index + 1} Name:
                <input
                type="text"
                value={player}
                onChange={(e) => handlePlayerNameChange(index, e)}
                />
            </label>
            </div>
        ))}
        <button onClick={generateRandomMatches}>Generate Matches</button>
        <div>
            <h2>Matches</h2>
            {matches.map((match, index) => (
            <div key={index}>{match}</div>
            ))}
        </div>
        <div>
            <h2>Points Table</h2>
            <table>
            <thead>
                <tr>
                <th>Player</th>
                <th>Played</th>
                <th>Won</th>
                <th>Lost</th>
                <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(pointsTable).map(([player, stats], index) => (
                <tr key={index}>
                    <td>{player}</td>
                    <td>{stats.played}</td>
                    <td>{stats.won}</td>
                    <td>{stats.lost}</td>
                    <td>{stats.points}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}

