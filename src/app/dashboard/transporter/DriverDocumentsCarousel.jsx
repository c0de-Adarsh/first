import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DriverDocumentsCarousel = ({ selectedDriverDetails }) => {
    const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);

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
        },
        ...(selectedDriverDetails.address_support_letter 
            ? [{
                type: 'Address Support Letter',
                image: selectedDriverDetails.address_support_letter,
                number: null,
                numberLabel: null
            }] 
            : [])
    ].filter(doc => doc.image);

    const handleNext = () => {
        setCurrentDocumentIndex((prevIndex) => 
            (prevIndex + 1) % documents.length
        );
    };

    const handlePrevious = () => {
        setCurrentDocumentIndex((prevIndex) => 
            prevIndex === 0 ? documents.length - 1 : prevIndex - 1
        );
    };

    // If no documents, return null
    if (documents.length === 0) {
        return null;
    }

    const currentDocument = documents[currentDocumentIndex];

    return (
        <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                {currentDocument.type} Document
            </h3>
            
            <div className="relative w-auto h-[100px] flex items-center justify-center">
                {/* Previous Button */}
                {documents.length > 1 && (
                    <button 
                        onClick={handlePrevious}
                        className="absolute left-0 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}

                {/* Document Image */}
                <div className="w-full max-w-xl h-full flex items-center justify-center">
                    <img 
                        src={currentDocument.image || '/api/placeholder/800/600'} 
                        alt={currentDocument.type}
                        className="max-w-full max-h-full "
                        onClick={() => window.open(currentDocument.image, '_blank')}
                    />
                </div>

                {/* Next Button */}
                {documents.length > 1 && (
                    <button 
                        onClick={handleNext}
                        className="absolute right-0 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Document Details */}
            {currentDocument.number && (
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-900">
                        {currentDocument.numberLabel}: 
                        <span className="ml-2 font-medium">{currentDocument.number}</span>
                    </p>
                </div>
            )}

            {/* Pagination Dots */}
            {documents.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
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