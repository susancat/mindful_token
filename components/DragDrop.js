import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
//https://www.npmjs.com/package/react-drag-drop-files

const fileTypes = ["JPG", "PNG", "GIF"];
const maxSize = 1;

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = file => {
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(){
      if (window.localStorage) {
        localStorage.canvas = this.result;
        // document.getElementById('previewImg').src = localStorage.canvas;
        location.reload();
      }
    }
  };
  return (
      <FileUploader 
        handleChange={handleChange} 
        name="file" 
        types={fileTypes}
        maxSize={maxSize}
      />
  );
}
  
export default DragDrop;