import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks.js';


 function HomePage() {

  const {jobs,loading,error}=useJobs();

  if (loading) {
    return (<div>Loading .....</div>)
  }
  if(error){
    return (<div className='has-text-danger'>Datos no disponibles</div>)

  }
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
