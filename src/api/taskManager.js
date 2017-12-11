import fetch from '@/utils/fetch'

export function getTaskList (data) {
    return fetch({
        url: '/task/list',
        method: 'get',
        data
    })
}
