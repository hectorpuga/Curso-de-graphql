import { useQuery } from '@apollo/client';
import { companyByIdQuery, jobByIdQuery, jobs, createJobMutation } from './querys';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
export function useCompany(id) {
  const { data, loading, error } = useQuery(companyByIdQuery, {
    variables: { idCompany: id }
  })
  return { company: data?.company, loading, error: Boolean(error) };
}


export function useJob(id) {

  const { data, loading, error } = useQuery(jobByIdQuery, {
    variables: { id }
  })

  console.log(data);
  return { job: data?.job, loading, error: Boolean(error) };

}



export function useJobs() {

  const { data, loading, error } = useQuery(jobs, {
    fetchPolicy: "network-only"
  })

  return { jobs: data?.jobs, loading, error: Boolean(error) };

}

export function useCreateJob() {
  const [mutate, { loading }] = useMutation(createJobMutation);

  const createJob = async (title, description) => {




    const { data: { job } } = await mutate({
      variables: {
        input: {
          title,
          description
        },

      },
      update: (cache, { data }) => {
        console.log(data.job.id);
        console.log(data);
        cache.writeQuery({
          query: jobByIdQuery,
          variables: {
            id: data.job.id,
          },
          data

        })
      }


    });


    return job;


  }
  return {
    loading,
    createJob
  };
}