import { useParams } from "react-router-dom";
import Albums from "../albums/Albums";

const OneArtist = () => {
  const { id } = useParams<{ id?: string }>();
  const artistId = id || "";

  return (
    <>
      <div>
        <Albums artistId={artistId} />
      </div>
    </>
  );
};

export default OneArtist;
