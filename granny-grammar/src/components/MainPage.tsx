import React, { useState, useRef, useEffect } from "react";
import { LanguageButton } from "./ui/LanguageButton";
import { SetLanguagePopup } from "./SetLanguagePopup";
import { VocabList } from "@/Tracer/VocabList";
import { ContributorPanel } from "@/Tracer/ContributorPanel";

interface MainPageProps {
  selectedLanguage: string;
}

const vocabItems = [
  {
    image: "/Inuktitut-1.png",
    pronunciation: "Paurgnait",
    translation: "Blackberries"
  },
  {
    image: "/Inuktitut-2.png",
    pronunciation: "Naujaq",
    translation: "Seagull"
  },
  {
    image: "/Inuktitut-3.png",
    pronunciation: "Imaq",
    translation: "Water"
  }
];

export default function MainPage({ selectedLanguage }: MainPageProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current vocabulary index
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const currentVocab = vocabItems[currentIndex];

  // Function to toggle the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Initialize the canvas context and settings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Adjust canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set drawing properties
    context.lineCap = "round";
    context.strokeStyle = "black"; // Drawing color
    context.lineWidth = 2; // Brush size
    contextRef.current = context;
  }, []);

  // Start drawing
  const startDrawing = (e: React.MouseEvent) => {
    const context = contextRef.current;
    if (!context) return;

    context.beginPath();
    context.moveTo(e.clientX, e.clientY); // Start point
    setIsDrawing(true);
  };

  // Draw continuously as the mouse moves
  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const context = contextRef.current;
    if (!context) return;

    context.lineTo(e.clientX, e.clientY); // Draw a line
    context.stroke();
  };

  // Stop drawing
  const stopDrawing = () => {
    const context = contextRef.current;
    if (!context) return;

    context.closePath();
    setIsDrawing(false);
  };

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height); // Clears the entire canvas
  };

  // Move to the previous vocab item
  const prevVocab = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? vocabItems.length - 1 : prevIndex - 1));
    clearCanvas(); // Optionally clear the canvas when switching words
  };

  // Move to the next vocab item
  const nextVocab = () => {
    setCurrentIndex((prevIndex) => (prevIndex === vocabItems.length - 1 ? 0 : prevIndex + 1));
    clearCanvas(); // Optionally clear the canvas when switching words
  };

  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url('/mainpage.png')` }}
      >
        <div className="absolute top-28 left-4 text-black text-xl">
          Currently CoTracing: {selectedLanguage}
        </div>

        {/* Display pronunciation, image, and translation */}
        <div className="absolute bottom-[150px] left-[600px] -translate-x-1/2 flex flex-col items-center space-y-4">
          {/* Pronunciation */}
          <div className="text-2xl text-black font-bold">{currentVocab.pronunciation}</div>

          {/* Image */}
          <img src={currentVocab.image} alt={currentVocab.translation} className="w-120 h-40" />

          {/* Translation */}
          <div className="text-xl text-black">{currentVocab.translation}</div>
        </div>

        {/* Canvas for drawing */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing} // Stop drawing if the mouse leaves the canvas
        />

        {/* Clear buttons */}
        <div className="absolute bottom-[80px] left-[600px] -translate-x-1/2 flex space-x-4">
          <button
            onClick={prevVocab}
            className="bg-[#E5EFF0] text-black px-4 py-2 rounded-7px text-lg flex items-center"
          >
            <img src="/public/leftarrow.png" alt="Left Arrow" className="w-10 h-10 mr-2" />
          </button>
          <button
            onClick={nextVocab}
            className="bg-[#E5EFF0] text-black px-4 py-2 rounded-7px text-lg flex items-center"
          >
            <img src="/public/rightarrow.png" alt="Right Arrow" className="w-10 h-10 mr-2" />
          </button>
        </div>

        <div className="absolute top-40 right-4 h-600 w-700 text-black">
          <VocabList className="vocabList absolute border w-300"> </VocabList>
        </div>

        <div className="absolute bottom-4 right-4 h-600 w-700 text-black">
          <ContributorPanel className="contributorPanel absolute bottom-4"> </ContributorPanel>
        </div>

        <div className="absolute bottom-4 left-4">
          <button onClick={togglePopup}>
            <LanguageButton />
          </button>
        </div>
        {showPopup && <SetLanguagePopup />}
      </div>
    </>
  );
}



// import React, { useState, useRef, useEffect } from "react";
// import { LanguageButton } from "./ui/LanguageButton";
// import { SetLanguagePopup } from "./SetLanguagePopup";
// import { VocabList } from "@/Tracer/VocabList";
// import { ContributorPanel } from "@/Tracer/ContributorPanel";

// interface MainPageProps {
//   selectedLanguage: string;
// }

// export default function MainPage({ selectedLanguage }: MainPageProps) {
//   const [showPopup, setShowPopup] = useState(false);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const contextRef = useRef<CanvasRenderingContext2D | null>(null);

//   // Function to toggle the popup
//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   // Initialize the canvas context and settings
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     // Adjust canvas size
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const context = canvas.getContext("2d");
//     if (!context) return;

//     // Set drawing properties
//     context.lineCap = "round";
//     context.strokeStyle = "black"; // Drawing color
//     context.lineWidth = 2; // Brush size
//     contextRef.current = context;
//   }, []);

//   // Start drawing
//   const startDrawing = (e: React.MouseEvent) => {
//     const context = contextRef.current;
//     if (!context) return;

//     context.beginPath();
//     context.moveTo(e.clientX, e.clientY); // Start point
//     setIsDrawing(true);
//   };

//   // Draw continuously as the mouse moves
//   const draw = (e: React.MouseEvent) => {
//     if (!isDrawing) return;

//     const context = contextRef.current;
//     if (!context) return;

//     context.lineTo(e.clientX, e.clientY); // Draw a line
//     context.stroke();
//   };

//   // Stop drawing
//   const stopDrawing = () => {
//     const context = contextRef.current;
//     if (!context) return;

//     context.closePath();
//     setIsDrawing(false);
//   };

//   // Clear the canvas
//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = contextRef.current;
//     if (!canvas || !context) return;

//     context.clearRect(0, 0, canvas.width, canvas.height); // Clears the entire canvas
//   };

//   [
//     {
//       "image": "/Inuktitut-1.png",
//       "pronunciation": "Paurgnait",
//       "translation": "Blackberries"
//     },
//     {
//       "image": "/Inuktitut-2.png",
//       "pronunciation": "Naujaq",
//       "translation": "Seagull"
//     },
//     {
//       "image": "/Inuktitut-3.png",
//       "pronunciation": "Imaq",
//       "translation": "Water"
//     }
//   ]

//   return (
//     <>
//       <div
//         className="h-screen w-screen bg-cover bg-no-repeat relative"
//         style={{ backgroundImage: `url('/mainpage.png')` }}
//       >
//         <div className="absolute top-28 left-4 text-black text-xl">
//           Currently CoTracing: {selectedLanguage}
//         </div>

//         {/* Canvas for drawing */}
//         <canvas
//           ref={canvasRef}
//           className="absolute top-0 left-0"
//           onMouseDown={startDrawing}
//           onMouseMove={draw}
//           onMouseUp={stopDrawing}
//           onMouseLeave={stopDrawing} // Stop drawing if the mouse leaves the canvas
//         />

//         {/* Clear buttons */}
//         <div className="absolute bottom-[80px] left-[600px] -translate-x-1/2 flex space-x-4">
//           <button
//             onClick={clearCanvas}
//             className="bg-[#E5EFF0] text-black px-4 py-2 rounded-7px text-lg flex items-center"
//           >
//             <img src="/public/leftarrow.png" alt="Left Arrow" className="w-10 h-10 mr-2" />
//           </button>
//           <button
//             onClick={clearCanvas}
//             className="bg-[#E5EFF0] text-black px-4 py-2 rounded-7px text-lg flex items-center"
//           >
//             <img src="/public/rightarrow.png" alt="Right Arrow" className="w-10 h-10 mr-2" />
//           </button>
//         </div>
//         <div className="absolute top-40 right-4 h-600 w-700 text-black">
//             <VocabList className="vocabList absolute border w-300"> </VocabList>
//         </div>
//         <div className="absolute bottom-4 right-4 h-600 w-700 text-black">
//             <ContributorPanel className="contributorPanel absolute bottom-4"> </ContributorPanel>
//         </div>

//         <div className="absolute bottom-4 left-4">
//           <button onClick={togglePopup}>
//             <LanguageButton />
//           </button>
//         </div>
//         {showPopup && <SetLanguagePopup />}
//       </div>
//     </>
//   );
// }
