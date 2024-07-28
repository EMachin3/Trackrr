import "../App.css";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { React, useState/*, useEffect*/ } from "react";
import { useNavigate } from "react-router-dom";
import ContentBox from "./ContentBox";


const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
`

const SearchEntry = styled.input`
    height: 30px;
`

const SearchButton = styled.button`
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
`


function ContentSearch() {
    const [keywords, setKeywords] = useState('')
    const [fetchedData, setFetchedData] = useState();
    const navigate = useNavigate();

    function fetchData() {
        fetch(`/api/content?search_query=${keywords}`).then((res) =>
            res.json().then((data) => {
                setFetchedData(data);
            })
        );
        // if ('error' in fetchedData) {
        //     navigate("/login");
        // }
    }

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        fetchData();
        //console.log(fetchedData);
        //console.log(typeof fetchedData)
        // Read the form data
        // const form = e.target;
        // const formData = new FormData(form);
        // const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);
        // fetchData(formJson);
    }

    //console.log(data)
    if (fetchedData === undefined) {
        return (
            <form style={{ marginTop: '10px' }} onSubmit={handleSubmit}>
            <SearchWrapper>
                <SearchEntry name="search" placeholder="Search" value={keywords} onChange={e => setKeywords(e.target.value)} />
                <SearchButton type="submit"><FaSearch size={31} /></SearchButton>
            </SearchWrapper>
        </form>
        )
    }
    else {
        if ('error' in fetchedData) {
            navigate('/login')
            return;
        }
    return (
        <>
        <form style={{ margin: '30px 0px' }} onSubmit={handleSubmit}>
            <SearchWrapper>
                <SearchEntry name="search" placeholder="Search" value={keywords} onChange={e => setKeywords(e.target.value)} />
                <SearchButton type="submit"><FaSearch size={31} /></SearchButton>
            </SearchWrapper>
        </form>
        {fetchedData && fetchedData.map((datum, index) => {
            return (
                <ContentBox image_height={100} title={datum.title} image={datum.picture}/>
            )
        })}
        </>
    )
}
}

export default ContentSearch;
