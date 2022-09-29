import SongItem from '~/components/Layout/components/SongItem';
import { useStore } from '~/store';

function Listening({ className }) {
    const [state, dispatch] = useStore();
    const { title, artistsNames, thumbnailM, duration } = state;

    const songListening = { title, artistsNames, thumbnailM, duration };

    return (
        <div className={className}>
            <SongItem data={songListening} />
        </div>
    );
}

export default Listening;
