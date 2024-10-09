// export function queryParamsFromObject(paramsObj) {
//     let queryParams = '';

//     for (let key in paramsObj) {
//         if (paramsObj.hasOwnProperty(key) && paramsObj[key] !== '') {
//             if (queryParams) {
//                 queryParams += '&';
//             }
//             queryParams += `${key}=${(paramsObj[key])}`;
//         }
//     }

//     return queryParams;
// }


export const queryParamsFromObject = (params) => {
    if (!params) {
        return '';
    }

    const queryString = Object.keys(params)
        .map(key => {
            if (Array.isArray(params[key])) {
                return params[key].map(value => `${key}=${encodeURIComponent(value)}`).join('&');
            }
            return `${key}=${encodeURIComponent(params[key])}`;
        })
        .join('&');
    return queryString;
};