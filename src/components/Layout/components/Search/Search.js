import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchResult from './SearchResult';
import SearchResultItem from './SearchResultItem';
import request from '~/ultis/request';
import { useDebounce } from '~/hooks';

import { useStore, actions } from '~/store';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const debounced = useDebounce(searchValue, 500);
    const inputRef = useRef();

    const [state, dispatch] = useStore();

    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }

        request.get(`/search?keyword=${encodeURIComponent(debounced)}`).then((res) => {
            setSearchResult(res?.data?.songs);
        });
    }, [debounced]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                visible={showResult && searchResult?.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <SearchResult>
                            <h4>Gợi ý kết quả</h4>
                            {searchResult?.map((result) => (
                                <SearchResultItem
                                    key={result.encodeId}
                                    data={result}
                                    onClick={() => {
                                        dispatch(
                                            actions.setSongInfo({
                                                title: result.title,
                                                artistsNames: result.artistsNames,
                                                thumbnailM: result.thumbnailM,
                                            }),
                                        );
                                        dispatch(
                                            actions.setSongSelect({
                                                songId: result.encodeId,
                                                duration: result.duration,
                                            }),
                                        );
                                    }}
                                />
                            ))}
                        </SearchResult>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        placeholder="Tìm kiếm bài hát, nghệ sĩ,..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {!!searchValue && (
                        <button
                            onClick={() => {
                                setSearchValue('');
                                setSearchResult([]);
                                inputRef.current.focus();
                                setShowResult(true);
                            }}
                            className={cx('clear')}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
