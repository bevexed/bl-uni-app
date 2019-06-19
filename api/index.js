import ajax from './ajax.js';

// 测试用例，后期 可删除

const BaseUrl = 'http://192.168.3.112:5003';
// const BaseUrl = '';
// 3D 试衣接口

export const reqTextile3dmix = ({
    model_id,
    image,
    loc,
    dx,
    dy,
    amp,
    rotate,
    Rdpi
}) => ajax(BaseUrl + '/textile3dmix', {
    model_id,
    image,
    loc,
    dx,
    dy,
    amp,
    rotate,
    Rdpi
});

