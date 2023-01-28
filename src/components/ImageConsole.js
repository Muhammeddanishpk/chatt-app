import React, {} from "react";
import Ovalspinner from "./Ovalspinner";

function ImageConsole({imgUrl,setText,text,func ,loading}) {
 

  return (
    <>
    {imgUrl &&
    <div className="margin  relative">
      <img
        className="ImageC object-cover"
        src={imgUrl ? URL.createObjectURL(imgUrl) : null}
        alt=""
      />
{loading && <Ovalspinner/>}
        <input
          className="imagePreview p-2 placeholder:p-2"
          placeholder="Add a caption..."
          type="text"
        onChange={(e)=>setText(e.target.value)}
        value={text}
          name=""
          id=""
        />
        <button disabled={loading} onClick={func} className="sendBtn text-[#54d38a]   font-extrabold">
          <span class="material-symbols-sharp text-3xl">send</span>
        </button>
    </div>}
    </>
  );
}

export default ImageConsole;
