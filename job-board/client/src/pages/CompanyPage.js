import { useParams } from 'react-router';
import JobList from '../components/JobList';
import { useCompany } from '../lib/graphql/hooks.js';





function CompanyPage() {
  const { companyId } = useParams();

  const {company,loading,error}=useCompany(companyId);

 
 
  if (loading) {
    return (<div>Loading .....</div>)
  }
  if(error){
    return (<div className='has-text-danger'>Datos no disponibles</div>)

  }

  console.log('[CompanyPage] ',{company,loading,error});
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
