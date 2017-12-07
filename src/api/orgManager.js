import fetch from '@/utils/fetch'

export function getOrgList (data) {
  return fetch({
    url: '/org/list',
    method: 'get',
    data
  })
}
