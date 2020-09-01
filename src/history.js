// history.js https://github.com/ReactTraining/history/issues/804
// 真尼瑪坑爹，5.0.0的history不兼容，浪费好长时间
import { createBrowserHistory } from 'history'
// createBrowserHistory
// createHashHistory
export default createBrowserHistory({
    basename:"/pc"
    /* pass a configuration object here if needed */
})