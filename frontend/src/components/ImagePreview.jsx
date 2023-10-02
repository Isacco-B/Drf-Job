import { useEffect, useState } from "react"

function ImagePreview({file}) {
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(()=> {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImgSrc(reader.result)
    }
    reader.readAsDataURL(file)
  })

  return (
    <div>
      {!imgSrc && "Loading..."}
      {imgSrc && (
        <img src={imgSrc} alt={file.name} className="h-20 w-20 px-3 py-3 object-cover" />
      )}
    </div>
  );
}

export default ImagePreview
