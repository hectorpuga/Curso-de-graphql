import { GraphQLError } from 'graphql';
import {getCompany } from './db/companies.js';
import { createJob, deleteJob, getJob, getJobs, getJobsByCompany, updateJob } from './db/jobs.js';

export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError('No Company found with id ' + id);
      }
      return company;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError('No Job found with id ' + id);
      }
      return job;
    },
    jobs: () => getJobs(),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    company: (job,_args,{companyLoader}) => companyLoader.load(job.companyId),
    date: (job) => toIsoDate(job.createdAt),
  },




  Mutation: {
    createJob: (_root, { input: { title, description } }, { user }) => {

      if (!user) {
        throw unauthorizedError('Missing authentication')
      }
      const companyId = user.companyId; // TODO set based on user
      return createJob({ companyId,companyId:user.companyId, title, description, })

    },
    removeJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication')
      }
      const job = await deleteJob(id, user.companyId);

      if (!job) {

        throw notFoundError('No Job found with id ' + id);
      }
      return job;

    },
    updateJob: async (_root, { input: { id, title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication')
      }
      const job = await updateJob({ id, title, description })

      if (!job) {
        throw notFoundError('No Job found with id ' + id);

      }
      return job;

    }


  }
};
function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  });
}

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
}

function toIsoDate(value) {
  return value.slice(0, 'yyyy-mm-dd'.length);
}
