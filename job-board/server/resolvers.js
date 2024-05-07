import { getCompany } from "./db/companies.js";
import { getJobs } from "./db/jobs.js"

export const resolvers = {
    Query: {
        jobs: async function () {

            console.log('hola');
            return getJobs()
        },

    },
    Job: {
  
        date: (job)=> toIsoDate(job.createdAt),
        company:(job)=>getCompany(job.companyId)
        }
        
    }

 

    


const toIsoDate=(value)=>value.slice(0,'yyyy-mm-dd'.length);