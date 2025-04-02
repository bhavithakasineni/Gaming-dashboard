import React, { useState } from 'react';
import { BookOpen, Users, Trophy, Swords, ChevronLeft, Search, MessageCircle, BrainCircuit, Atom, Palette, Globe2 } from 'lucide-react';

interface Topic {
  id: number;
  name: string;
  icon: React.ElementType;
  image: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Opponent {
  id: number;
  name: string;
  avatar: string;
  specialties: string[];
  winRate: number;
  status: 'online' | 'offline';
}

const topics: Topic[] = [
  {
    id: 1,
    name: "Computer Science",
    icon: BrainCircuit,
    image: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&q=80&w=400",
    description: "Programming, algorithms, and computer fundamentals",
    difficulty: 'Medium',
    category: 'Technology'
  },
  {
    id: 2,
    name: "Physics & Space",
    icon: Atom,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400",
    description: "Quantum mechanics, astronomy, and physical laws",
    difficulty: 'Hard',
    category: 'Science'
  },
  {
    id: 3,
    name: "Art History",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=400",
    description: "Renaissance art, modern movements, and famous artists",
    difficulty: 'Medium',
    category: 'Arts'
  },
  {
    id: 4,
    name: "World History",
    icon: Globe2,
    image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=400",
    description: "Ancient civilizations to modern history",
    difficulty: 'Easy',
    category: 'History'
  }
];

const questions: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      question: "What is the time complexity of a binary search algorithm?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      explanation: "Binary search has a logarithmic time complexity as it halves the search space in each step."
    },
    {
      id: 2,
      question: "Which programming paradigm treats computation as the evaluation of mathematical functions?",
      options: ["Object-Oriented", "Functional", "Procedural", "Imperative"],
      correctAnswer: 1,
      explanation: "Functional programming emphasizes the evaluation of mathematical functions and avoids state changes."
    }
  ],
  2: [
    {
      id: 1,
      question: "What is the name of the force that holds atomic nuclei together?",
      options: ["Electromagnetic force", "Gravitational force", "Strong nuclear force", "Weak nuclear force"],
      correctAnswer: 2,
      explanation: "The strong nuclear force binds protons and neutrons together in atomic nuclei."
    },
    {
      id: 2,
      question: "Which planet has the most moons in our solar system?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correctAnswer: 1,
      explanation: "Saturn has 82 confirmed moons, more than any other planet in our solar system."
    }
  ],
  3: [
    {
      id: 1,
      question: "Who painted 'The Starry Night'?",
      options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Leonardo da Vinci"],
      correctAnswer: 1,
      explanation: "Vincent van Gogh painted 'The Starry Night' in 1889 while at the Saint-Paul-de-Mausole asylum."
    },
    {
      id: 2,
      question: "Which art movement is characterized by dreamlike and incongruous imagery?",
      options: ["Impressionism", "Surrealism", "Cubism", "Pop Art"],
      correctAnswer: 1,
      explanation: "Surrealism, led by artists like Salvador Dalí, features dreamlike and irrational scenes."
    }
  ],
  4: [
    {
      id: 1,
      question: "Which ancient wonder was located in Alexandria, Egypt?",
      options: ["The Colossus of Rhodes", "The Lighthouse", "The Hanging Gardens", "The Great Pyramid"],
      correctAnswer: 1,
      explanation: "The Lighthouse (Pharos) of Alexandria was one of the Seven Wonders of the Ancient World."
    },
    {
      id: 2,
      question: "Who was the first Emperor of China?",
      options: ["Qin Shi Huang", "Sun Yat-sen", "Kublai Khan", "Emperor Wu"],
      correctAnswer: 0,
      explanation: "Qin Shi Huang unified China in 221 BCE and became its first emperor."
    }
  ]
};

const opponents: Opponent[] = [
  {
    id: 1,
    name: "BrainMaster",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
    specialties: ["Science", "Technology"],
    winRate: 78,
    status: "online"
  },
  {
    id: 2,
    name: "HistoryBuff",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    specialties: ["History", "Arts"],
    winRate: 82,
    status: "online"
  },
  {
    id: 3,
    name: "ArtExplorer",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
    specialties: ["Arts", "History"],
    winRate: 75,
    status: "offline"
  }
];

