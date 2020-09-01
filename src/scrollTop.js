import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// 滚动到顶部 只要pathname变化
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}