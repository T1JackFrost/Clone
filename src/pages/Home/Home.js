import { useState, useEffect } from 'react';
import Carousel from '~/components/Layout/components/Carousel';
import request from '~/ultis/request';
import Section from '~/components/Section';
import Item from '~/components/Item';

function Home() {
    const [result, setResult] = useState([]);

    useEffect(() => {
        request.get('/home').then((res) => {
            setResult(res.data.items);
        });
    }, []);

    if (result.length === 0) {
        return <h1>Loading</h1>;
    }

    return (
        <div>
            <Carousel data={result[0]} />
            <div>
                {result.map(
                    (playlist, index) =>
                        playlist.sectionType === 'playlist' && (
                            <Section key={index} title={playlist.title}>
                                {playlist.items.map((item) => (
                                    <Item key={item.encodeId} data={item} />
                                ))}
                            </Section>
                        ),
                )}
            </div>
        </div>
    );
}

export default Home;