function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<Opponent | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'topic' | 'opponent' | 'quiz' | 'result'>('topic');
  const [score, setScore] = useState({ user: 0, opponent: 0 });

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setGameState('opponent');
  };

  const handleOpponentSelect = (opponent: Opponent) => {
    setSelectedOpponent(opponent);
    setGameState('quiz');
  };

  const handleAnswer = (answerIndex: number) => {
    const currentQuestions = questions[selectedTopic?.id || 0];
    const isCorrect = currentQuestions[currentQuestionIndex].correctAnswer === answerIndex;
    
    setUserAnswers([...userAnswers, answerIndex]);
    setScore(prev => ({
      ...prev,
      user: isCorrect ? prev.user + 1 : prev.user,
      // Simulated opponent answer based on their win rate
      opponent: Math.random() * 100 < (selectedOpponent?.winRate || 50) ? prev.opponent + 1 : prev.opponent
    }));

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('result');
    }
  };

  const resetGame = () => {
    setSelectedTopic(null);
    setSelectedOpponent(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setGameState('topic');
    setScore({ user: 0, opponent: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-purple-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={resetGame} />
          <h1 className="text-xl font-bold">Knowledge Arena</h1>
        </div>
        <div className="flex items-center gap-4">
          <Trophy className="w-6 h-6" />
          <Users className="w-6 h-6" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {gameState === 'topic' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Choose Your Battle Ground</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topics.map(topic => (
                <div
                  key={topic.id}
                  className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition"
                  onClick={() => handleTopicSelect(topic)}
                >
                  <img src={topic.image} alt={topic.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <topic.icon className="w-6 h-6" />
                      <h3 className="text-xl font-bold">{topic.name}</h3>
                    </div>
                    <p className="text-gray-400 mb-2">{topic.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm bg-purple-500 px-2 py-1 rounded">{topic.category}</span>
                      <span className={`text-sm ${
                        topic.difficulty === 'Easy' ? 'text-green-400' :
                        topic.difficulty === 'Medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>{topic.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === 'opponent' && selectedTopic && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Choose Your Opponent</h2>
            <div className="space-y-4">
              {opponents.map(opponent => (
                <div
                  key={opponent.id}
                  className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition"
                  onClick={() => handleOpponentSelect(opponent)}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={opponent.avatar} alt={opponent.name} className="w-12 h-12 rounded-full" />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                        opponent.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="font-bold">{opponent.name}</h3>
                      <p className="text-sm text-gray-400">
                        Specialties: {opponent.specialties.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-400">{opponent.winRate}% Win Rate</p>
                    <button className="mt-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2">
                      <Swords className="w-4 h-4" />
                      Challenge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === 'quiz' && selectedTopic && selectedOpponent && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <selectedTopic.icon className="w-6 h-6" />
                  <h2 className="text-xl font-bold">{selectedTopic.name}</h2>
                </div>
                <div className="text-sm">
                  Question {currentQuestionIndex + 1}/{questions[selectedTopic.id].length}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg mb-4">{questions[selectedTopic.id][currentQuestionIndex].question}</h3>
                <div className="space-y-3">
                  {questions[selectedTopic.id][currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-4 rounded-lg bg-gray-700 hover:bg-purple-600 transition"
                      onClick={() => handleAnswer(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState === 'result' && selectedTopic && selectedOpponent && (
          <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Battle Results</h2>
            <div className="flex justify-around items-center mb-8">
              <div className="text-center">
                <h3 className="font-bold mb-2">You</h3>
                <p className="text-4xl font-bold text-purple-400">{score.user}</p>
              </div>
              <div className="text-4xl font-bold">vs</div>
              <div className="text-center">
                <h3 className="font-bold mb-2">{selectedOpponent.name}</h3>
                <p className="text-4xl font-bold text-purple-400">{score.opponent}</p>
              </div>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">
                {score.user > score.opponent ? "Victory!" :
                 score.user < score.opponent ? "Defeat!" :
                 "It's a Draw!"}
              </h3>
              <p className="text-gray-400">
                {score.user > score.opponent ? "Congratulations! You've won this battle!" :
                 score.user < score.opponent ? "Better luck next time! Keep practicing!" :
                 "A worthy opponent indeed! Try again to break the tie!"}
              </p>
            </div>
            <button
              onClick={resetGame}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold transition"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;