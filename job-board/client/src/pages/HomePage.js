import { useState } from 'react';
import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks.js';
import PaginationBar from '../components/PaginationBar.js';

const Jobs_per_page=20;
 function HomePage() {
const [currentPage,setCurrentPage]=useState(1);
  const {jobs,loading,error}=useJobs( Jobs_per_page,(currentPage-1)*Jobs_per_page);

  if (loading) {
    return (<div>Loading .....</div>)
  }
  if(error){
    return (<div className='has-text-danger'>Datos no disponibles</div>)

  }
  const totalpages=Math.ceil(jobs.totalcount/Jobs_per_page);
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <div>
        <button disabled={currentPage===1?true:false} onClick={()=>setCurrentPage((pag)=>pag-1)}>Previous</button>
        <span>{`${currentPage} of ${totalpages}`}</span>
        <button disabled={currentPage===totalpages?true:false} onClick={()=>setCurrentPage((pag)=>pag+1)}>Next</button>
      </div>
      <PaginationBar currentPage={currentPage} totalPages={totalpages} onPageChange={setCurrentPage}></PaginationBar>
      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
