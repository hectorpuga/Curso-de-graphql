import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js"
import {GraphQLError} from 'graphql';

export const resolvers = {
    Query: {
        jobs: async function () {

            return getJobs()
        },

        job:async(_,{id})=>{
          const job=await getCompany(id);
          if(!job){
            throw notFoundError('No se encuentra compañia')
        }
        return job;

        },
        company:async(_,{id})=>{
            const company=await getCompany(id);
            if(!company){
                throw notFoundError('No se encuentra trabajo')
            }
            return company;
        }

    },
    Company:{
        jobs:(company)=>getJobsByCompany(company.id)
    },
    Job: {
  
        date: (job)=> toIsoDate(job.createdAt),
        company:(job)=>getCompany(job.companyId)
        }
        
    }

 

    function notFoundError(message){
        return new GraphQLError(message,{
            extensions:{
                code:'NOT_FOUND'
            }
        })
    }


const toIsoDate=(value)=>value.slice(0,'yyyy-mm-dd'.length);