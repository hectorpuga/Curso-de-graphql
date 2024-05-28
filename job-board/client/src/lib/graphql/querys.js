// import { GraphQLClient } from "graphql-request";
import { getAccessToken } from '../auth';
import {ApolloClient, InMemoryCache,createHttpLink,gql,concat, ApolloLink} from '@apollo/client'
// const client = new GraphQLClient('http://localhost:9000/graphql', {
//   headers: () => {

//     const acessToken = getAccessToken();
//     if (acessToken) {
//       return { 'Authorization': `Bearer ${acessToken}` }
//     }
//     return {};
//   }
// });

const httpLink=createHttpLink({uri:'http://localhost:9000/graphql'});
const authLink=new ApolloLink((operation,forward)=>{
  console.log('[cutomLink operation: ',operation);
  const acessToken = getAccessToken();
      if (acessToken) {
        operation.setContext({
          headers:{
            'Authorization': `Bearer ${acessToken}` 
          }
        })
      }
    
  return forward(operation);
})
export const apollCliente=new ApolloClient({
  // uri:'http://localhost:9000/graphql',
  link: concat(authLink,httpLink),
  cache: new InMemoryCache(),
  // defaultOptions:{
  //   query:{
  //     fetchPolicy:'network-only'
  //   },
  //   watchQuery: {
  //     fetchPolicy:'network-only'
  //   }
  // }
});

const jobDetailFragment=gql`

fragment jobDetails on Job{
   id
  title
  company {
    name
    id
  }
  description,
  date
}
`;

export const companyByIdQuery = gql`
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
export const jobByIdQuery = gql`

query getJobByID($id:ID!) {

job(id:$id) {
 ...jobDetails
}


}
${jobDetailFragment}
`;



export const createJobMutation = gql`

mutation CreateJob($input:CreateJobInput!){

  job:createJob(input:$input){
  ...jobDetails
  }
}
${jobDetailFragment}
`;
// export async function createJob({ title, description }) {


//   // const { job } = await client.request(mutation, {
//   //   input: {
//   //     title,
//   //     description
//   //   }
//   // })

//   const {data}=await apollCliente.mutate({
//     createJobMutation,
//     variables:{
//       input:{
//         title,
//         description
//       },
      
//     },
//     update:(cache,{data})=>{
//       console.log(data.job.id);
//       console.log(data);
//       cache.writeQuery({
//         query:jobByIdQuery,
//         variables:{
//           id:data.job.id,
//         },
//         data

//       })
//     }
//   })

//   return data.job;

// }

// export async function getJob(id) {



//   // const { job } = await client.request(query, { id });
//   const {data}= await apollCliente.query({query:jobByIdQuery,variables:{id}});


//   return data.job;
// }



// export async function getCompany(id) {

//   const query = gql`
//   query getCompanyBiId($idCompany:ID!){
//   company(id: $idCompany){
//     description
//     id
//     name
//     jobs{
//       id
//       date
//       title
//     }
//   }
// }
//   `;

// const {data}= await apollCliente.query({query,variables:{"idCompany":id}});

//   // console.log(company);
//   return data.company;
// }

export const jobs = gql`
  

        query Jobs{
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


// export async function getJobs() {
//   const query = gql`
  

//         query Jobs{
//             jobs {
//               date
//               title
//               id
//               company {
//               name
//               id
            
//               }
//             }
            
//           }
  
    
//     `;

//   // const data = await client.request(query);
//   const data= await apollCliente.query({query,fetchPolicy:'network-only'});

//   return data.data.jobs;
// }