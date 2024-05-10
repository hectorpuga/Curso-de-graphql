import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/querys';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();

  const [company,setCompany]=useState();

useEffect(()=>{
  getCompany(companyId).then(setCompany);
},[companyId])

console.log(companyId);
getCompany(companyId);
if(!company){
  return (<div>Loading .....</div>)
}

  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>

      <h2 className='title is-5'>Jobs at {company.name}</h2>
      <JobList jobs={company.jobs}></JobList>
    </div>
  );
}

export default CompanyPage;
