import Confetti from 'react-confetti'
import { useEffect, useState } from 'react'

function App() {
    const [allDices, setAllDices] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const initiateDiceValue = () => {
        const newDices = []
        for (let i = 1; i <= 10; i++) {
            const randomNumber = Math.ceil(Math.random() * 6)
            const newDice = {
                id: i,
                value: randomNumber,
                isHeld: false
            }
            newDices.push(newDice)
            setAllDices(newDices)
        }
    }

    useEffect(initiateDiceValue, [])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const allDicesElement = allDices.map(dice => {
        return <button onClick={() => holdDice(dice.id)} key={dice.id} className={`w-8 h-8 rounded-md text-sm font-bold shadow-xl ${dice.isHeld ? 'bg-green-400 text-white' : 'bg-white text-cyan-700'}`}>{dice.value}</button>
    })

    const shuffleDice = () => {
        const newDices = allDices.map(dice => {
            const randomNumber = Math.ceil(Math.random() * 6)
            return dice.isHeld ? dice : { ...dice, value: randomNumber }
        })
        setAllDices(newDices)
    }

    const holdDice = (id) => {
        const newDices = allDices.map(dice => {
            return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
        })
        setAllDices(newDices)
    }

    // const hasWon = allDices.length > 0 &&
    //     allDices.every(dice => dice.isHeld) &&
    //     allDices.every(dice => dice.value === allDices[0].value)

    const isAllHeld = allDices.length > 0 && allDices.every(dice => dice.isHeld)
    const hasWon = isAllHeld && allDices.every(dice => dice.value === allDices[0].value)
    const hasConflict = isAllHeld && !hasWon


    return (
        <div className="font-inter flex flex-col items-center mt-20">
            {hasWon && (
                <Confetti
                    width={windowWidth}
                    height={windowHeight}
                    recycle={false} // biar hanya meledak sekali
                    numberOfPieces={300}
                    gravity={0.2}
                />
            )}
            <main className="border-2 rounded-md border-slate-300 w-96 shadow-xl p-8 text-center bg-slate-200">
                <h1 className="font-bold text-cyan-700">TENZI GAME</h1>
                <p className="text-cyan-700 text-sm">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="p-4 grid grid-cols-5 gap-2 justify-items-center w-[70%] mx-auto">
                    {allDicesElement}
                </div>

                {/* Pesan kemenangan */}
                {hasWon && (
                    <h2 className="text-green-600 text-xl font-bold mt-4 mb-4 animate-bounce">
                        🎉 You win!
                    </h2>
                )}
                {hasConflict && (
                    <h2 className="text-red-500 text-sm font-semibold mt-2 mb-4 animate-pulse">
                        🤔 So close! You’ve held all the dice, but the numbers still don’t match.
                    </h2>
                )}

                {
                    hasWon ? <button onClick={initiateDiceValue} className="py-1 px-3 border-2 rounded-md bg-green-500 font-bold text-white text-sm hover:bg-green-700">Reset Game</button> :
                        <button onClick={shuffleDice} className="py-1 px-3 border-2 rounded-md bg-cyan-500 font-bold text-white text-sm hover:bg-cyan-700">Roll</button>
                }
            </main>
            <footer className='text-xs mt-4 w-96 text-center'>
                <a href="https://www.flaticon.com/free-icons/dice" title="dice icons">Dice icons created by bearicons - Flaticon</a>
            </footer>
        </div>
    )
}

export default App