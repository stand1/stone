import index from './App';
import About from './about';

let router = [
    {
        path: '/',//首页默认加载的页面
        componentName: index,
        exact: true //是否为严格模式
    },
    {
        path: '/about',//后面是传递的参数id
        componentName: About
    }
];

export default router;
