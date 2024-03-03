import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: auto;
`;

const WatermarkInput = styled.input`
  margin: 10px 0;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Meme = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkSize, setWatermarkSize] = useState(20);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.5);

  const handleImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleWatermarkChange = (e) => {
    setWatermarkText(e.target.value);
  };

  const handleSizeChange = (e) => {
    setWatermarkSize(e.target.value);
  };

  const handleOpacityChange = (e) => {
    setWatermarkOpacity(e.target.value / 100);
  };

  const downloadMeme = () => {
    if (!imageUrl || !watermarkText) {
      alert('Please upload an image and enter watermark text');
      return;
    }
  
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
  
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
  
      const textWidth = ctx.measureText(watermarkText).width;
      ctx.font = `${watermarkSize}px sans-serif`;
      ctx.fillStyle = `rgba(0, 0, 0, ${watermarkOpacity})`;
      ctx.fillText(
        watermarkText,
        img.width - textWidth - watermarkSize - 30,
        img.height - watermarkSize - 10
      );
  
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'meme.png';
      link.click();
    };
  };

  return (
    <div className="container flex flex-col m-auto mb-12">
      <Container>
        <input type="file" onChange={handleImageChange} />
        <WatermarkInput
          type="text"
          placeholder="Enter watermark text"
          value={watermarkText}
          onChange={handleWatermarkChange}
        />
        <input
          type="range"
          min="10"
          max="50"
          value={watermarkSize}
          onChange={handleSizeChange}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={watermarkOpacity * 100}
          onChange={handleOpacityChange}
        />
        <Button onClick={downloadMeme}>Download Meme</Button>
        <ImageContainer>
          {imageUrl && (
            <>
              <img
                src={imageUrl}
                alt="Meme"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'auto',
                }}
              />
              {watermarkText && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    fontSize: `${watermarkSize}px`,
                    opacity: watermarkOpacity,
                    color: 'white',
                    backgroundColor: 'black',
                    padding: '5px',
                    borderRadius: '5px',
                  }}
                >
                  {watermarkText}
                </div>
              )}
            </>
          )}
        </ImageContainer>
      </Container>
    </div>
  );
};

export default Meme;