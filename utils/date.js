export function formatDateTime(dateTimeString) {
    // 创建一个 Date 对象
    const date = new Date(dateTimeString);

    // 提取日期和时间的各个部分
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth 返回的是从 0 开始的月份，所以需要加 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // 拼接成所需的格式
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
