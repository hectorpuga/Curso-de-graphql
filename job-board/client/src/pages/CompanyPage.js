import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getCompany } from '../lib/graphql/querys';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();

  const [state, setState] = useState({
    comapny: null,
    loading: true,
    error: false

  })

  useEffect(() => {
    (async()=>{

      try {
        const company=await getCompany(companyId);
        setState({company,loading:false,error:false})
        
      } catch (error) {
        setState({company:null,loading:false,error:true})
        
      }

    })();
  }, [companyId])

  console.log(companyId);
  getCompany(companyId);
  const [company,loading,error]=state;
  if (loading) {
    return (<div>Loading .....</div>)
  }
  if(error){
    return (<div className='has-text-danger'>Datos no disponibles</div>)

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
