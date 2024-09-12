import React, { useState } from 'react';

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <div>
      <button onClick={() => setLiked(!liked)}>
        {liked ? "Unlike" : "Like"}
      </button>
    </div>
  );
}

export default LikeButton;
