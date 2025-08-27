import { useEffect, useRef, useState } from "react"
import html2canvas from "html2canvas"

function App() {
    const [allMemes, setAllMemes] = useState([])
    const [meme, setMeme] = useState({
        name: '',
        topText: '',
        bottomText: '',
        imgUrl: ''
    })
    const [canDownload, setCanDownload] = useState(false)
    const memeRef = useRef(null)

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    const getRandomMeme = () => {
        const randomMemeIndex = Math.floor(Math.random() * allMemes.length)
        const newMemeImg = allMemes[randomMemeIndex].url

        setCanDownload(false) // reset sebelum gambar baru dimuat
        setMeme(prevMeme => ({
            ...prevMeme,
            name: allMemes[randomMemeIndex].name,
            imgUrl: newMemeImg
        }))
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target

        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    const downloadMeme = () => {
        if (!canDownload || !memeRef.current) return

        html2canvas(memeRef.current, {
            useCORS: true,
            allowTaint: false,
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement("a")
            link.download = `${meme.name || "meme"}.png`
            link.href = canvas.toDataURL("image/png")
            link.click()
        })
    }

    return (
        <div className='font-poppins flex justify-center my-10'>
            <div className="border-2 w-1/2 h-full">
                <header className="flex w-full h-16 p-4 bg-gradient-to-r from-indigo-500 to-blue-500 space-x-4 justify-center">
                    <img src="/favicon-meme-generator.png" alt="meme logo" className="h-full" />
                    <h1 className="flex items-center font-bold">Meme Generator</h1>
                </header>
                <main>
                    <div className="flex justify-center my-8 space-x-10">
                        <div className="flex flex-col w-2/5 space-y-1">
                            <label>Top text</label>
                            <input
                                type="text"
                                placeholder="Input ur top text"
                                name="topText"
                                className="p-2 border-2 text-gray-700 border-gray-300 placeholder-gray-500 rounded focus:outline-none focus:border-cyan-500"
                                onChange={handleInputChange}
                                value={meme.topText}
                            />
                        </div>
                        <div className="flex flex-col w-2/5 space-y-1">
                            <label>Bottom text</label>
                            <input
                                type="text"
                                placeholder="Input ur bottom text"
                                name="bottomText"
                                className="p-2 border-2 text-gray-700 border-gray-300 placeholder-gray-500 rounded focus:outline-none focus:border-cyan-500"
                                onChange={handleInputChange}
                                value={meme.bottomText}
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-around mt-4">
                        <button
                            onClick={getRandomMeme}
                            className="w-2/4 bg-gradient-to-r from-indigo-500 to-blue-500 p-2 rounded hover:from-indigo-700 hover:to-blue-700 hover:text-white"
                        >
                            Get a new meme image
                        </button>

                        {canDownload && (
                            <button
                                onClick={downloadMeme}
                                className="w-1/4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                            >
                                Download meme
                            </button>
                        )}
                    </div>
                    {/* <button onClick={getRandomMeme} className="flex w-1/2 bg-gradient-to-r from-indigo-500 to-blue-500 p-2 rounded mx-auto justify-center hover:from-indigo-700 hover:to-blue-700 hover:text-white">Get a new meme image</button> */}
                    <div className="flex my-8 w-full items-center justify-center">
                        {
                            meme.imgUrl ?
                                (
                                    <div ref={memeRef} className="relative">
                                        <p
                                            className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl text-white font-bold text-center"
                                            style={{
                                                WebkitTextStroke: '1px black', // Chrome & Safari
                                                textStroke: '1px black' // Fallback
                                            }}
                                        >
                                            {meme.topText}
                                        </p>
                                        <img
                                            src={meme.imgUrl}
                                            alt={meme.name}
                                            className="h-[400px] px-6"
                                            crossOrigin="anonymous"
                                            onLoad={() => setCanDownload(true)} // penting!
                                        />
                                        <p
                                            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl text-white font-bold text-center"
                                            style={{
                                                WebkitTextStroke: '1px black', // Chrome & Safari
                                                textStroke: '1px black' // Fallback
                                            }}
                                        >
                                            {meme.bottomText}
                                        </p>
                                    </div>
                                ) :
                                (<p className="bg-red-500 w-3/4 p-2 text-center rounded mx-auto">⚠️ No image generated. Click the button above first!</p>)
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default App