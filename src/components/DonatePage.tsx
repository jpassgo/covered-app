import React, { useState } from 'react';

const CaptureFromCamera = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        capture="camera" 
        onChange={handleCapture}
        style={{ display: 'block', margin: '20px 0' }}
      />
      {imageSrc && <img src={imageSrc} alt="Captured" style={{ width: '100%', height: 'auto' }} />}
    </div>
  );
};

export default CaptureFromCamera;
