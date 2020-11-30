import request from '../utils/request';

// export const fetchData = query => {
//     return request({
//         url: './table.json',
//         method: 'get',
//         params: query
//     });
// };

export const submitLogin = data => {
    return request({
        url: '/users/login',
        method: 'post',
        data
    });
};
export const submitRegister = data => {
    return request({
        url: '/users/register',
        method: 'post',
        data
    });
};

export const getGoodsList = query => {
    return request({
        url: '/api/goods/list',
        method: 'get',
        params: query
    });
};

export const updateGood = (data,type) => {
    const url = {
        edit:'/api/goods/edit',
        add:'/api/goods/add'
    }[type]
    return request({
        url,
        method: 'post',
        data
    });
};