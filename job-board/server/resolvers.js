import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js"

export const resolvers = {
    Query: {
        jobs: async function () {

            return getJobs()
        },

        job:(_,{id})=>{
          
            return getJob(id)

        },
        company:(_,{id})=>{
            return getCompany(id);
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

 

    


const toIsoDate=(value)=>value.slice(0,'yyyy-mm-dd'.length);