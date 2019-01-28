// Service for resource
import request from '../lib/request';

/**
 * Get a particular resource
 *
 * @param {*} id
 * @returns object for a resource
 */
const get = (id) => {
  return request({
    url: `/resource/api/${id}`,
    method: 'GET',
  });
}

/**
 * Get a list all the records
 *
 * @returns
 */
const getAll = () => {
  return request({
    url: `/resource/api`,
    method: 'GET',
  })
}

/**
 * Create a resource
 *
 * @param {*} params payload for creating resource
 * @returns success
 */
const create = (params) => {
  return request({
    url: `/resource/api`,
    method: 'POST',
    data: params
  });
}

/**
 * Update a paritcular resource
 *
 * @param {*} params payload to update a resource
 * @returns success
 */
const update = (params) => {
  console.log('update resource called in resource service with params.resource : ', params.resource);
  return request({
    url: `/resource/api`,
    method: 'PUT',
    data: params.resource,
  })
}

/**
 * Delete a particular resource
 *
 * @param {*} id id of a resource to delete
 * @returns success
 */
const remove = (id) => {
  return request({
    url: `/url/to/delete/${id}`,
    method: 'DELETE',
  })
}

const ResourceService = {
  get, getAll, create, update, remove,
}

export default ResourceService;