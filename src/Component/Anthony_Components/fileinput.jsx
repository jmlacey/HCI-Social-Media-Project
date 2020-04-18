import React from "react";

function Image() {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatarButton" onClick={() => imageUploader.current.click()}>
      <img
      alt="profileimage"
        ref={uploadedImage}
        style={{
          width: "200px",
          height: "200px",
          position: "absolute",
        }}
      />
      <div>
        <input
          type="file"
          accept="image/*"
          
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: "none",
          }}
        />
      </div>
      Change Picture
    </div>
  );
}

export default Image;
