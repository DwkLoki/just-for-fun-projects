import tenziGameImg from '../assets/tenzi-game-poster.png'
import memeGeneratorImg from '../assets/meme-generator-poster.png' 
import hangmanImg from '../assets/hangman-poster.png'
import TenziGame from '../pages/TenziGame'
import MemeGenerator from '../pages/MemeGenerator'
import Hangman from '../pages/Hangman'

// Mock data untuk proyek-proyek
const projects = [
    {
        id: 1,
        title: "Tenzi Game",
        slug: "tenzi-game",
        image: tenziGameImg,
        component: <TenziGame />
    },
    {
        id: 2,
        title: "Meme Generator",
        slug: "meme-generator",
        image: memeGeneratorImg,
        component: <MemeGenerator />
    },
    {
        id: 3,
        title: "Hangman",
        slug: "hangman",
        image: hangmanImg,
        component: <Hangman />
    },
    {
        id: 4,
        title: "Tenzi Game",
        slug: "bla-bla",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        component: ""
    },
    {
        id: 5,
        title: "Tenzi Game",
        slug: "bla-bla",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        component: ""
    },
    {
        id: 6,
        title: "Tenzi Game",
        slug: "bla-bla",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        component: ""
    },
    {
        id: 7,
        title: "Tenzi Game",
        slug: "bla-bla",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        component: ""
    },
    {
        id: 8,
        title: "Tenzi Game",
        slug: "bla-bla",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        component: ""
    },
    {
        id: 9,
        title: "Tenzi Game",
        slug: "bla-bla",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        component: ""
    },
    {
        id: 10,
        title: "Tenzi Game",
        slug: "bla-bla",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        component: ""
    },
    {
        id: 11,
        title: "Tenzi Game",
        slug: "bla-bla",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        component: ""
    },
    {
        id: 12,
        title: "Tenzi Game",
        slug: "bla-bla",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        component: ""
    }
];

export default projects