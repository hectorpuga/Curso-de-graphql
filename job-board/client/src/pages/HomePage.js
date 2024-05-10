import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import { jobs } from '../lib/fake-data';
import { getJobs,getCompany } from '../lib/graphql/querys';


 function HomePage() {

  const [jobs,setJobs]=useState([]);
  getCompany("FjcJCHJALA4i").then(
    (d)=>{
      console.log(d);
    }
  )
  

  useEffect(()=>{

  async function getJobs2(){
    const datos=await getJobs();

    console.log(datos);
    setJobs(datos2=>[...datos2,...datos])
  }

  getJobs2()
  },[]);
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
