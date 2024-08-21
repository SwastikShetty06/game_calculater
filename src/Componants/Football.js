import React, { useState } from "react";

export default function Football() {
    const [numPlayers, setNumPlayers] = useState(0);
    const [players, setPlayers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [pointsTable, setPointsTable] = useState({});
    const [step, setStep] = useState(1);

    const handleNumPlayersChange = (e) => {
        setNumPlayers(e.target.value);
        setPlayers(Array.from({ length: e.target.value }, () => ""));
    };

    const handlePlayerNameChange = (index, e) => {
        const newPlayers = [...players];
        newPlayers[index] = e.target.value;
        setPlayers(newPlayers);
    };

    const generateMatches = () => {
        const matches = [];
        for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            matches.push({
            player1: players[i],
            player2: players[j],
            player1Points: 0,
            player2Points: 0,
            });
        }
        }
        setMatches(matches);
        setStep(2);
    };

    const handlePointsChange = (matchIndex, player, e) => {
        const newMatches = [...matches];
        newMatches[matchIndex][player] = parseInt(e.target.value, 10);
        setMatches(newMatches);
    };

    const calculatePointsTable = () => {
        const points = {};
        players.forEach((player) => {
        points[player] = { played: 0, won: 0, lost: 0, points: 0 };
        });

        matches.forEach((match) => {
        points[match.player1].played++;
        points[match.player2].played++;

        if (match.player1Points > match.player2Points) {
            points[match.player1].won++;
            points[match.player1].points += 3;
            points[match.player2].lost++;
        } else if (match.player1Points < match.player2Points) {
            points[match.player2].won++;
            points[match.player2].points += 3;
            points[match.player1].lost++;
        } else {
            points[match.player1].points += 1;
            points[match.player2].points += 1;
        }
        });

        setPointsTable(points);
        setStep(3);
    };

    return (
        <div className="App">
        <h1>Football Points Calculator</h1>

        {step === 1 && (
            <div>
            <label>
                Number of Players:
                <input
                type="number"
                value={numPlayers}
                onChange={handleNumPlayersChange}
                />
            </label>

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

            <button onClick={generateMatches}>Generate Matches</button>
            </div>
        )}

        {step === 2 && (
            <div>
            <h2>Enter Match Results</h2>
            {matches.map((match, index) => (
                <div key={index}>
                <span>
                    {match.player1} vs {match.player2}
                </span>
                <input
                    type="number"
                    placeholder={`${match.player1} points`}
                    value={match.player1Points}
                    onChange={(e) =>
                    handlePointsChange(index, "player1Points", e)
                    }
                />
                <input
                    type="number"
                    placeholder={`${match.player2} points`}
                    value={match.player2Points}
                    onChange={(e) =>
                    handlePointsChange(index, "player2Points", e)
                    }
                />
                </div>
            ))}
            <button onClick={calculatePointsTable}>Calculate Points Table</button>
            </div>
        )}

        {step === 3 && (
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
        )}
        </div>
    );
}


