import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

const DriverDocumentsCarousel = ({ selectedDriverDetails }) => {
    const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);

    const documents = [
        {
            type: 'Driving License',
            image: selectedDriverDetails.dl_image,
            number: selectedDriverDetails.dl_number,
            numberLabel: 'DL Number'
        },
        {
            type: 'National ID',
            image: selectedDriverDetails.national_id,
            number: selectedDriverDetails.national_id_no,
            numberLabel: 'ID Number'
        },
        {
            type: 'Vehicle Number Plate',
            image: selectedDriverDetails.number_plate_image,
            number: selectedDriverDetails.number_plate_no,
            numberLabel: 'Plate Number'
        }
       
    ].filter(doc => doc.image);

    const handleNext = () => {
        setCurrentDocumentIndex((prevIndex) => 
            (prevIndex + 1) % documents.length
        );
        // Reset zoom when changing document
        setIsZoomed(false);
        setPanPosition({ x: 0, y: 0 });
    };

    const handlePrevious = () => {
        setCurrentDocumentIndex((prevIndex) => 
            prevIndex === 0 ? documents.length - 1 : prevIndex - 1
        );
        // Reset zoom when changing document
        setIsZoomed(false);
        setPanPosition({ x: 0, y: 0 });
    };

    // If no documents, return null
    if (documents.length === 0) {
        return null;
    }

    const currentDocument = documents[currentDocumentIndex];

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
        setPanPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e) => {
        if (!isZoomed) return;
        
        e.preventDefault();
        setIsDragging(true);
        const rect = imageContainerRef.current.getBoundingClientRect();
        setStartPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseMove = (e) => {
        if (!isZoomed || !isDragging) return;
        
        e.preventDefault();
        const rect = imageContainerRef.current.getBoundingClientRect();
        const newX = e.clientX - rect.left - startPos.x;
        const newY = e.clientY - rect.top - startPos.y;

        // Limit panning to prevent image from moving too far
        const maxPanX = 150;  // Adjust these values to control panning range
        const maxPanY = 150;

        setPanPosition({
            x: Math.max(Math.min(newX, maxPanX), -maxPanX),
            y: Math.max(Math.min(newY, maxPanY), -maxPanY)
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                {currentDocument.type} Document
            </h3>
            
            <div className="relative w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                {/* Previous Button */}
                {documents.length > 1 && (
                    <button 
                        onClick={handlePrevious}
                        className="absolute left-2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}

                {/* Document Image Container */}
                <div 
                    ref={imageContainerRef}
                    className="relative w-full max-w-xl h-full flex items-center justify-center overflow-hidden"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                            ref={imageRef}
                            src={currentDocument.image || '/api/placeholder/800/600'} 
                            alt={currentDocument.type}
                            className={`
                                absolute max-w-none max-h-none object-contain transition-transform duration-300 ease-in-out
                                ${isZoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}
                            `}
                            style={{
                                transform: isZoomed 
                                    ? `scale(2) translate(${panPosition.x}px, ${panPosition.y}px)` 
                                    : 'scale(1)',
                                width: 'auto',
                                height: 'auto'
                            }}
                            onClick={toggleZoom}
                        />
                    </div>
                    
                    {/* Zoom Button */}
                    <button 
                        onClick={toggleZoom}
                        className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                        title={isZoomed ? "Zoom Out" : "Zoom In"}
                    >
                        {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                    </button>
                </div>

                {/* Next Button */}
                {documents.length > 1 && (
                    <button 
                        onClick={handleNext}
                        className="absolute right-2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Document Details */}
            {currentDocument.number && (
                <div className="text-center mt-2">
                    <p className="text-sm text-gray-900">
                        {currentDocument.numberLabel}: 
                        <span className="ml-2 font-medium">{currentDocument.number}</span>
                    </p>
                </div>
            )}

            {/* Pagination Dots */}
            {documents.length > 1 && (
                <div className="flex justify-center space-x-2 mt-2">
                    {documents.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentDocumentIndex(index)}
                            className={`w-2 h-2 rounded-full ${
                                index === currentDocumentIndex 
                                    ? 'bg-blue-600' 
                                    : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DriverDocumentsCarousel;