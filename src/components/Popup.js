import React, { useState } from 'react';
import stations from "../utils";
import "../styles/Popup.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMapMarkerAlt , faCode} from '@fortawesome/free-solid-svg-icons';

export default function Popup({ stationIndex, resumeTrain, className }) {
    const { title, description, image, message } = stations[stationIndex]; // 'image' from the outer object (award image)
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imgUrl) => {
        setSelectedImage(imgUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className={`popup-overlay ${className}`}>
            <div className={`popup-content ${className}`}>
                <h2>
                    {title} <FontAwesomeIcon icon={faMapMarkerAlt} />
                </h2>
                {Array.isArray(description) ? (
                    description.map((desc, index) => (
                        <div key={index} className="popup-section">
                            <h3>{desc.subTitle}</h3>
                            <ul>
                                {desc.bullets.map((bullet, i) => (
                                    <li key={i}>{bullet}</li>
                                ))}
                            </ul>

                            {/* Display images inside description */}
                            {desc.image && (
                                <div className="image-gallery">
                                    {Array.isArray(desc.image) ? (
                                        desc.image.map((imgUrl, idx) => (
                                            <img
                                                key={idx}
                                                src={imgUrl}
                                                alt={`${desc.subTitle} featured`}
                                                className="featured-image-small"
                                                onClick={() => handleImageClick(imgUrl)}
                                            />
                                        ))
                                    ) : (
                                        <img
                                            src={desc.image}
                                            alt={`${desc.subTitle} featured`}
                                            className="featured-image-small"
                                            onClick={() => handleImageClick(desc.image)}
                                        />
                                    )}
                                </div>
                            )}
                            {desc.github && (
                                <a href={desc.github} target="_blank" rel="noopener noreferrer" className="popup-link">
                                    <i className="fab fa-github" style={{ fontSize: '24px' }}></i>
                                </a>
                            )}
                            {desc.leetcode && (
                                <a href={desc.leetcode} target="_blank" rel="noopener noreferrer" className="popup-link">
                                    <FontAwesomeIcon icon={faCode} style={{ fontSize: '24px' }} />
                                </a>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="popup-message">
                        <p>{description}</p>
                    </div>
                )}

                {/* Display outer image (award image) in full width */}
                {image && (
                    <div className="award-image-container">
                        <img
                            src={image}
                            alt="Award"
                            className="award-image"
                        />
                    </div>
                )}

                {message && (
                    <div className="popup-message">
                        <p>{message}</p>
                    </div>
                )}

                <button onClick={resumeTrain} className="popup-button">Resume Journey</button>
            </div>

            {/* Modal for expanded image */}
            {isModalOpen && (
                <div className="image-modal-overlay" onClick={closeModal}>
                    <img src={selectedImage} alt="Expanded view" className="expanded-image" />
                </div>
            )}
        </div>
    );
}
