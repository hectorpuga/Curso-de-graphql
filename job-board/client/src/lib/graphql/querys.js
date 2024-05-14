import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient('http://localhost:9000/graphql');
export async function createJob({ title, description }) {

  const mutation = gql`

  mutation CreateJob($input:CreateJobInput!){

    job:createJob(input:$input){
      id
    }
  }
  
  `;

  const { job } = await client.request(mutation, {
    input: {
      title,
      description
    }
  })

  return job;

}

export async function getJob(id) {
  const query = gql`

query getJobByID($id:ID!) {

job(id:$id) {
  id
  title
  company {
    name
    id
  }
  description,
  date
}

}



`;


  const { job } = await client.request(query, { id });

  return job;
}



export async function getCompany(id) {

  const query = gql`
  query getCompanyBiId($idCompany:ID!){
  company(id: $idCompany){
    description
    id
    name
    jobs{
      id
      date
      title
    }
  }
}
  `;

  const { company } = await client.request(query, { idCompany: id });
  // console.log(company);
  return company;
}




export async function getJobs() {
  const query = gql`
  

        query{
            jobs {
              date
              title
              id
              company {
              name
              id
            
              }
            }
            
          }
  
    
    `;

  const data = await client.request(query);

  return data.jobs;

}