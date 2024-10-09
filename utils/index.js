const capacityMap = {
    小品: [0, 100],
    中品: [100, 200],
    大品: [200, 400],
    超大品: [400]
};

export const convertToRange = (volume) => {
    return capacityMap[volume];
};

export const removeEmptyField = (obj) => {
    const newObj = {};
    for (let key in obj) {
        if (obj[key] !== "" && obj[key] !== null) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

const priceCategories = {
    "入门": [1000, 6000],
    "高货": [6001, 30000],
    "收藏": [30001, 99999],
    "馆藏": [100000, Infinity]
};
export const convertPriceToRangeArray = (categoryName) => {
    return priceCategories[categoryName];
}


export function isEmptyOrUndefinedOrNull(value) {
    return value === "" || value === undefined || value === null;
}


// export const convertToRangeString = (range) => {
//     const [min, max] = range;
//     if (max === 0) {
//         return `${min} mL以下`;
//     } else if (min === max) {
//         return `${min} mL`;
//     } else {
//         return `${min}-${max} mL`;
//     }
// }