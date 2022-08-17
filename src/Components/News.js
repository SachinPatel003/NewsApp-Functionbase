import React, { useState , useEffect } from 'react'
import Loading1 from './Loading';
import NewsItems from './NewsItems'

const News = (props)=> {
    const [atricles, setAtricles] = useState([]);
    const [page, setPage] = useState(1);
    const [Loading, setLoading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)

    const pagesize = 21

    const updateNews = async()=> {
        props.setProgress(50)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=5272f6cbea9844e8912a2f8a7aae6081&page=${page}&pagesize=${pagesize}`
        let data = await fetch(url);
        let data1 = await data.json();
        setAtricles(data1.articles);
        setTotalResults(data1.totalResults);
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        updateNews()
        document.title = `${capitalizeFirstLatter1(props.category)} - NewsApp`
    }, [])

    const previousPage = async () => {

        props.setProgress(50)
        setLoading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=5272f6cbea9844e8912a2f8a7aae6081&page=${page-1}&pagesize=${pagesize}`
        let data = await fetch(url);
        let data1 = await data.json();
        setAtricles(data1.articles);
        setTotalResults(data1.totalResults);
        setLoading(false)
        props.setProgress(100)
        setPage(page - 1)
    }

    const nextPage = async () => {

        props.setProgress(50)
        setLoading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=5272f6cbea9844e8912a2f8a7aae6081&page=${page+1}&pagesize=${pagesize}`
        let data = await fetch(url);
        let data1 = await data.json();
        setAtricles(data1.articles);
        setTotalResults(data1.totalResults);
        setLoading(false)
        props.setProgress(100)
        setPage(page + 1)
    }
        function capitalizeFirstLatter1(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return (
            <>
                <div className='container'>
                    <h1 className='text-center' style={{marginTop:"70px"}}>News App - {capitalizeFirstLatter1(props.category)}</h1>
                    <div className='d-flex justify-content-between m-2'>
                        <button type="button" disabled={page <= 1} onClick={previousPage} className="btn btn-primary">Previous</button>
                        <button type="button" disabled={page >= Math.ceil(totalResults / pagesize)} onClick={nextPage} className="btn btn-primary">Next</button>
                    </div>
                    {Loading && <Loading1 />}
                    {!Loading && <div className='row'>
                        {atricles.map((element) => {
                            return <div className='col-4' key={element.url}>
                                <NewsItems title={element.title} url={element.url} image={element.urlToImage} desc={element.description} />
                            </div>
                        })}
                    </div>}
                    <div className='d-flex justify-content-between m-2'>
                        <button type="button" disabled={page <= 1} onClick={previousPage} className="btn btn-primary">Previous</button>
                        <button type="button" disabled={page >= Math.ceil(totalResults / pagesize)} onClick={nextPage} className="btn btn-primary">Next</button>
                    </div>
                </div>
            </>
        )
    
}

export default News