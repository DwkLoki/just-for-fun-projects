import { useEffect, useState } from 'react'
import playButtonImg from '../assets/play-button.png'
import pauseIcon from '../assets/pause-icon.svg'
import corretLetter from '../assets/correct-mark.svg'
import wrongLetter from '../assets/wrong-mark.svg'
import homeIcon from '../assets/home-icon.png'
import resetIcon from '../assets/reset-icon.png'
import nextGameIcon from '../assets/nextgame-icon.png'
import happyStickman from '../assets/happy-stickman.svg'
// Import 8 image parts
import stage0 from '../assets/stage0.svg'
import stage1 from '../assets/stage1.svg'
import stage2 from '../assets/stage2.svg'
import stage3 from '../assets/stage3.svg'
import stage4 from '../assets/stage4.svg'
import stage5 from '../assets/stage5.svg'
import stage6 from '../assets/stage6.svg'
import stage7 from '../assets/stage7.svg'

export default function Hangman() {
    const [isPlayBtnShow, setIsPlayBtnShow] = useState(true)
    const [randomWord, setRandomWord] = useState({})
    const [score, setScore] = useState(0)
    const [revealedLetters, setRevealedLetters] = useState([])
    const [guessedLetters, setGuessedLetters] = useState([])
    const [modal, setModal] = useState(false);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
    const hangmanStages = [stage0, stage1, stage2, stage3, stage4, stage5, stage6, stage7];


    const toggle = () => setModal(!modal);
    
    const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

    // get random word from wordgamedb api &
    // set revealed letters
    const fetchNewWord = async () => {
        const res = await fetch('https://www.wordgamedb.com/api/v1/words/random');
        const randomWord = await res.json();
        const revealedLettersElement = [];
        for (let i = 0; i < randomWord.numLetters; i++) {
            revealedLettersElement.push(<span key={i}>_</span>);
        }
        setRandomWord(randomWord);
        setRevealedLetters(revealedLettersElement);
        setGuessedLetters([]);
        setWrongGuesses(0);
        setGameStatus('playing');
    };
    // useEffect(() => {
    //     fetch('https://www.wordgamedb.com/api/v1/words/random')
    //         .then(res => res.json())
    //         .then(randomWord => {
    //             const revealedLettersElement = []
    //             for (let i = 0; i < randomWord.numLetters; i++) {
    //                 revealedLettersElement.push(<span key={i}>_</span>)
    //             }

    //             setRandomWord(randomWord)
    //             setRevealedLetters(revealedLettersElement)
    //         })
    // }, [])

    // Gunakan fetchNewWord saat komponen pertama kali dimuat
    useEffect(() => {
        fetchNewWord();
    }, []);

    // START GAME baru pertama kali (score = 0)
    const startGame = () => {
        setScore(0);
        fetchNewWord();
        setIsPlayBtnShow(false);
    };

    // NEXT GAME (score tetap)
    const startNextGame = () => {
        fetchNewWord();
    };

    // RESET GAME (score tetap)
    const resetGame = () => {
        fetchNewWord();
        setModal(false)
    };

    // Kembali ke HOME
    const goHome = () => {
        setIsPlayBtnShow(true);
        setScore(0);
        setModal(false); // tutup modal (jika aktif)
        fetchNewWord();
        setGameStatus('playing');
        setGuessedLetters([]);
        setWrongGuesses(0);
        setRevealedLetters([]);
    };

    // mulai game baru ketika game over
    const startNewGame = () => {
        setIsPlayBtnShow(false);
        setScore(0);
        // setModal(false); // tutup modal (jika aktif)
        fetchNewWord();
        setGameStatus('playing');
        setGuessedLetters([]);
        setWrongGuesses(0);
        setRevealedLetters([]);
        };

    const guessLetter = (letter) => {
        // Do not continue if the game is over
        if (gameStatus !== 'playing') return;

        const newGuessedLetters = [...guessedLetters, letter];
        setGuessedLetters(newGuessedLetters);

        if (randomWord.word && randomWord.word.toLowerCase().includes(letter)) {
            // updates the revealedLetters view based on correct guesses
            const updatedRevealed = randomWord.word.split('').map((char, i) =>
                newGuessedLetters.includes(char) || char === letter ? <span key={i}>{char}</span> : <span key={i}>_</span>
            );
            setRevealedLetters(updatedRevealed);

            // Check if all letters are guessed
            const allRevealed = randomWord.word
                .toLowerCase()
                .split('')
                .every(char => newGuessedLetters.includes(char));

            if (allRevealed) {
                setGameStatus('won');
                setScore(prevScore => prevScore + 10)
            }
        } else {
            // wrong letter guess
            const updatedWrong = wrongGuesses + 1;
            setWrongGuesses(updatedWrong);

            if (updatedWrong >= 7) {
                setGameStatus('lost');
            }
        }
    }

    const getLetterStatus = (letter) => {
        if (guessedLetters.includes(letter)) {
            return randomWord.word.toLowerCase().includes(letter) ? 'correct' : 'wrong';
        }
        return '';
    };    

    // render row for keyboard
    const renderRow = (letters, rowIndex) => (
        <div
            key={rowIndex}
            className={`flex justify-center ${rowIndex === 2 ? 'mr-12' : ''}`}
        >
            {letters.map((letter, i) => (
                <button
                    key={i}
                    className='relative text-4xl w-[50px] h-[60px]'
                    onClick={() => guessLetter(letter)}
                    disabled={guessedLetters.includes(letter)} // can't re-click
                >
                    {letter}
                    {getLetterStatus(letter) === 'correct' && (
                        <img
                            src={corretLetter}
                            alt="Correct"
                            className="absolute bottom-0 right-0 w-full h-full"
                        />
                    )}
                    {getLetterStatus(letter) === 'wrong' && (
                        <img
                            src={wrongLetter}
                            alt="Wrong"
                            className="absolute bottom-0 right-0 w-full h-full"
                        />
                    )}
                </button>
            ))}
        </div>
    );

    // const revealedLettersElement = revealedLetters.map(letter => <span>{letter} </span>)

    console.log(randomWord);
    console.log(`
        Guessed letters updated: ${guessedLetters}
        Game Status: ${gameStatus}
        Wrong Guess: ${wrongGuesses}
    `)

    return (
        <div className="relative font-hangmanFont w-3/4 mx-auto bg-white h-[500px] rounded-lg p-6">
            {
                isPlayBtnShow ? 
                (
                    // Tampilkan halaman play saat pertama kali render atau user mengunjungi home
                    <div className="w-full h-full flex justify-center">
                        <button onClick={startGame}>
                            <img src={playButtonImg} alt="Play Button" />
                        </button>
                    </div>
                ) : 
                (
                    // halaman game
                    <div className="w-full h-full text-black flex">
                        <div className='w-3/5'>
                            {gameStatus === 'playing' && (
                                <div>
                                    <div className='text-3xl'>Score: {score}</div>
                                    <div className='text-center text-4xl border-2 border-amber-500 rounded-lg w-1/2 mx-auto py-2'>{randomWord.category}</div>
                                    <div className='text-center text-4xl mt-8 flex justify-center gap-4'>{revealedLetters}</div>
                                    <div className='text-xl mt-2'>hint: {randomWord.hint}</div>
                                    <div className="flex flex-col items-center mt-2">
                                        {renderRow(row1, 0)}
                                        {renderRow(row2, 1)}
                                        {renderRow(row3, 2)}
                                    </div>
                                </div>
                            )}
                            {gameStatus === 'lost' && (
                                <div className='w-full h-full flex flex-col justify-center items-center'>
                                    <div className='font-bold text-5xl text-red-700'>GAME OVER</div>
                                    <div className='text-4xl border-2 border-amber-500 rounded-lg w-fit p-4 my-4'>
                                        {`${randomWord.category} : ${randomWord.word}`}
                                    </div>
                                    <div className='text-2xl mt-4'>Score: {score}</div>
                                    <div className='mt-4'>
                                        <button
                                            className="w-16 border-2 rounded-lg border-amber-500 p-2"
                                            onClick={goHome}
                                        >
                                            <img src={homeIcon} alt="home button" />
                                        </button>
                                        <button
                                            className="w-16 border-2 rounded-lg border-amber-500 p-2 ml-4"
                                            onClick={startNewGame}
                                        >
                                            <img src={resetIcon} alt="reset button" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {gameStatus === 'won' && (
                                <div className='w-full h-full flex flex-col justify-center items-center'>
                                    <div className='font-bold text-5xl text-green-700'>WELL DONE!!</div>
                                    <div className='text-4xl border-2 border-amber-500 rounded-lg w-fit p-4 my-4'>
                                        {`${randomWord.category} : ${randomWord.word}`}
                                    </div>
                                    <div className='text-2xl mt-4'>Score: {score}</div>
                                    <div className='mt-4'>
                                        <button
                                            className="w-16 border-2 rounded-lg border-amber-500 p-2"
                                            onClick={startNextGame}
                                        >
                                            <img src={nextGameIcon} alt="next game button" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='w-2/5'>
                            <div className='flex justify-end'>
                                <button
                                    className="w-16 border-2 rounded-lg border-amber-500 p-2"
                                    onClick={toggle}
                                >
                                    <img src={pauseIcon} alt="pause button" />
                                </button>
                            </div>

                            <img
                                className='w-full transition-all duration-1000 ease-in-out'
                                src={gameStatus === 'won' ? happyStickman : hangmanStages[wrongGuesses]}
                                alt="Hangman Progress"
                            />
                                
                            {/* show hangman progress when game are play or lost */}
                            {/* {gameStatus === 'playing' && <img className='w-full' src={hangmanStages[wrongGuesses]} alt="Hangman Progress" />}
                            {gameStatus === 'lost' && <img className='w-full' src={hangmanStages[wrongGuesses]} alt="Hangman Progress" />} */}

                            {/* show happy stickman when game is won */}
                            {/* {gameStatus === 'won' && <img className='w-full' src={happyStickman} alt="Happy Stickman" />} */}
                            {modal && (
                                <div 
                                    className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit bg-white border rounded-lg shadow-lg p-6 z-20"
                                >
                                    {/* Tombol kecil di pojok kanan atas */}
                                    <button
                                        onClick={toggle}
                                        className="absolute top-2 right-2 w-6"
                                    >
                                        <img src={wrongLetter} alt='cancel modal button' />
                                    </button>
                                    <h2 className="text-2xl font-bold mb-4">Paused</h2>
                                    <div className='mt-4'>
                                        <button
                                            className="w-16 border-2 rounded-lg border-amber-500 p-2"
                                            onClick={goHome}
                                        >
                                            <img src={homeIcon} alt="home button" />
                                        </button>
                                        <button
                                            className="w-16 border-2 rounded-lg border-amber-500 p-2 ml-4"
                                            onClick={resetGame}
                                        >
                                            <img src={resetIcon} alt="reset button" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
                
            }
            {/* Overlay hitam muncul jika modal aktif */}
            {modal && (
                <div className="absolute inset-0 bg-black/50 z-10"></div>
            )}
        </div>
    )
}